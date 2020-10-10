'use strict';

define(
  [
    'react', 
    'react-dom',
    'jsx!App/Provider',
    'jsx!App/Components/CommonParts',
    'jsx!App/Components/AppBar',

    'material-ui'
  ],
  (
    React,
    ReactDOM, 
    Provider,
    {Selector, lazy, Copyright, ErrSnackbar},
    AppBar,
    
    { Box,CssBaseline   }
  )=>{
  
  //const LazyComponent = React.lazy(() => import('./LazyComponent'));
  
  const regionManeger = {
    ["A"] : lazy('jsx!App/Components/Page-A'),
    ["B"] : lazy('jsx!App/Components/Page-B'),
    ["C"] : lazy('jsx!App/Components/Page-C'),
  };

  const App = () => (
    <Provider>
      <CssBaseline />
      <ErrSnackbar/>         
      <AppBar title="Test" regions={regionManeger}>
        <Box mt={10} width="auto" minHeight={480} bgcolor="grey.300">
          <Selector>{regionManeger}</Selector>
        </Box>
        <Box mt={3}>
          <Copyright name="gitllama" href="https://github.com/gitllama"/>
        </Box>
      </AppBar>
    </Provider>
  );
  // mt : margin-top, width={1} : 100%

  ReactDOM.render(<App />, document.getElementById('root'));

});

