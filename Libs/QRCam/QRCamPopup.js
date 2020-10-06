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

  const PopupCam =({callback})=>{
    const camWidth = 640;
    const camHeight = 480;
    const refVideo = React.useRef();
    React.useEffect(() =>{
      let unmounted = false;
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
              let canvas = refVideo.current.getContext("2d");
              canvas.current.getImageData(0, 0, width, height);
              callback(undefined);
              if (dst){
                callback(dst.data);
                break;
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
    return (
      <DialogContent>
        <video id="player" ref={refVideo} autoPlay></video>
      </DialogContent>
    )
  }

  const QRCamPopup = ()=>{
    const { state, dispatch } = React.useContext(Store);
    const [result, setResult] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div>
        <div id="result" ref={refResult}>{`Result：${result}`}</div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open
        </Button>
        <Dialog open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <PopupCam callback={(dst)=>{setResult(dst)}}/>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  return QRCamPopup;
});