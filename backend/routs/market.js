const express = require('express');
const axios = require('axios');
const router = express.Router();

const APIs = [
    async (symbol) => {
        const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API}`);
        return { price: res.data.c };
    },
    async (symbol) => {
        const res = await axios.get(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.TWELVE_API}`);
        return { price: res.data.price };
    },
    async (symbol) => {
        const res = await axios.get(`http://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_API}&symbols=${symbol}`);
        return { price: res.data.data[0].close };
    }
];

// Failover system
async function getPrice(symbol) {
    for (let api of APIs) {
        try {
            return await api(symbol);
        } catch (err) {
            console.log("API failed, switching...");
        }
    }
    throw new Error("All APIs failed");
}

router.get('/:symbol', async (req, res) => {
    try {
        const data = await getPrice(req.params.symbol);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;