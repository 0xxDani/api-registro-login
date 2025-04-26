// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  // ✅ Elimina o comenta el campo email si no lo estás usando
});

module.exports = mongoose.model('User', userSchema);
