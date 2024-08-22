// server/routes/moodEntries.js
const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/MoodEntry');

// Create Mood Entry
router.post('/', async (req, res) => {
  try {
    const moodEntry = new MoodEntry(req.body);
    await moodEntry.save();
    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read All Mood Entries
router.get('/', async (req, res) => {
  try {
    const moodEntries = await MoodEntry.find();
    res.status(200).json(moodEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read Single Mood Entry by ID
router.get('/:id', async (req, res) => {
  try {
    const moodEntry = await MoodEntry.findById(req.params.id);
    if (!moodEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.status(200).json(moodEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Mood Entry by ID
router.put('/:id', async (req, res) => {
  try {
    const moodEntry = await MoodEntry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!moodEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.status(200).json(moodEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Mood Entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const moodEntry = await MoodEntry.findByIdAndDelete(req.params.id);
    if (!moodEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.status(200).json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
