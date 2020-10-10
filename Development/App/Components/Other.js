'use strict';

define(['react', 'jsx!App/actions', 'App/store', 'material-ui'],  
(
  React,
  ActionType,
  Store,
  {
    Backdrop, CircularProgress, Typography, Link,
    Snackbar, Button
  }
)=>{

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
        this.state = { hasError: false };
      }
      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
      componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, errorInfo);
      }
      render() {
        if (this.state.hasError) {
          return <h1>Something went wrong.</h1>;
        }
        return this.props.children; 
      }
  };
  
  return {Loading, ErrorBoundary};
});

/*

        <Alert severity="error">{state.err.message}</Alert >

            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
*/