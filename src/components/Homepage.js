import React from 'react';
import { Button, Typography, Card, CardContent, Container, Grid, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Homepage = () => {
  const navigate = useNavigate(); // Move useNavigate inside the component
  const  user  = useAuth(); //grab the authentication context
  console.log(user);
  const handleLogMood = () => {
    navigate('/create-mood-entry'); // Use navigate inside the function
  };

  const handleViewAnalytics = () => {
    navigate('/analytics'); // Use navigate inside the function
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome, {user ? user.user.username : 'Guest'}!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Track your mood and reflect on your experiences with our platform.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Recent Mood Entry</Typography>
              <Typography>Mood: Happy</Typography>
              <Typography>Notes: Had a great day!</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Log Mood</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogMood}>
                  Log Mood
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">View Analytics</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}onClick={handleViewAnalytics} >
                  View Analytics
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Explore Resources</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Explore Resources
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
