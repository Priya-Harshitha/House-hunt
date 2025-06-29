const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String // 'renter' | 'owner' | 'admin'
});

module.exports = mongoose.model('User', userSchema);