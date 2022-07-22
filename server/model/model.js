const mongoose = require('mongoose')

// schema for user-data 
var schemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})

const user = mongoose.model('user-data', schemaUser)

module.exports = user;


// schema for user-profiles 
var schemaUserProfiles = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  fullName: String,
  birthday: { type: Date },
  gender: String,
  address: String
})

const userProfile = mongoose.model('user-profiles', schemaUserProfiles)

module.exports = userProfile;


// schema for game-history 
var schemaGameHistory = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  win: Number,
  draw: Number,
  lose: Number,
  typePlayer: String
})

const gameHistory = mongoose.model('game-history', schemaGameHistory)

module.exports = gameHistory;