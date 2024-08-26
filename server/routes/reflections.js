const express = require('express');
const router = express.Router();
const Reflection = require('../models/Reflection');

// Create a new reflection
router.post('/', async (req, res) => {
  try {
    const reflection = new Reflection(req.body);
    await reflection.save();
    res.status(201).json(reflection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all reflections
router.get('/:userId', async (req, res) => {
  try {
    const {userId} = req.params.userId
    const reflections = await Reflection.find({ UserId: userId });
    console.log(reflections);
    res.status(200).json(reflections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single reflection by ID
router.get('/:id', async (req, res) => {
  try {
    const reflection = await Reflection.findById(req.params.id);
    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found' });
    }
    res.status(200).json(reflection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a reflection by ID
router.put('/:id', async (req, res) => {
  try {
    const reflection = await Reflection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found' });
    }
    res.status(200).json(reflection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a reflection by ID
router.delete('/:id', async (req, res) => {
  try {
    const reflection = await Reflection.findByIdAndDelete(req.params.id);
    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;