'use strict';

define([
  'react', 'App/actions', 'App/store', 'material-ui', 'App/Libs/QRCam/beep'
],  
(
  React,
  ActionType,
  Store,
  {Grid, Paper},
  wav
)=>{

  const asyncWait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getCurrentTrack = (stream)=>{
    const result = stream.getVideoTracks().find(track=> track.readyState == "live");
    if(result){
      return result.getSettings();
    }
  }

  const asyncRequirejsQR = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js']
        , (dst)=> resolve(dst) 
      );
    });
  }

  const CashReg = ()=>{
    const { state, dispatch } = React.useContext(Store);
    const [ result, setResult ] = React.useState(undefined);
    const refVideo = React.useRef();
    const refSnap = React.useRef();

    React.useEffect(() =>{
      let unmounted = false;
      let canvas = refSnap.current.getContext("2d");
      let stream = undefined;
      let tempResult = undefined;
      let size = {width:320,height:240};
      (async ()=>{
        if (!unmounted){
          try{
            stream = await navigator.mediaDevices.getUserMedia({
              audio: false,             
              video: { facingMode: "environment", width : "auto", height : "auto"},
            });
            refVideo.current.srcObject = stream;
            size = getCurrentTrack(stream);
            while ( true ){ 
              refSnap.current.width = size.width;
              refSnap.current.height = size.height;
              canvas.drawImage(refVideo.current, 0, 0, size.width, size.height);
              let imageData = canvas.getImageData(0, 0, size.width, size.height);
              let jsQR = await asyncRequirejsQR();
              const dst = jsQR(imageData.data, imageData.width, imageData.height);
              const temp = dst ? dst.data : null;
              if(tempResult != temp){
                tempResult = temp;
                setResult(tempResult);
                if(temp != undefined) wav.play();
                //break;
              }
              await asyncWait(500);
            }
          }catch(e){
            console.log(e);
            dispatch({ type: ActionType.ERR, value:e.message});
          }finally{
            if(stream) stream.getVideoTracks().forEach(track=>track.stop());
          }
        }
      })();
      return (()=>{ 
        unmounted = true; 
        if(stream) stream.getVideoTracks().forEach(track=>track.stop());
      });
    }, []);
    
    return (
      <Grid container spacing={0}>
        
        <Grid item xs={6} style={{backgroundColor: "black"}}>
          <video id="player" width="100%" style={{objectFit: "scaleDown"}} ref={refVideo} autoPlay />
          <canvas id="snapshot" style={{display:"none"}} ref={refSnap} />
        </Grid>
        
        <Grid item xs={6} container>

          <Grid item xs={12} container>
            <Grid item xs={4}>
              <Paper>合計金額</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper>100</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>合計数</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper>10</Paper>
            </Grid>
          </Grid>
        
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <Paper>{result}</Paper>
          </Grid>
        </Grid>
      
      </Grid>
    );
  }

  return CashReg;
});