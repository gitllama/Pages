'use strict';

define(['react', 'App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {
    Backdrop, CircularProgress, Typography, Link,
    Snackbar, Button
  }
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
  
  const Copyright =({name,href})=> {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href={href}>
          {name}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const ErrSnackbar =({name,href})=> {
    //const [open, setOpen] = React.useState(false);
    const { state, dispatch } = React.useContext(Store);
    const handleClose = React.useCallback((e) => {
      dispatch({type: ActionType.ERR_HANDLED});
    }, [dispatch]);
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }  
      //setOpen(false);
      dispatch({type: ActionType.ERR_HANDLED})
    };  
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!(state.err.handled)}
        message={state.err.message}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              CLOSE
            </Button>
          </React.Fragment>
        }
      />
    );
  }

  return {Loading, Copyright, ErrSnackbar};
});

/*

        <Alert severity="error">{state.err.message}</Alert >

            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
*/