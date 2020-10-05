'use strict';

define(
  [
    'react', 
    'jsx!App/actions',
    'jsx!App/initialState',
    'jsx!App/reducer',
    'jsx!App/store',
  ],
  (
    React,
    ActionType,
    initialState,
    reducer,
    Store,
  )=>{

  /*
    const LazyComponent = lazy(() => import('.App/Components/Another'));
    <React.Suspense fallback={<div>Loading...</div>}>  
    </React.Suspense>
  */

  //イベントリスナー
  const screenChanged =(dispatch)=> window.addEventListener("orientationchange", ()=>{
    setTimeout(()=>{ //遅延させないと処理間に合わない？
      const width = window.parent.screen.width
      const height = window.parent.screen.height
      dispatch({ type: ActionType.SCREEN, value:{width:width,height:height}});
    }, 100);
  });


  const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
      console.log('Provider mounting...');
      screenChanged(dispatch);
      dispatch({ type: ActionType.LOADED});
      return () => console.log('Provider unmounting...');
    }, []);
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
  }
  const Provider2 = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [open, setOpen] = React.useState(false);
    const isFirstRender = React.useRef(true);
    React.useEffect(() => {
      if(isFirstRender.current) {
        console.log('1st mounting...');
        isFirstRender.current = false;
        dispatch({ type: ActionType.LOADING});
        setOpen(true);
      } else {
        console.log(`2nd rerendering`);
        dispatch({ type: ActionType.LOADED});
      }
      return () => console.log('unmounting...');
    }, [open]);
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
  }
  return Provider;

});