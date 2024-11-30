import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  Rating,
  CircularProgress,
  Box,
  Chip
} from '@mui/material';

const GalleryPage = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/dresses');
        setDesigns(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching designs:', error);
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDesign(null);
    setFeedback('');
    setRating(0);
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/submit-feedback', {
        designId: selectedDesign.id,
        feedback,
        rating
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          marginBottom: 4,
          fontWeight: 'bold',
          fontFamily: "'Playfair Display', serif",
          color: '#2c3e50',
        }}
      >
        Latest Design Collection
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
                borderRadius: '16px',
                backgroundColor: '#ffe4e6', // Soft pink background
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: 4 
                }
              }}
              onClick={() => handleDesignClick(design)}
            >
              <CardMedia
                component="img"
                height="300"
                image={design.image_url}
                alt={design.caption}
                sx={{ borderRadius: '16px 16px 0 0' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    color: '#2c3e50' 
                  }}
                >
                  {design.caption}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label="View Details" 
                    sx={{ 
                      color: '#ffffff', 
                      backgroundColor: '#ff6f91', // Bright pink chip
                      fontFamily: "'Open Sans', sans-serif" 
                    }} 
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Design Details Modal */}
      {selectedDesign && (
        <Dialog 
          open={openModal} 
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontFamily: "'Playfair Display', serif", color: '#2c3e50' }}>
            {selectedDesign.caption}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img 
                  src={selectedDesign.image_url} 
                  alt={selectedDesign.caption}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px' 
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ fontFamily: "'Open Sans', sans-serif", color: '#2c3e50' }}
                >
                  Design Feedback
                </Typography>
                
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  placeholder="Share your thoughts about this design..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  sx={{ mb: 2, borderColor: '#ff6f91' }}
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{ backgroundColor: '#ff6f91', color: '#ffffff' }}
                      onClick={handleSubmitFeedback}
                    >
                      Submit Feedback
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{ backgroundColor: '#2c3e50', color: '#ffffff' }}
                      href={selectedDesign.cloth_url}
                      target="_blank"
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default GalleryPage;
