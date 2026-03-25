const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    user: String,
    symbol: String,
    type: String,
    quantity: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);