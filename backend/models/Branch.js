const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[+]?[\d\s-]+$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  manager: {
    type: String,
    required: true,
    },
  hours: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BranchModel = mongoose.model('Branch', branchSchema);

module.exports = BranchModel;
