const mongoose = require('mongoose');

// schema for user-profiles
var schemaUserProfiles = new mongoose.Schema({
  userId: { type: String, require: true },
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  birthDate: { type: String, default: Date },
  gender: String,
  address: String,
  zipCode: Number
}, { collection: 'user-profiles' })

const userProfile = mongoose.model('userProfile', schemaUserProfiles)

module.exports = userProfile;