'use strict';

define(['react', 'jsx!App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {Backdrop, CircularProgress}
)=>{

  const Selector =({defultRegion, children})=> {
    const { state, dispatch } = React.useContext(Store);
    React.useEffect(() => {
      console.log("selector");
      dispatch({ type: ActionType.NAVIGATE, value : defultRegion });
    }, []);
    try{
      return (
        <div>{
          Object.keys(children).indexOf(state.region) !== -1
          ? (<React.Fragment>{children[state.region]}</React.Fragment>)
          : (<div>404</div>)
        }</div>
      );  
    }catch(e){
      return <div>{e}</div>
    }
  }
  
  return Selector;
});