'use strict';

define([
  'react', 'App/actions', 'App/store'
],  
(
  React,
  ActionType,
  Store
)=>{

  function  sleep(ms){
    return new Promise( function(resolve) {
      setTimeout(resolve, ms);
    });
  }

  /*
      requirejs(
        ['https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js']
        , (jsQR)=>{
          const scanResult = jsQR(imageData.data, imageData.width, imageData.height);
          if (scanResult) {
            clearInterval(intervalHandler);
            if (callback) {
              callback(scanResult);
            }
          }
        }
      );
*/

  const asyncRequirejsQR = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js']
        , (dst)=> resolve(dst) 
      );
    });
  };

  const asyncGetStream = (width, height)=>{
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({
        video: {facingMode: "environment", width: width, height: height}, audio: false
      }).then((dst)=>{
        resolve(dst);
      });
    });
  }

  const QRCam = ()=>{
    const refVideo = React.useRef();
    const refSnap = React.useRef();
    const refResult = React.useRef();
    React.useEffect(() =>{
      (async ()=>{
        try{
          let width = refSnap.current.width;
          let height = refSnap.current.height;
          let stream = await asyncGetStream(width, height);
          player.srcObject = stream;// カメラストリームをプレイヤーのデータに設定
          let canvasContext = refSnap.current.getContext("2d");
          while ( true ){ //setIntervalの代用
            canvasContext.drawImage(refVideo.current, 0, 0, width, height);
            let imageData = canvasContext.getImageData(0, 0, width, height);
            let jsQR = await asyncRequirejsQR();
            let result =jsQR(imageData.data, imageData.width, imageData.height);
            if (result){
              refResult.current.innerText = result.data;
              break;
            }
            await sleep(500); // 500ms待機する
          }
        }catch(e){
          //console.log(JSON.stringify(err));
          console.log(e);
        }
      })();
    } , []);
    
    return (
      <div>
        <div id="result" ref={refResult}>null</div>
        <video id="player" ref={refVideo} autoPlay></video>
        <canvas id="snapshot" ref={refSnap} width="640" height="480"></canvas>
      </div>
    )
  }

  return QRCam;
});