const express = require('express');
const Trade = require('../models/trade');
const router = express.Router();

router.post('/buy', async (req, res) => {
    const trade = new Trade({ ...req.body, type: 'BUY' });
    await trade.save();
    res.json(trade);
});

router.post('/sell', async (req, res) => {
    const trade = new Trade({ ...req.body, type: 'SELL' });
    await trade.save();
    res.json(trade);
});

router.get('/history', async (req, res) => {
    const trades = await Trade.find();
    res.json(trades);
});

module.exports = router;