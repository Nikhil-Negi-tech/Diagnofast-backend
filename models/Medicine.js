const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true,
    trim: true
  },
  medicines: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Drops', 'Inhaler', 'Spray', 'Gel', 'Lotion', 'Ointment', 'Patch', 'Powder', 'Suspension', 'Pads', 'Shampoo']
    },
    dosage: {
      type: String,
      required: true,
      trim: true
    }
  }]
}, {
  timestamps: true
});

// Index for faster disease queries
medicineSchema.index({ disease: 1 });

module.exports = mongoose.model('Medicine', medicineSchema);
