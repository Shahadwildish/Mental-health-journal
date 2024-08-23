require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userInfoRoute = require('./routes/users')
const authRoute = require('./routes/auth');




dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const moodEntriesRoute = require('./routes/moodEntries');
const reflectionsRoute = require('./routes/reflections'); // Assuming reflectionsRoute exists

// Use routes
app.use('/api/mood_entries', moodEntriesRoute);
app.use('/api/reflections', reflectionsRoute); // Assuming reflectionsRoute exists
app.use('/api/auth', authRoute);
app.use('/api/userinfo', userInfoRoute);

// Connect to MongoDB
mongoose.connect('mongodb+srv://shayalobeidi:UqAVNLsxhoGISPFh@cluster0.rvlok4o.mongodb.net/MHJDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
