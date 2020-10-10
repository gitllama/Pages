'use strict';

define(['react', 'App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {Grid,Paper}
)=>{

  const C =({children})=> {
    const { state, dispatch } = React.useContext(Store);
    const clickEvent = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.value }), []); 
    return (  
      <div>
      <div>C</div>
        <button value='A' onClick={clickEvent}>A</button>
        <button value='B' onClick={clickEvent}>B</button>
        <button value='back' onClick={clickEvent}>back</button>
      </div>
    );C
  }

  return C;
});