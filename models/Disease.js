const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  symptoms: [{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }],
  description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster symptom queries
diseaseSchema.index({ symptoms: 1 });

module.exports = mongoose.model('Disease', diseaseSchema);
