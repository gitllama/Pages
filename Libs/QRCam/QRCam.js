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

  const asyncRequirejsQR = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js']
        , (dst)=> resolve(dst) 
      );
    });
  }

  const getCurrentTrack = (stream)=>{
    stream.getVideoTracks().forEach(track=>{
      if(track.readyState = "live"){
        const dst = track.getSettings();
        return {width : dst.width, height: dst.height};
      }
    });
  }

  const QRCam = ()=>{
    const [result, setResult] = React.useState(undefined);
    const refVideo = React.useRef();
    const refSnap = React.useRef();
    const refResult = React.useRef();
    const width = 480;
    const height = 640;
    React.useEffect(() =>{
      let unmounted = false;
      //let width = refSnap.current.width;
      //let height = refSnap.current.height;
      let canvas = refSnap.current.getContext("2d");
      let stream = undefined;
      (async ()=>{
        if (!unmounted){
          try{
            // カメラストリームをプレイヤーのデータに設定
            stream = await navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: "environment", 
                width : width,
                height : height
              },
              audio: false
            });
            const currentTrack = getCurrentTrack(stream);
            refVideo.current.srcObject = stream;

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
          }finally{
            if(stream) stream.getVideoTracks.forEach(track=>track.stop());
            stream = undefined;
          }
        }
      })();
      return (()=>{ 
        unmounted = true; 
        if(stream) stream.getVideoTracks.forEach(track=>track.stop());
        stream = undefined;
      });
    }, []);
    
    return (
      <div>
        <div id="result" ref={refResult}>{`Result：${result}`}</div>
        <video id="player" ref={refVideo} autoPlay></video>
        <canvas id="snapshot" ref={refSnap} width={width} height={height}></canvas>
      </div>
    )
  }

  return QRCam;
});