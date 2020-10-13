'use strict';

define(
  [
    'react', 
    'react-dom',
    'jsx!App/Provider',
    'jsx!App/Components/AppBar',
    'jsx!App/Components/Common',
    'material-ui',
  ],
  (
    React,
    ReactDOM, 
    Provider,
    AppBar,
    { Selector, lazy, Copyright, Loading, ErrSnackbar },
    { Box, CssBaseline },
  )=>{

  /* Regions */
  const objectMap = (obj, fun) => Object.fromEntries(Object.entries(obj).map(fun));
  const regionManeger = objectMap(regionPaths, ([ key, val ]) => [ key, lazy(val) ]);

  /* EventListener */
  const eventTarget = {
    // スマフォの画面回転
    screenChanged : (dispatch)=> window.addEventListener("orientationchange", ()=>{
      setTimeout(()=>{ //遅延させないと処理間に合わない？
        const width = window.parent.screen.width
        const height = window.parent.screen.height
        dispatch({ type: ActionType.SCREEN, value:{width:width,height:height}});
      }, 100);
    }),
  }
  
  const App = () => (
    <Provider eventTarget={eventTarget}>
      <AppBar title="Test" regions={regionManeger}>
        <Loading/>
        <ErrSnackbar/>
        <Box mt={10} width="auto" minHeight={480}>
          <Selector>{regionManeger}</Selector>
        </Box>
        <Box mt={3}>
          <Copyright name={globalVariables.organization} href={globalVariables.href}/>
        </Box>
      </AppBar>
    </Provider>
  );
  // mt : margin-top, width={1} : 100%
  // Boxの色 : bgcolor="grey.300"

  ReactDOM.render(<App />, document.getElementById('root'));

});