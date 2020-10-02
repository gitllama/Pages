'use strict';

define(['react', 'App/store', 'material-ui'],  
(
  React, 
  Store,
  {Backdrop, CircularProgress}
)=>{

  const Loading =({children,type})=>{
    const { state } = React.useContext(Store);
    switch(type){
      case 'circular':
        return(
          <React.Fragment>
          <Backdrop open={state.loading} style={{zIndex:"100"}}>
            <CircularProgress color="inherit"/>
          </Backdrop>
          {children}
          </React.Fragment>
        );
      default:
        return(
          <React.Fragment>
            <Backdrop open={state.loading} color="white" style={{background: 'white',zIndex:"100"}}>
              <div>Loading...</div>            
            </Backdrop>
            {children}
          </React.Fragment>
        );
    }
  }
  
  return Loading;
});