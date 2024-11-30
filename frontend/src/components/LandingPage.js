import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme
import styled from '@emotion/styled';
import backgroundImage from './assets/bg5.png'; // Replace with your background image path

// Create a simple theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6f91', // Primary color
    },
    secondary: {
      main: '##ef90b1', // Secondary color
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  fontSize: '1rem',
  textTransform: 'none',
  borderRadius: '50px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main, // Use primary color
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Use darker primary color for hover effect
  },
}));

function LandingPage() {
  return (
    <ThemeProvider theme={theme}> {/* Wrap your component in ThemeProvider */}
      <Box
        sx={{
          background: `url(${backgroundImage}) no-repeat center center/cover`,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Align content to the left
          padding: '0 5%',
          backgroundColor: 'rgba(255, 182, 193, 0.6)',
        }}
      >
        <Box
          sx={{
            padding: '40px',
            borderRadius: '16px',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',
            maxWidth: '450px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontFamily: "'Playfair Display', serif",
              color: '#2c3e50',
              marginBottom: 3,
            }}
          >
            StyleSync
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              color: '#34495e',
              marginBottom: 4,
            }}
          >
            Fashion Analytics & Social Platform
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <StyledButton variant="contained" component={Link} to="/gallery">
                Explore Designs
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton variant="outlined" component={Link} to="/analytics">
                View Analytics
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;
