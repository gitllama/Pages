// module使用しない際は変数のグローバル汚染しないため
// 即時実行関数(()=>{... })();で包んでスコープの限定
// export相当のみwindow.hogehoge = hogeとグローバル化
(() => {

  /******** Logic ********/

  const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));


  /******** Actions, ActionCreater ********/

  /*
  <pattern-A>
  const RESET = "RESET";
  const DEFAULT = "DEFAULT";

  <pattern-B>
  const ActionType = {
    RESET : 'RESET',
    ISBUSY : 'ISBUSY',
  }
  */

  const Actions = [
    'RESET',
    'LOADING',
    "ERR",
    "NAVIGATE",
    "TITLE",
    "ASYNCINC"
  ];

  const ActionType = Actions.reduce((accumulator, currentValue) =>{
    if (currentValue in accumulator) throw new Error('Err : Action Creater');
    return ({...accumulator, [currentValue] : currentValue});
  },{});

  window.ActionType = ActionType;


  /******** Reducers, Store ********/

  const getParams = (val, def)=>{
    const dst = ((new URL(document.location)).searchParams).get(val);
    return dst ? dst : def;
  };

  const initialState = {
    title : document.title,
    region : getParams('region', 'Sign In'),
    loading : false,
    err : undefined,
    count : 0
  };

  /*
  <pattern-A>: 平文
  function reducer(state, action) {
    switch(action.type) {
      case ActionType.INCREMENT:{
        const nextState = { ...state };
        nextState.count++;
        return nextState;
      }
      default:
        throw new Error();
    }
  }

  <pattern-B>: 
  const reducer = {
    [ActionType.ASYNCLOGINACTION] (state, action) {
      return [...state, action.text.trim()];
    },
    [ActionType.LOGOUTACTION] (state, action) {
      return [...state, action.text.trim()];
    }
  };
  
  
  
  note :
  hoge.push(val)などだと値の変化がないと判断されて更新されない。
  スプレッドプロパティ構文でミューテートを避けてのオブジェクト更新する為
  [...hoge, val] (同意: hoge.words.concat([val]))
  {...hoge, value : val} (同意: Object.assign({}, hoge, {value: val}))
  
  複雑なオブジェクトならImmerやimmutability-helperの使用推奨
  */

  function createReducer(handlers) {
    return (state, action) => {
      console.log("reducer", action);
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
      } else {
        throw new Error()
        //return state;
      }
    }
  };

  const reducer = createReducer({
    
    RESET: () => initialState,
    NAVIGATE : (state, action) => ({ ...state, region : action.value }),
    LOADING : (state, action) => ({ ...state, loading : true }),
    ERR : (state, action) => ({ ...state, err : action.value }),
    ASYNCINC : (state, action) => {
      return { 
        ...state, 
        count : state.count + action.value,
        loading : false
      };
    },
    TITLE : (state, action) => {
      document.title = action.value;
      return { ...state, title : action.value }
    },
  });


  async function fetchData(action, dispatch){
    console.log("fetch", action);
    dispatch({ type: ActionType.LOADING });
    switch(action.type) {
      case ActionType.ASYNCINC:{
        try{
          await wait(3000);
          dispatch({...action, value : action.value})
        }catch (error) {
          console.log("Request failed:", error);
          console.log(error.message);
          dispatch({ type: ActionType.ERR, value : `${error.status} : token err`});
          dispatch({...action, value : 0})
        }
        return;
      }
      default:
        throw new Error();
    }
  }

  const Store = React.createContext();

  window.Store = Store;
  window.fetchData = fetchData;

  /******** Provider, Render ********/

  /*
  React16ではRedux的なstate = initialStateは使用しない
  */
  
  const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => { 
      console.log("--------init--------")
      dispatch({ type: ActionType.TITLE, value : "hogehoge" });
      return () => console.log('unmounting...');
    }, []);
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
  }

  window.Provider = Provider;

})();


/******** Components ********/

/*
React 15.5で廃止 : var App = React.createClass({ render() { return <h1>Hello!...
after React 15.0 : class App extends React.Component{ render() { return <h1>Hello! {this.props.name}...
after React 16.8 : function App(props) { return <h1>Hello! {props.name}...
 -> Hooksでステータス制御が追加
*/

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}


const Counter = () => {
  const { state, dispatch } = React.useContext(Store);
  // useState : ローカル変数の管理, 変更で再描画発生
  const [count, setCount] = React.useState(1);
  // useRef : 変更されても再描画発生しない, DOMの参照ref={}にも使用
  const isFirstRender = React.useRef(true);
  // useEffect : mount, render時動作
  // 第二引数での参照変数変更時に動作, 空配列[]で初回のみ動作, 省略で毎回動作
  React.useEffect(() => {
    if(isFirstRender.current) {
      console.log('1st mounting...');
      isFirstRender.current = false;
    } else {
      console.log(`${count}rd rerendering`);
      dispatch({ type: ActionType.TITLE, value : `count-${count}` });
    }
  }, [count]);
  // useCallback : 使用せず<button onClick={() => dispatch({ type : hoge })}/>と直接記述でもOK
  // count参照しないと値の変更がない
  const clickEvent = React.useCallback((e) => setCount(count+1), [count]); 
  const asyncClickEvent = React.useCallback((e) => {
    fetchData({ 
      type: ActionType.ASYNCINC, 
      value : 2
    }, dispatch)
  }, []); 
  return (
    <>
      <div>{count}</div>
      <div>{state.count}</div>
      <div>{state.title}</div>
      <button onClick={clickEvent}>click</button>
      <button onClick={asyncClickEvent}>click</button>
    </>
  );
}


function RefTimer(){
  const [value, setValue] = React.useState(1);
  
  const ref = React.useRef(null);
  ref.current = () => alert(value);
  React.useEffect(() => ref.current = null, [ref]);
  const mutableCallback = React.useCallback(() => {
    const func = ref.current;
    func && func();
  }, [ref]);
  
  React.useEffect(() => {
    if(value % 5 !== 0) return;
    setTimeout(mutableCallback, 2000);
  }, [value])
  
  return(
    <div>
      <button type="button" onClick={() => setValue(num => num-1)}>-</button>
      {value}
      <button type="button" onClick={() => setValue(num => num+1)}>+</button>
    </div>
  );
}


const App = () => (
  <ErrorBoundary>
    <Provider>
      <Counter/>
    </Provider>
  </ErrorBoundary>
);

/*
廃止予定 : const hwFactory = React.createFactory(HelloWorld);
          ReactDOM.render(hwFactory({name: '02'}), document.getElementById('app02'));
*/

ReactDOM.render(<App/> , document.getElementById('root'));
//const hwElement = <HelloWorld name="01" />;
//ReactDOM.render(hwElement,document.getElementById('root'));

//ReactDOM.render(<App /> , document.getElementById('root'));

