const mongoose = require('mongoose');

// schema for game-history
var schemaGameHistoryTotal = new mongoose.Schema({
  userId: { type: String, require: true },
  win: Number,
  draw: Number,
  lose: Number,
  typePlayer: String
},
  { timestamps: { createdAt: 'first_play', updatedAt: 'update_at' } },
  { collection: 'game-history-totals' }
)

const gameHistoryTotal = mongoose.model('gameHistoryTotal', schemaGameHistoryTotal)

module.exports = gameHistoryTotal;