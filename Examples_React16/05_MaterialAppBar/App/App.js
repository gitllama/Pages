'use strict';

define(
  [
    'react', 
    'react-dom',
    'jsx!App/Provider',
    'jsx!App/Components/CommonParts',
    'jsx!App/Components/Selector',
    'jsx!App/Components/AppBar',
    'jsx!App/Components/Test',

    'material-ui'
  ],
  (
    React,
    ReactDOM, 
    Provider,
    {Loading, Copyright, ErrSnackbar},
    Selector,
    AppBar,
    {A, B, C},
    { Box, ThemeProvider, createMuiTheme,responsiveFontSizes,CssBaseline   }
  )=>{

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  
  const regionManeger = {
    ["A"] : (<A/>),
    ["B"] : (<B/>),
    ["C"] : (<C/>),
    ["D"] : (<div>under construction</div>),
  };



  const App = () => (
    <Provider>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrSnackbar/>         
      <AppBar title="Test" regions={regionManeger}>
        <Loading/>
        <Box mt={10} width="auto" minHeight={480} bgcolor="grey.300">
          <Selector defultRegion='A'>
            {regionManeger}
          </Selector>
        </Box>
        <Box mt={3}>
          <Copyright name="gitllama" href="https://github.com/gitllama"/>
        </Box>
      </AppBar>
      </ThemeProvider>
    </Provider>
  );
  // mt : margin-top, width={1} : 100%

  ReactDOM.render(<App />, document.getElementById('root'));

});