import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, Paper, IconButton } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getMoodEntries, deleteMoodEntry } from '../api';
import { Delete } from '@mui/icons-material';

const MoodEntryList = () => {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth(); // Get the current user from AuthContext

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (user) {
          const data = await getMoodEntries(user.userId);
          setEntries(data);
        }
      } catch (error) {
        console.error('Error fetching mood entries:', error);
      }
    };

    fetchEntries();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteMoodEntry(id);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting mood entry:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Mood Entries
      </Typography>
      <Grid container spacing={3}>
        {entries.length > 0 ? (
          entries.map(entry => (
            <Grid item xs={12} md={6} lg={4} key={entry._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Mood Rating: {entry.moodRating}
                  </Typography>
                  <Typography variant="body1">
                    {entry.notes}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(entry._id)}
                    sx={{ mt: 2 }}
                  >
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography>No mood entries found.</Typography>
          </Paper>
        )}
      </Grid>
    </Container>
  );
};

export default MoodEntryList;
