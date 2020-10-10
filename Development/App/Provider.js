/******** Provider ********/
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

  const Provider = ({children, eventTarget}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
      console.log('Provider mounting...');
      Object.keys(eventTarget).map(key => {
        eventTarget[key](dispatch);
      });
      return () => console.log('Provider unmounting...');
    }, []);
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
  }

  const OldProvider = ({children}) => {
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