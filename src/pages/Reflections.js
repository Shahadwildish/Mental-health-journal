// src/pages/Reflections.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, IconButton, Modal, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getReflections, createReflection, updateReflection, deleteReflection } from '../api';
import { useAuth } from '../contexts/AuthContext';

const Reflections = () => {
  const [reflections, setReflections] = useState([]);
  const [newReflection, setNewReflection] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentReflection, setCurrentReflection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAuth();

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const data = await getReflections(user.user.userId);
        setReflections(data);
      } catch (error) {
        console.error('Error fetching reflections:', error);
      }
    };

    fetchReflections();
  }, [user.user.userId]);

  const handleCreateReflection = async () => {
    try {
      const newRef = await createReflection({ text: newReflection });
      setReflections([...reflections, newRef]);
      setNewReflection('');
    } catch (error) {
      console.error('Error creating reflection:', error);
    }
  };

  const handleUpdateReflection = async () => {
    try {
      const updatedRef = await updateReflection(currentReflection._id, { text: currentReflection.text });
      setReflections(reflections.map(ref => ref._id === updatedRef._id ? updatedRef : ref));
      setEditMode(false);
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating reflection:', error);
    }
  };

  const handleDeleteReflection = async (id) => {
    try {
      await deleteReflection(id);
      setReflections(reflections.filter(ref => ref._id !== id));
    } catch (error) {
      console.error('Error deleting reflection:', error);
    }
  };

  const openEditModal = (reflection) => {
    setCurrentReflection(reflection);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setCurrentReflection(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Reflections
      </Typography>
      

      <List>
        {reflections.map((reflection) => (
          <ListItem key={reflection._id}>
            <ListItemText primary={reflection.reflectionText} />
            <IconButton onClick={() => openEditModal(reflection)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteReflection(reflection._id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="edit-reflection-title"
        aria-describedby="edit-reflection-description"
      >
        <Box sx={{ p: 4, bgcolor: 'background.paper', maxWidth: 600, margin: 'auto', mt: 10 }}>
          <Typography id="edit-reflection-title" variant="h6" component="h2">
            {editMode ? 'Edit Reflection' : 'View Reflection'}
          </Typography>
          <TextField
            label="Reflection Text"
            multiline
            rows={4}
            value={editMode ? currentReflection?.reflectionText : ''}
            onChange={(e) => setCurrentReflection({ ...currentReflection, text: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateReflection}
            disabled={!editMode}
          >
            {editMode ? 'Save Changes' : 'Close'}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Reflections;
