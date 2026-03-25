const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { from, to, amount } = req.query;

    try {
        const response = await axios.get(`https://api.currencybeacon.com/v1/convert`, {
            params: {
                from,
                to,
                amount,
                api_key: process.env.CURRENCY_API
            }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;