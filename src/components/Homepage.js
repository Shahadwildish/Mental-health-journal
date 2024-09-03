import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, Container, Grid, Paper, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRecentMoodEntry } from '../api';


const Homepage = () => {
  const navigate = useNavigate();  // needed this for the buttons on the homepage
  const  user  = useAuth(); //grab the authentication context
  const [recentEntry, setRecentEntry] = useState([]);
  const [loading, setLoading] = useState(true);

  // date was in an unfriendly format, need a function to format it
  function formatDate(date) {
    const options = {
        weekday: 'short', //short looks better than long
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}
  useEffect(() => {
    const fetchRecentMoodEntry = async () => {
      try {
        setLoading(true);
        const data = await getRecentMoodEntry(user.user.userId); // Fetch the recent mood entry
        console.log(data);
        const mostRecentEntry = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
setRecentEntry(mostRecentEntry);


      } catch (error) {
        console.error('Error fetching recent mood entry:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecentMoodEntry();
    }
  }, [user]);
console.log(recentEntry);

  console.log(user);
  const handleLogMood = () => {
    navigate('/create-mood-entry'); // Use navigate inside the function
  };
  const handleExploreResources = () => {
    navigate('/resources');
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
          <Card elevation={10} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">Recent Mood Entry</Typography>
          <CardContent>
              {loading ? (
                <CircularProgress />
              ) : recentEntry ? (
                <>
                  <Typography>Rating: {recentEntry.moodRating}/10</Typography>
                  <Typography>Mood: {recentEntry.category}</Typography>
                  <Typography>Notes: {recentEntry.notes}</Typography>
                  <Typography>Date Mood Created: {formatDate(recentEntry.createdAt)}</Typography>
                </>
              ) : (
                <Typography>No recent mood entries found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={10} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Log Mood</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogMood}>
                  Log Mood
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={10} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">View Analytics</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}onClick={handleViewAnalytics} >
                  View Analytics
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={10} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Explore Resources</Typography>
                <Button variant="contained" color="primary" onClick={handleExploreResources}sx={{ mt: 2 }}>
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
