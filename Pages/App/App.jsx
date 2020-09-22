
(() => {

  /******** Actions, ActionCreater ********/

  const Actions = [
    'RESET',
    'LOADING',
    "ERR",
    "NAVIGATE",
    "TITLE",
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
  };

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
    TITLE : (state, action) => {
      document.title = action.value;
      return { ...state, title : action.value }
    },
    ASYNCLOGIN : (state, action) => {
      const nextState = { ...state };
      nextState.authName = action.value;
      nextState.loading = false;
      return nextState;
    },
    ASYNCSEARCHISSUE : (state, action) => {
      const nextState = { ...state };
      nextState.issuelist = action.value;
      nextState.loading = false;
      return nextState;
    },
    LOGOUT : (state, action) => {
      const nextState = { ...state };
      api.changeAuth(undefined);
      nextState.authName = undefined;
      return nextState;
    },
  });


  async function fetchData(action, dispatch){
    console.log("fetch", action);
    dispatch({ type: ActionType.ISBUSY });
    switch(action.type) {
      case ActionType.ASYNCLOGIN:{
        try{
          dispatch({...action, value : dst.login})
        }catch (error) {
          console.log("Request failed:", error);
          console.log(error.message);
          dispatch({ type: ActionType.ERR, value : `${error.status} : token err`});
          dispatch({...action, value : undefined})
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
  const { state } = React.useContext(Store);
  const [count, setCount] = React.useState(1); //変更で再描画発生
  const isFirstRender = React.useRef(true);    //変更されても再描画発生しない
  // mount, render時動作
  // 第二引数での参照変数変更時に動作, 空配列[]で初回のみ動作
  React.useEffect(() => {
    if(isFirstRender.current) {
      console.log('1st mounting...');
      isFirstRender.current = false;
    } else {
      console.log(`${count}rd rerendering`);
    }
  }, [count]);//
  // count参照しないと最初しか動かない
  const clickevent = React.useCallback((e) => setCount(count+1), [count]); 
  return (
    <>
      <div>{count}</div>
      <button onClick={clickevent}>click</button>
    </>
  );
}

const App = () => (
  <ErrorBoundary>
    <Provider>
      <MaterialAppBar/>
    </Provider>
  </ErrorBoundary>
);


ReactDOM.render(<App/> , document.getElementById('root'));
