import React, { useState, useEffect } from 'react';
import {  TextField,  Button,  Typography,  Container,  List,  ListItem,  ListItemText,  IconButton,  Modal,  Box,  Alert,  FormControl,  InputLabel,  Select,  MenuItem} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {  getMoodEntries,  createMoodEntry,  updateMoodEntry,  deleteMoodEntry} from '../api'; 
import { useAuth } from '../contexts/AuthContext';

const MoodEntryList = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [newMood, setNewMood] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Format date utility
  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short', // Displays abbreviated day of the week
      year: 'numeric',
      month: 'short',   // Displays abbreviated month
      day: 'numeric'
    });
  }

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const data = await getMoodEntries(user.userId);
        if (data.length === 0) {
          setError('No mood entries found.');
        } else {
          setMoodEntries(data);
          setError(null);
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
      setError(null);
    } catch (error) {
      console.error('Error creating mood entry:', error);
      setError('Failed to create mood entry.');
    }
  };

  const handleUpdateMoodEntry = async () => {
    if (!currentEntry) return;

    try {
      console.log('Current entry before update:', currentEntry);
      const updatedEntry = await updateMoodEntry(currentEntry._id, {
        moodRating: currentEntry.moodRating,
        notes: currentEntry.notes,
        category: currentEntry.category
      });

      setMoodEntries(
        moodEntries.map(entry => entry._id === updatedEntry._id ? updatedEntry : entry)
      );
      setEditMode(false);
      setModalOpen(false);
      setError(null);
    } catch (error) {
      console.error('Error updating mood entry:', error);
      // setError('Failed to update mood entry.');
    }
  };

  const handleDeleteMoodEntry = async (id) => {
    try {
      await deleteMoodEntry(id);
      setMoodEntries(moodEntries.filter(entry => entry._id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      setError('Failed to delete mood entry.');
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
              <ListItemText
                primary={`Mood: ${entry.category}`}
                secondary={`Mood Rating: ${entry.moodRating}`}
              />
              {/* <ListItemText
                primary={`Notes: ${entry.notes}`}
                secondary={`Created At: ${formatDate(entry.createdAt)}`} // Format date
              /> */}
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
        <Box
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            maxWidth: 600,
            margin: 'auto',
            mt: 10
          }}
        >
          <Typography id="edit-mood-entry-title" variant="h6" component="h2">
            {editMode ? 'Edit Mood Entry' : 'View Mood Entry'}
          </Typography>
          {editMode && currentEntry && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentEntry.category || ''}
                  onChange={(e) =>
                    setCurrentEntry({ ...currentEntry, category: e.target.value })
                  }
                  required
                >
                  <MenuItem value="Stress">Stress</MenuItem>
                  <MenuItem value="Happiness">Happiness</MenuItem>
                  <MenuItem value="Sadness">Sadness</MenuItem>
                  <MenuItem value="Anxiety">Anxiety</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Mood Rating"
                value={currentEntry.moodRating || ''}
                onChange={(e) =>
                  setCurrentEntry({ ...currentEntry, moodRating: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Notes"
                value={currentEntry.notes || ''}
                onChange={(e) =>
                  setCurrentEntry({ ...currentEntry, notes: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateMoodEntry}
                disabled={!editMode}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default MoodEntryList;
