// src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../api';

const Profile = () => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mt: 3 }}
      >
        <TextField
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!editMode}
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!editMode}
        />
        {editMode ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
