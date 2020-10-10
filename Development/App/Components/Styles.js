define(['material-ui'],  
(
  {makeStyles}
)=>{

  const useStyles = makeStyles((theme) => ({
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
  
  return useStyles;
});