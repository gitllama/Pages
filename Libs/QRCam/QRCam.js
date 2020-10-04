'use strict';

define([
  'react', 'App/actions', 'App/store'
],  
(
  React,
  ActionType,
  Store
)=>{

  const asyncWait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const asyncGetStream = (width, height)=>{
    return new Promise((resolve, reject) => {
      //カメラ使用許可
      navigator.mediaDevices.getUserMedia({
        video: {facingMode: "environment", width: width, height: height}, 
        audio: false
      }).then((dst)=>{
        resolve(dst);
      });
    });
  }

  const asyncRequirejsQR = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js']
        , (dst)=> resolve(dst) 
      );
    });
  }

  const QRCam = ()=>{
    const [result, setResult] = React.useState(undefined);
    const refVideo = React.useRef();
    const refSnap = React.useRef();
    const refResult = React.useRef();
    React.useEffect(() =>{
      let unmounted = false;
      let width = refSnap.current.width;
      let height = refSnap.current.height;
      let canvas = refSnap.current.getContext("2d");
      (async ()=>{
        if (!unmounted){
        try{
          // カメラストリームをプレイヤーのデータに設定
          refVideo.current.srcObject = await asyncGetStream(width, height);
          // setIntervalの代用
          while ( true ){ 
            canvas.drawImage(refVideo.current, 0, 0, width, height);
            let imageData = canvas.getImageData(0, 0, width, height);
            let jsQR = await asyncRequirejsQR();
            let dst =jsQR(imageData.data, imageData.width, imageData.height);
            if (dst){
              //refResult.current.innerText = result.data;
              setResult(dst.data);
              break;
            }
            await asyncWait(500); // 500ms待機する
          }
        }catch(e){
          //console.log(JSON.stringify(err));
          console.log(e);
        }
        }
        return (()=>{ unmounted = true; });
      })();
    }, []);
    
    return (
      <div>
        <div id="result" ref={refResult}>{`Result：${result}`}</div>
        <video id="player" ref={refVideo} autoPlay></video>
        <canvas id="snapshot" ref={refSnap} width="480" height="640"></canvas>
      </div>
    )
  }

  return QRCam;
});