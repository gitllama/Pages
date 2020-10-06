'use strict';

define([
  'react', 'App/actions', 'App/store', 'material-ui'
],  
(
  React,
  ActionType,
  Store,
  {Dialog, DialogActions, DialogContent, Button}
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

  const PopupCam =({open, callback})=>{
    const { state, dispatch } = React.useContext(Store);
    const camWidth = 640;
    const camHeight = 480;
    const [result, setResult] = React.useState(undefined);
    const refVideo = React.useRef();
    const refSnap = React.useRef();
    React.useEffect(() =>{
      let unmounted = false;
      let stream = undefined;
      let canvas = refSnap.current.getContext("2d");
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
              let width = state.screen.width > state.screen.height ? camWidth : camHeight;
              let height = state.screen.width > state.screen.height ? camHeight : camWidth;
              canvas.drawImage(refVideo.current, 0, 0, width, height);
              let imageData = canvas.getImageData(0, 0, width, height);
              let jsQR = await asyncRequirejsQR();
              let dst = jsQR(imageData.data, imageData.width, imageData.height);
              if (dst){
                setResult(dst.data);
                //break;
              }
              await asyncWait(500); // 500ms待機する
            }
          }catch(e){
            dispatch({ type: ActionType.ERR, value:e.message});
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
    const handleClose = () => {
      
      callback(result);
      //setResult(dst);
    };
    return (
      <Dialog open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <div id="result" >{`Result：${result}`}</div>
          <video id="player" ref={refVideo} autoPlay></video>
          <canvas id="snapshot" ref={refSnap} width={0} height={0}></canvas>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
    </Dialog>

    )
  }

  const QRCamPopup = ()=>{
    const { state, dispatch } = React.useContext(Store);
    const [result, setResult] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (dst) => {
      setOpen(false);
      setResult(dst);
    };
    return (
      <div>
        <div id="result" >{`Result：${result}`}</div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open
        </Button>
        <PopupCam open={open} callback={(dst)=>{handleClose}} />
      </div>
    )
  }

  return QRCamPopup;
});