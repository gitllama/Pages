'use strict';

define(
  [
    'react', 
    'react-dom',
    'jsx!App/Provider',
    'jsx!App/Components/CommonParts',
    'jsx!App/Components/AppBar',
    'jsx!page',

    'material-ui'
  ],
  (
    React,
    ReactDOM, 
    Provider,
    {Loading, Copyright, ErrSnackbar},
    AppBar,
    Page,
    
    { Box, ThemeProvider, createMuiTheme,responsiveFontSizes,CssBaseline   }
  )=>{

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  
  const LazyComponent = React.lazy(()=> define(['jsx!App/Components/AppBar'],(AppBar)=> AppBar));
  const LazyComponentA = React.lazy(()=> define(['jsx!App/Components/Test'],({A, B, C, BoxTest})=> A));

  const App = () => (
    <Provider>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrSnackbar/>         
      <AppBar title="Test" regions={regionManeger}>
        <Loading/>
        <Box mt={10} width="auto" minHeight={480} bgcolor="grey.300">
          <Page/>
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
