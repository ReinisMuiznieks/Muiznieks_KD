import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import SettingsIcon from '@material-ui/icons/';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));


function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={Link} to="/">
            {/* <ListItemIcon><DashboardIcon /></ListItemIcon> */}
            <ListItemText primary="Verbum" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/admin/users">
            {/* <ListItemIcon><SettingsIcon /></ListItemIcon> */}
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/admin/categories">
            {/* <ListItemIcon><SettingsIcon /></ListItemIcon> */}
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button component={Link} to="/admin/cards">
            {/* <ListItemIcon><SettingsIcon /></ListItemIcon> */}
            <ListItemText primary="Cards" />
          </ListItem>
          <ListItem button component={Link} to="/admin/tests">
            {/* <ListItemIcon><SettingsIcon /></ListItemIcon> */}
            <ListItemText primary="Tests" />
          </ListItem>
          <ListItem button component={Link} to="/admin/questions">
            {/* <ListItemIcon><SettingsIcon /></ListItemIcon> */}
            <ListItemText primary="Questions" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;
