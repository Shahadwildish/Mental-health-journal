
const express = require('express');
const router = express.Router();
const Reflection = require('../models/Reflection');


router.post('/', async (req, res) => {
  try {
    const reflection = new Reflection(req.body);
    await reflection.save();
    res.status(201).json(reflection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Additional routes for Read, Update, Delete...

module.exports = router;
