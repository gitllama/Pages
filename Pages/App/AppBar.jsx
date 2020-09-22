/******** Components ********/

const useStyles = MaterialUI.makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    //marginLeft: drawerWidth,
    //[theme.breakpoints.up('sm')]: {
    //  width: `calc(100% - ${drawerWidth}px)`,
    //},
  },
  toolbar2: theme.mixins.toolbar,
  toolbar: {
    marginTop : 80,
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& input' : {
      color: 'LightGrey',
    },
    '& label' : {
      foregroundColor : 'whitesmoke', 
      color: 'LightGrey',
      '&.Mui-focused': { color: 'whitesmoke' }
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { 
        //foregroundColor : 'whitesmoke', 
        borderColor: 'LightGrey', 
        //backgroundColor: 'SteelBlue', 
      },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': {
        borderColor: 'whitesmoke',
      },

    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

(() => {

  // substitute for import
  const {
    Backdrop, CircularProgress, 
    AppBar, Toolbar, Typography, Drawer, IconButton,
    Divider, List, ListItem, ListItemText,
    TextField, Button, Link,

    Icon, Box, Container
  } = MaterialUI;

  // AppBar

  const Loading =()=>{
    const { state } = React.useContext(Store);
    return (
      <Backdrop open={state.busy} style={{zIndex:"100"}}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    );
  }

  const Copyright =()=> {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="null">
          hoge Co,.Ltd.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const Selector =({children})=> {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(Store);
    return (
      <>
      <Box mt={12}>
      </Box>
      <div>
        <Message/>
          {
            Object.keys(children).indexOf(state.region) !== -1
            ? (<>{children[state.region]}</>)
            : (<div>404</div>)
          }
      </div>      
      <Box mt={8}><Copyright /></Box>
      </>
    );
  }


  const MaterialAppBar =({children})=> {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(Store);
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const navi = React.useCallback((e) => dispatch({ type: ActionType.NAVIGATE, value : e.target.textContent}), [dispatch]);
    const toggleDrawer = (anchor, str) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(str);
    };
    return (

              <Container component="main" maxWidth="xs">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton}
              onClick={handleDrawerOpen} 
              color="inherit" aria-label="open drawer">
              <Icon className="fa fa-plus-circle">menu</Icon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              title
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer anchor="left" role="presentation" open={open}      
          onClick={toggleDrawer(null, false)}
          onKeyDown={toggleDrawer(null, false)}>
          <ListItem ><b>menu</b></ListItem>
          <Divider />
        </Drawer>
        <Box mt={12}>
      </Box>
        <div>aaa</div>
        </Container>
    );
  }

  // substitute for export
  window.MaterialAppBar = MaterialAppBar;

})();

