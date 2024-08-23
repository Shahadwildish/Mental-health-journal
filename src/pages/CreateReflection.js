

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { createReflection } from '../api';

const CreateReflection = () => {
  const [reflectionText, setReflectionText] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reflection = { reflectionText, date };
      await createReflection(reflection);
      setSuccess('Reflection created successfully!');
      setReflectionText('');
      setDate('');
    } catch (error) {
      console.error('Error creating reflection:', error);
      setError('Failed to create reflection.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create Reflection
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
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Reflection"
          multiline
          rows={6}
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Reflection
        </Button>
      </form>
    </Container>
  );
};

export default CreateReflection;
