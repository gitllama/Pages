'use strict';

define(['react', 'App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {Grid,Paper}
)=>{

  const B =({children})=> {
    const { state, dispatch } = React.useContext(Store);
    const clickEvent = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.value }), []); 
    return (  
      <div>
      <div>B</div>
        <button value='B' onClick={clickEvent}>A</button>
        <button value='C' onClick={clickEvent}>C</button>
        <button value='back' onClick={clickEvent}>back</button>
      </div>
    );
  }

  return B;
});