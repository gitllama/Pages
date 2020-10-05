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
    'jsx!../Libs/QRCam/QRCam',
    'jsx!App/Components/Home',
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
    QRCam,
    Home
  )=>{

  const regionManeger = {
    ["Home"] : (<Home/>),
    ["Mermaid"] : (<Mermaid/>),
    ["QRCam"] : (<QRCam/>),
    ["Default"] : (<div>under construction</div>),
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