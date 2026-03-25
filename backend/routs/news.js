const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`http://api.mediastack.com/v1/news`, {
            params: {
                access_key: process.env.NEWS_API,
                categories: 'business'
            }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;