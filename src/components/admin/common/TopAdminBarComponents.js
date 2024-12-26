import * as React from 'react';
import {  AppBar,Toolbar,IconButton,Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';


const drawerWidth = 240;


function TopAdminBarComponents(props) {

  const location = useLocation();
  const openedPath = location.pathname;
  const menu_arr = ['dashboard','user','category','project','page','contact','emails_subscription','settings'];
  let selected_menu = 'dashboard';
  for (let i = 0; i < menu_arr.length; i++) {
    let matched = openedPath.match(menu_arr[i]);
    if(matched) {
      selected_menu = menu_arr[i];
    }
  }
 
  let drawer_text = 'Dashboard';


  if(selected_menu == 'user' )
    drawer_text = 'Admin Users';
  if(selected_menu == 'category' )
    drawer_text = 'Project Categories';
  if(selected_menu == 'project' )
    drawer_text = 'Projects';
  if(selected_menu == 'page' )
    drawer_text = 'Website static pages';
  if(selected_menu == 'contact' )
    drawer_text = 'Contact Us records';
  if(selected_menu == 'emails_subscription' )
    drawer_text = 'Email subscription records';
  if(selected_menu == 'settings' )
    drawer_text = 'Website settings';






  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };


  return (
    <>
    <CssBaseline />
    <AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
       {drawer_text}
      </Typography>
    </Toolbar>
  </AppBar>
  </>
  );
}

export default TopAdminBarComponents;
