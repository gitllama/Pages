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

    'jsx!App/Components/Home',
    'jsx!../Libs/Mermaid/Mermaid',
    //'jsx!../Libs/QRCam/QRCam',
    'jsx!../Libs/QRCam/CreateQR',
    'jsx!../Libs/QRCam/QRCamPopup',
  ],
  (
    React,
    ReactDOM, 
    Provider,
    {Loading, Copyright, ErrSnackbar},
    Selector,
    AppBar,
    { Box },

    Home,
    Mermaid,
    //QRCam,
    CreateQR,
    QRCamPopup
  )=>{

  const regionManeger = {
    ["Home"] : (<Home/>),
    ["Mermaid"] : (<Mermaid/>),
    ["QRCam"] : (<QRCam/>),
    ["QRCamPopup"] : (<QRCamPopup/>),
    ["CreateQR"] : (<CreateQR/>),
    ["Default"] : (<div>under construction</div>),
  };
  
  const App = () => (
    <Provider>
      <ErrSnackbar/>         
      <AppBar title="Test" regions={regionManeger}>
        <Loading/>
        <Box mt={10} width="auto" minHeight={480}>
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
  // Boxの色 : bgcolor="grey.300"

  ReactDOM.render(<App />, document.getElementById('root'));

});