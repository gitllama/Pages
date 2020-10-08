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

  const BoxTest =({children})=> {
    const { state, dispatch } = React.useContext(Store);
    const clickEvent = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.value }), []); 
    return (  
      <Grid container>
        <Grid item xs={12}>
          <Paper>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
      </Grid>
    );
  }
  return {A, B, C, BoxTest};
});