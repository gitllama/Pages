'use strict';

define([
  'react', 'App/actions', 'App/store', 'material-ui'
],  
(
  React,
  ActionType,
  Store,
  {Grid, Paper}
)=>{

  const asyncWait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getCurrentTrack = (stream)=>{
    stream.getVideoTracks().forEach(track=>{
      if(track.readyState = "live"){
        const dst = track.getSettings();
        return {width : dst.width, height: dst.height};
      }
    });
  }

  const CashReg = ()=>{
    const { state, dispatch } = React.useContext(Store);
    const [result, setResult] = React.useState(undefined);
    const camWidth = 640;
    const camHeight = 480;

    const refVideo = React.useRef();
    const refSnap = React.useRef();
    const refResult = React.useRef();

    React.useEffect(() =>{
      let unmounted = false;
      let canvas = refSnap.current.getContext("2d");
      let stream = undefined;
      (async ()=>{
        if (!unmounted){
          try{
            stream = await navigator.mediaDevices.getUserMedia({
              audio: false,             
              video: {
                facingMode: "environment", 
                width : camWidth,
                height : camHeight
              },
            });
            refVideo.current.srcObject = stream;
            while ( true ){ 
              let width = refSnap.current.width;
              let height = refSnap.current.height;
              canvas.drawImage(refVideo.current, 0, 0, width, height);
              let imageData = canvas.getImageData(0, 0, width, height);
              //let jsQR = await asyncRequirejsQR();
              //let dst =jsQR(imageData.data, imageData.width, imageData.height);
              //if (dst){
              //  setResult(dst.data);
              //  break;
              //}
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
      <Grid item xs={12}>
        <Grid item xs={6}>
          <video id="player" style={{objectFit: "scaleDown"}} ref={refVideo} autoPlay></video>
          <canvas id="snapshot" style={{display:"none"}} ref={refSnap}
          width={state.screen.width > state.screen.height ? camWidth : camHeight}
          height={state.screen.width > state.screen.height ? camHeight : camWidth}></canvas>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={6}>
            <Paper>A</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>B</Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return CashReg;
});