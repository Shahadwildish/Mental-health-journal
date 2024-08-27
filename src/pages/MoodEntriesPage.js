import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, IconButton, Modal, Box, Alert } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getMoodEntries, createMoodEntry, updateMoodEntry, deleteMoodEntry } from '../api'; // Ensure correct API functions
import { useAuth } from '../contexts/AuthContext';

const MoodEntryList = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [newMood, setNewMood] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const data = await getMoodEntries(user.userId); // Ensure the user ID is used
        if (data.length === 0) {
          setError('No mood entries found.');
        } else {
          setMoodEntries(data);
        }
      } catch (error) {
        console.error('Error fetching mood entries:', error);
        setError('Failed to fetch mood entries.');
      }
    };

    fetchMoodEntries();
  }, [user.userId]);

  const handleCreateMoodEntry = async () => {
    try {
      const newEntry = await createMoodEntry({ moodRating: newMood, userId: user.userId });
      setMoodEntries([...moodEntries, newEntry]);
      setNewMood('');
    } catch (error) {
      console.error('Error creating mood entry:', error);
    }
  };

  const handleUpdateMoodEntry = async () => {
    try {
      const updatedEntry = await updateMoodEntry(currentEntry._id, {
        moodRating: currentEntry.moodRating,
        notes: currentEntry.notes, 
      });
      setMoodEntries(moodEntries.map(entry => entry._id === updatedEntry._id ? updatedEntry : entry));
      setEditMode(false);
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating mood entry:', error);
      setError('Failed to update mood entry.'); // Set error state for user feedback
    }
  };

  const handleDeleteMoodEntry = async (id) => {
    try {
      await deleteMoodEntry(id);
      setMoodEntries(moodEntries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting mood entry:', error);
    }
  };

  const openEditModal = (entry) => {
    setCurrentEntry(entry);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setCurrentEntry(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Mood Entries
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List>
        {moodEntries.length > 0 ? (
          moodEntries.map((entry) => (
            <ListItem key={entry._id}>
              <ListItemText primary={`Mood Rating: ${entry.moodRating}`} secondary={entry.notes} />
              <IconButton onClick={() => openEditModal(entry)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDeleteMoodEntry(entry._id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No mood entries available" />
          </ListItem>
        )}
      </List>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="edit-mood-entry-title"
        aria-describedby="edit-mood-entry-description"
      >
        <Box sx={{ p: 4, bgcolor: 'background.paper', maxWidth: 600, margin: 'auto', mt: 10 }}>
          <Typography id="edit-mood-entry-title" variant="h6" component="h2">
            {editMode ? 'Edit Mood Entry' : 'View Mood Entry'}
          </Typography>
          <TextField
            label="Mood Rating"
            value={editMode ? currentEntry?.moodRating : ''}
            onChange={(e) => setCurrentEntry({ ...currentEntry, moodRating: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            value={editMode ? currentEntry?.notes : ''}
            onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateMoodEntry}
            disabled={!editMode}
          >
            {editMode ? 'Save Changes' : 'Close'}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default MoodEntryList;
