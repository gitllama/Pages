  // babel内ではimport使えないので、外部で遅延リードの準備
  // アイドル時読み込みしたい
  
const asyncOctokit = async () =>{ 
  let hoge = await import('https://cdn.skypack.dev/@octokit/rest');
  return new hoge.Octokit();
}
  
const asyncGraphql = async () =>{
  let dst = await import('https://cdn.skypack.dev/@octokit/graphql');
  return dst;
}

const globalVariables = {
  organization : 'gitllama',
  href : 'https://github.com/gitllama'
};

const regionPaths = {
  Home : 'jsx!App/Components/Home',
  Mermaid : 'jsx!App/Libs/Mermaid/Mermaid',
  QRCam : 'jsx!App/Libs/QRCam/QRCam',
  QRCamPopup : 'jsx!App/Libs/QRCam/QRCamPopup',
  CreateQR : 'jsx!App/Libs/QRCam/CreateQR',
  CashRegister : 'jsx!App/Libs/QRCam/CashRegister',
};

(async()=>{
  window.babelConfig = {};

  if(babelflag){
    requirejs.config({
      paths: {
        'jsx': 'App/Logic/react-require.min',
        'babel': 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min',
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        'material-ui': 'https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min',
        'immer': 'https://unpkg.com/immer@6.0.3/dist/immer.umd.production.min',
      },
    });
  }else{
    requirejs.config({
      paths: {
        'jsx': 'App/Logic/react-require.min',
        'babel': 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min',
        'react': 'https://unpkg.com/react@16/umd/react.production.min',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.production.min',
        'material-ui': 'https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min',
        'immer': 'https://unpkg.com/immer@6.0.3/dist/immer.umd.production.min',
      },
    });     
  }

  require(['jsx!App/App']);

})();