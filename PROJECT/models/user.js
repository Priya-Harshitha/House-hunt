const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String, // should be hashed
  role: { type: String, enum: ['renter', 'owner', 'admin'] }
});

module.exports = mongoose.model('User', UserSchema);
