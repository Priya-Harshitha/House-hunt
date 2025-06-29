const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: String,
  bedrooms: {
    type: Number,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Property', propertySchema);
