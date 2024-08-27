const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/MoodEntry'); // Import MoodEntry model

// Fetch mood entries for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10); // Convert userId to integer
        if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

        const moodEntries = await MoodEntry.find({ userId: userId }); // Query by integer userId
        res.json(moodEntries);
        console.log(moodEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Create Mood Entry
router.post('/', async (req, res) => {
    try {
        const moodEntry = new MoodEntry(req.body);
        await moodEntry.save();
        res.status(201).json(moodEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/mood-entries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { moodRating, notes } = req.body;

        // Validate input
        if (!moodRating || !notes) {
            return res.status(400).json({ message: 'Mood rating and notes are required' });
        }

        const updatedEntry = await MoodEntry.findByIdAndUpdate(
            id,
            { moodRating, notes },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Mood entry not found' });
        }

        res.json(updatedEntry);
    } catch (error) {
        console.error('Error updating mood entry:', error);
        res.status(500).json({ message: 'Failed to update mood entry' });
    }
});





module.exports = router;
