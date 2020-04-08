import { AppBar, IconButton, Fab, Toolbar, makeStyles } from "@material-ui/core";
import  MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      marginTop: 20,
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));
  


export const BottomBar = () => {
    const classes = useStyles();

    return (
    //     <AppBar position="fixed" color="primary" className={classes.appBar}>
    //     <Toolbar>
          
    //     </Toolbar>
    //   </AppBar>
    null
        
    )
}


