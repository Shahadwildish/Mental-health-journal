
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

router.get('/', async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.user.userId });
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
// Additional routes for Read, Update, Delete...

module.exports = router;
