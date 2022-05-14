import React from 'react'
// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }} >
    <AppBar position="relative" style={{backgroundColor:"rgb(61,64,91)", height:"60px", border:"2px solid", position:"relative"}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
            onClick={() => navigate('/')}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button color="inherit" onClick={()=>navigate("/todos-create")}>Add Tasks</Button>
          
        </Typography>
        <Button color="inherit" onClick={()=>navigate("/login")}>Login</Button>
        <Button color="inherit" onClick={()=>navigate("/signup")}>Signup</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}
