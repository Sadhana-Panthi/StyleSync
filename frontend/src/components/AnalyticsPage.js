import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import axios from 'axios';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Replace with your actual backend endpoint
        const response = await axios.get('/analytics');
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Mock data in case backend is not ready
  const mockAnalytics = {
    overallStats: {
      totalDesigns: 15,
      averageRating: 4.2,
      totalFeedback: 250
    },
    designPerformance: [
      { name: 'Summer Collection', rating: 4.5, feedback: 75 },
      { name: 'Winter Line', rating: 4.2, feedback: 60 },
      { name: 'Spring Essentials', rating: 4.0, feedback: 45 },
      { name: 'Casual Wear', rating: 3.8, feedback: 40 },
      { name: 'Evening Wear', rating: 4.7, feedback: 30 }
    ]
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
          fontWeight: 'bold'
        }}
      >
        Design Performance Analytics
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Total Designs</Typography>
              <Typography variant="h4" color="primary">
                {mockAnalytics.overallStats.totalDesigns}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Average Rating</Typography>
              <Typography variant="h4" color="primary">
                {mockAnalytics.overallStats.averageRating}/5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Total Feedback</Typography>
              <Typography variant="h4" color="primary">
                {mockAnalytics.overallStats.totalFeedback}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Chart */}
      <Box sx={{ width: '100%', height: 400, marginBottom: 4 }}>
        <ResponsiveContainer>
          <BarChart data={mockAnalytics.designPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#8884d8" name="Rating" />
            <Bar dataKey="feedback" fill="#82ca9d" name="Feedback Count" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Detailed Performance Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Design Collection</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Feedback Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAnalytics.designPerformance.map((design) => (
              <TableRow key={design.name}>
                <TableCell component="th" scope="row">
                  {design.name}
                </TableCell>
                <TableCell align="right">{design.rating}/5</TableCell>
                <TableCell align="right">{design.feedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AnalyticsPage;