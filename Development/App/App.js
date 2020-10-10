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
  const regionManeger = {
    Home : lazy('jsx!App/Components/Home'),
    Mermaid : lazy('jsx!App/Libs/Mermaid/Mermaid'),
    QRCam : lazy('jsx!App/Libs/QRCam/QRCam'),
    QRCamPopup : lazy('jsx!App/Libs/QRCam/QRCamPopup'),
    CreateQR : lazy('jsx!App/Libs/QRCam/CreateQR'),
    CashRegister : lazy('jsx!App/Libs/QRCam/CashRegister'),
    Default : (<div>under construction</div>),
  };

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
        <Box mt={10} width="auto" minHeight={480}>
          <Selector>{regionManeger}</Selector>
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