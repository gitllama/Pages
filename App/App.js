'use strict';

define(
  [
    'react', 
    'react-dom',
    'jsx!App/Provider',
    'jsx!App/Components/CommonParts',
    'jsx!App/Components/Selector',
    'jsx!App/Components/AppBar',
    'material-ui',

    'jsx!../Libs/Mermaid/Mermaid',
  ],
  (
    React,
    ReactDOM, 
    Provider,
    {Loading, Copyright, ErrSnackbar},
    Selector,
    AppBar,
    { Box },

    Mermaid,
  )=>{

  const regionManeger = {
    ["Home"] : (<div>under construction</div>),
    ["Mermaid"] : (<Mermaid/>),
    ["QRCam"] : (<QRCam/>),
  };
  
  const App = () => (
    <Provider>
      <ErrSnackbar/>         
      <AppBar title="Test" regions={regionManeger}>
        <Loading/>
        <Box mt={10} width="auto" minHeight={480} bgcolor="grey.300">
          <Selector defultRegion='Home'>
            {regionManeger}
          </Selector>
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