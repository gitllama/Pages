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

  const camWidth = 320;
  const camHeight = 240;
  const waitTime = 300;

  const asyncRunStream =async(target)=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,             
      video: {
        facingMode: "environment", 
        width : camWidth,
        height : camHeight
      },
    });
    target.current.srcObject = stream;
    target.current.srcObject.getVideoTracks().forEach(track=>{ 
      console.log(track);
    });
  }

  const StopStream =(target)=>{
    if(target.current){
      if(target.current.srcObject){
        target.current.srcObject.getVideoTracks().forEach(track=>{ 
          track.stop();
          console.log(track);
        });
        target.current.srcObject = null;
      }
    }
  }

  const asyncGetQR = async (refSnap, refVideo) =>{
    let canvas = refSnap.current.getContext("2d");
    let width = refSnap.current.width;
    let height = refSnap.current.height;
    canvas.drawImage(refVideo.current, 0, 0, width, height);
    let imageData = canvas.getImageData(0, 0, width, height);
    let jsQR = await asyncRequirejsQR();
    let dst = jsQR(imageData.data, imageData.width, imageData.height);
    return dst != undefined ? dst.data : null;
  }
  
  /* 
    起動時にclose状態でもuseEffectが呼ばれ
    open時に非描画状態に生成されたuseEffectがreturnする
    close時にも当然returnする
  */
  const PopupCam =({open, callback})=>{
    const { state, dispatch } = React.useContext(Store);
    const refVideo = React.useRef();
    const refSnap = React.useRef();
    React.useEffect(() =>{
      let unmounted = false;
      (async ()=>{
        try{
          if(!open) return;
          await asyncRunStream(refVideo);
          while ((!unmounted) && open){
            let dst = await asyncGetQR(refSnap, refVideo);
            if(dst){
              callback(dst);
              break;
            }
            await asyncWait(waitTime);
          }
        }catch(e){
          dispatch({ type: ActionType.ERR, value:e.message});
          callback(null);
        }
      })();  
      return (()=>{
        unmounted = true;
        StopStream(refVideo);
      });  
    }, [open]);
    const handleClose = () => callback(null);
    return (
      <Dialog open={open} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <video id="player" style={{display:"none"}} ref={refVideo} autoPlay></video>
          <canvas id="snapshot" ref={refSnap} 
          width={state.screen.width > state.screen.height ? camWidth : camHeight} 
          height={state.screen.width > state.screen.height ? camHeight : camWidth}></canvas>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
    </Dialog>

    )
  }


  const initResult = {
    owner : undefined,
    repos : undefined,
    title : undefined,
    num : undefined,
    source : undefined
  } 

  const QRCamPopup = ()=>{
    const { state, dispatch } = React.useContext(Store);
    const [result, setResult] = React.useState(initResult);
    const [open, setOpen] = React.useState(false);
    const handleClose = (dst) => {
      setOpen(false);
      try{
        setResult(Object.assign({},initResult,JSON.parse(dst)));
      }catch(e){
        setResult(Object.assign({},initResult,{source:dst}));
      }      
    };
    return (
      <div>
        <div id="result1" >{`owner : ${result.owner}`}</div>
        <div id="result2" >{`repos：${result.repos}`}</div>
        <div id="result3" >{`title：${result.title}`}</div>
        <div id="result4" >{`num：${result.num}`}</div>
        <div id="result5" >{`all：${result.source}`}</div>
        <Button variant="outlined" color="primary" onClick={()=>setOpen(true)}>
          Open
        </Button>
        <PopupCam open={open} callback={(dst)=>{handleClose(dst);}} />
      </div>
    )
  }

  return QRCamPopup;
});