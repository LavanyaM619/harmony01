// models/Root.js
const mongoose = require('mongoose');

const rootSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  managerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\+?[0-9\s\-()]{7,20}$/, 'Please enter a valid phone number'],
  },
  hours: {
    type: String, // Example: "9am - 5pm"
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model('Root', rootSchema);
