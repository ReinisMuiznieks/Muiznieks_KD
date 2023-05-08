import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';


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
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Verbum" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/admin/users">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/admin/categories">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button component={Link} to="/admin/cards">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Cards" />
          </ListItem>
          <ListItem button component={Link} to="/admin/tests">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Tests" />
          </ListItem>
          <ListItem button component={Link} to="/admin/questions">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;
