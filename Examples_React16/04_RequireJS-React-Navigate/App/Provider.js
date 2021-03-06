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

  /*
    const LazyComponent = lazy(() => import('.App/Components/Another'));
    <React.Suspense fallback={<div>Loading...</div>}>  
    </React.Suspense>
  */

  const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
      console.log('Provider mounting...');
      dispatch({ type: ActionType.LOADED});
      return () => console.log('Provider unmounting...');
    }, []);
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
  }
  
  return Provider;

});