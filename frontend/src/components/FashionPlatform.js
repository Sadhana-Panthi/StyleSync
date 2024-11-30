import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  Link 
} from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box 
} from '@mui/material';

// Landing Page Component
const LandingPage = () => {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: 3 
          }}
        >
          StyleSync
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#34495e', 
            marginBottom: 4 
          }}
        >
          Fashion Analytics & Social Platform
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/gallery"
              sx={{ 
                padding: '12px 24px',
                fontSize: '1rem',
                textTransform: 'none'
              }}
            >
              Explore Designs
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              color="secondary" 
              component={Link} 
              to="/analytics"
              sx={{ 
                padding: '12px 24px',
                fontSize: '1rem',
                textTransform: 'none'
              }}
            >
              View Analytics
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Gallery Component
const GalleryPage = () => {
  const [designs, setDesigns] = React.useState([]);

  React.useEffect(() => {
    // Fetch designs from backend
    const fetchDesigns = async () => {
      // Replace with your actual API endpoint
      const response = await fetch('/dresses');
      const data = await response.json();
      setDesigns(data);
    };
    fetchDesigns();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          marginBottom: 4,
          fontWeight: 'bold'
        }}
      >
        Latest Designs
      </Typography>
      
      <Grid container spacing={4}>
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={4} key={design.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={design.image_url}
                alt={design.caption}
              />
              <CardContent>
                <Typography variant="h6">{design.caption}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Analytics Component
const AnalyticsPage = () => {
  const [analytics, setAnalytics] = React.useState(null);

  React.useEffect(() => {
    // Fetch analytics from backend
    const fetchAnalytics = async () => {
      // Replace with your actual analytics endpoint
      const response = await fetch('/analytics');
      const data = await response.json();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          marginBottom: 4,
          fontWeight: 'bold'
        }}
      >
        Design Performance Analytics
      </Typography>
      
      {analytics ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Average Rating</Typography>
              <Typography variant="h3" color="primary">
                {analytics.averageRating}/5
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Feedback</Typography>
              <Typography variant="h3" color="primary">
                {analytics.totalFeedback}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Top Rated Design</Typography>
              <Typography variant="h6" color="primary">
                {analytics.topRatedDesign}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading analytics...</Typography>
      )}
    </Container>
  );
};

// Main App Component with Navigation
function App() {
  return (
    <Router>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            StyleSync
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/gallery">Gallery</Button>
          <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;