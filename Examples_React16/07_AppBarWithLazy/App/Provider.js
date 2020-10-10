'use strict';

define(
  [
    'react', 
    'App/actions',
    'App/initialState',
    'App/reducer',
    'App/store',
  ],
  (
    React,
    ActionType,
    initialState,
    reducer,
    Store,
  )=>{

  const Provider = ({children}) => {
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