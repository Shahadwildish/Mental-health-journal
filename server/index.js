require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const morgan = require('morgan');



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // helps with debugging backend
// Import routes

const reflectionsRoute = require('./routes/reflections'); 
const moodEntriesRouter = require('./routes/moodEntries');
const userRoutes  = require('./routes/users');

app.use('/api/', moodEntriesRouter);
app.use('/api/mood-entries/', moodEntriesRouter);
app.use('/api/mood-entries', moodEntriesRouter);
app.use('/api/mood-entries/recent/', moodEntriesRouter);
app.use('/api/mood-entries/recent', moodEntriesRouter);
app.use('/api/reflections', reflectionsRoute); 
app.use('/api/auth', authRoute);
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://shayalobeidi:UqAVNLsxhoGISPFh@cluster0.rvlok4o.mongodb.net/MHJDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
