const WebSocket = require('ws');
const axios = require('axios');

module.exports = function(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', ws => {
        console.log("Client connected");

        setInterval(async () => {
            try {
                const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.FINNHUB_API}`);
                ws.send(JSON.stringify(res.data));
            } catch {}
        }, 2000);
    });
};