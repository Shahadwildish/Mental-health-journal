const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  moodRating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  notes: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Stress', 'Happiness', 'Sadness', 'Anxiety']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
