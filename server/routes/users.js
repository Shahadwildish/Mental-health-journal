
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create User
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      console.log(req.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json({
        userId: user.userId,
        username: user.username,
        email: user.email
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  router.put('/:userId', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const updates = { username, email };
  
      // Update password if provided
      if (password) {
        const passwordHash = await bcrypt.hash(password, 10); //HASH THE PASSWORD
        updates.passwordHash = passwordHash;
      }
  
      const user = await User.findOneAndUpdate(
        { userId: req.params.userId }, // Find user by ID
        { $set: updates },             // Update fields
        { new: true }                  // Return the updated user
      );
  
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json({
        userId: user.userId,
        username: user.username,
        email: user.email
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
