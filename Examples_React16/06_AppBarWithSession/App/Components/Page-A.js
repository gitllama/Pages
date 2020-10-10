'use strict';

define(['react', 'App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {Grid,Paper}
)=>{

  const A =({children})=> {
		const { state, dispatch } = React.useContext(Store);
    const clickEvent = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.value }), []); 
    const errevent = React.useCallback((e) => 
      dispatch({ type: ActionType.ERR, value : "aaa" }) 
    , []); 
    return (  
      <div>
      <div>A</div>
        <button value='B' onClick={clickEvent}>B</button>
        <button value='C' onClick={clickEvent}>C</button>
        <button value='back' onClick={clickEvent}>back</button>
        <button onClick={errevent}>err</button>
      </div>
    );
  }

  return A;
});