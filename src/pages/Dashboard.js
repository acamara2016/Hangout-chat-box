import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {auth} from '../services/firebase'
import synchronized from '../components/synchronized';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import ChatRoom from '../ChatRoom';
import firebase from "firebase/app";
import "firebase/database";
const drawerWidth = 240;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [users, setUser] = React.useState(0);
  
  var x = 0;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //var database = firebase.database();
  const [open, setOpen] = React.useState(false);
  const handleCreateChatRoom = (e) =>{
    firebase.database().ref('users/' + auth.currentUser.uid+'/chats').push("2")
    // .set({
    //   username: auth.currentUser.displayName,
    //   photo: auth.currentUser.photoURL,
    //   state : "connected",
    //   chats: ["1"],
    // });
  }
  useEffect(() => {
    firebase.database().ref('users/' + auth.currentUser.uid).set({
      username: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
      state : "connected",
      chats: ["1"],
    });
    const dbRef = firebase.database().ref();
    dbRef.child("users").get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setUser(snapshot.val())
        users.push(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });



 }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () =>{
    firebase.database().ref('users/'+auth.currentUser.uid).update({
      state:"disconnected"
    }).then(auth.signOut())
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <synchronized/>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        
          <Typography variant="h6" noWrap>
            Chat Application
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleLogout}
            
          >
            <ExitToAppIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}>
           
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
        <Divider />
      </Drawer> */}
      <main className={classes.content}>
      <ChatRoom chat_id="1" users={users} id={value}/>
          {/* <TabPanel value={value} index={0}>
            <ChatRoom chat_id="1" users={users} id={value}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <ChatRoom chat_id="1" users={users} id={value}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div class="container-fluid">
            <div class="row">

            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </main>
    </div>
  );
}