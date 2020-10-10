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

  console.log("mermaid");

  const asyncCallA = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js']
        , (dst)=> resolve(dst) 
      );
    });
  };

  const asyncCallBuffer = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://bundle.run/buffer']
        , (dst)=> resolve(dst) 
      );
    });
  };

  const asyncCallYaml = ()=>{
    return new Promise((resolve, reject) => {
      requirejs(
        ['https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.14.0/js-yaml.js']
        , (dst)=> resolve(dst) 
      );
    });
  };

  const ProcessType = {
    A : 'Planed',
    B : 'Process-1',
    C : "Process-2",
    D : "Done",
  };
  const AsciiGraph =(src)=> {
    const pKey = Object.keys(ProcessType).filter((key) => ProcessType[key] === src);
    const color = (pKey.length == 1 ? `style ${pKey[0]} fill:#f9f` : "");
    return `
      graph LR
        A(${ProcessType.A}) --> B
        B[${ProcessType.B}] --> C
        C[${ProcessType.C}] --> D[${ProcessType.D}]
        ${color}
    `;
  }
  
  const A =({children})=> {
    const { state, dispatch } = React.useContext(Store);
    const ref =  React.useRef(null);
    const refContainer =  React.useRef(null);
    const clickEvent = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.value }), []); 
    const errevent = React.useCallback((e) => 
      dispatch({ type: ActionType.ERR, value : "aaa" }) 
    , []);
    // コンポーネントが削除された後にコールバックが呼ばれることがあるので
    // unmountedフラグいるよ
    React.useEffect(() => {
      dispatch({ type: ActionType.LOADING});
      let unmounted = false;
      ref.current.innerHTML = "";
      (async () => {    
        let mermaid = await asyncCallA();
        mermaid.initialize({
          startOnLoad:false,
          securityLevel: 'loose',
          theme: 'forest',
          flowchart:{
            //useMaxWidth:false, いれるとサイズが固定されてboxSizingが効かなくなる
            //useMaxWidth:640, これでもいいけど、divにmin maxWidth入れた方がはやいかも
            htmlLabels:true
          }
        });
        if (!unmounted) {
          mermaid.mermaidAPI.render(
            'mermaid_id', 
            AsciiGraph("A"), 
            (svg,bindEvents)=>{
              ref.current.innerHTML = svg;
              bindEvents();
            },
            refContainer.current 
            // 作業用のdivつけてないと再描画の度にゴミdivつくるらしい
            // display:noneだと幅が取れなく描画崩れるそうなので裏に隠す方が良い
          );
          dispatch({ type: ActionType.LOADED});
        }
      })();
      return (()=>{ unmounted = true; });
    }, []);
    return ( 
      <Grid item xs={12}>
        <div id="container" ref={refContainer}/>
        <div style={{minWidth:200, maxWidth:640}} ref={ref}/>
        <Paper>xs=12</Paper>
      </Grid>
    );
  }

  return A;
});