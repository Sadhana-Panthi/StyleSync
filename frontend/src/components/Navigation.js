import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navigation() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'rgba(255, 182, 193, 0.6)', // Light pink with slight transparency
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontFamily: "'Playfair Display', serif", 
            fontWeight: 'bold', 
            color: '#2c3e50', 
          }}
        >
          StyleSync
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            color: '#2c3e50', 
            textTransform: 'none',
            margin: '0 6px',
          }}
        >
          Home
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/gallery" 
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            color: '#2c3e50',
            textTransform: 'none',
            margin: '0 8px',
          }}
        >
          Gallery
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/analytics" 
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            color: '#2c3e50',
            textTransform: 'none',
            margin: '0 8px',
          }}
        >
          Analytics
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
