const mongoose = require('mongoose');

// schema for game-history
var schemaGameHistory = new mongoose.Schema({
  userId: { type: String, require: true },
  playedAt: { type: String, default: new Date() },
  win: Number,
  draw: Number,
  lose: Number,
  typePlayer: String
}, { collection: 'game-history' })

const gameHistory = mongoose.model('gameHistory', schemaGameHistory)

module.exports = gameHistory;