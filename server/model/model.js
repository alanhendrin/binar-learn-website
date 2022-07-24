const mongoose = require('mongoose');

// schema for user-data 
var schemaUser = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: String,
  email: { type: String, require: true, unique: true }
}, { collection: 'user-data' })

const Userdb = mongoose.model('userdb', schemaUser)

module.exports = Userdb;
