
const { formLabelClasses } = require('@mui/material');
const mongoose = require('mongoose');

const ReflectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'User'
    },
    reflectionText: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reflection', ReflectionSchema);
