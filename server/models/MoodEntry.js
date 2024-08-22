
const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  moodRating: { type: Number, min: 1, max: 10, required: true },
  notes: { type: String },
  category: { type: String, enum: ['Stress', 'Happiness', 'Sadness', 'Anxiety'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
