const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  phone: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
