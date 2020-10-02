'use strict';

define(['react', 'jsx!App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {Backdrop, CircularProgress}
)=>{

  const A =({children})=> {
		const { state, dispatch } = React.useContext(Store);
    const clickEvent = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.value }), []); 
    return (  
      <div>
      <div>A</div>
        <button value='B' onClick={clickEvent}>B</button>
        <button value='C' onClick={clickEvent}>C</button>
        <button value='back' onClick={clickEvent}>back</button>
      </div>
    );
  }

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
    );
  }

  return {A, B, C};
});