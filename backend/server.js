require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const marketRoutes = require('./routes/market');
const tradeRoutes = require('./routes/trade');
const authRoutes = require('./routes/auth');
const currencyRoutes = require('./routes/currency');
const newsRoutes = require('./routes/news');

const setupWebSocket = require('./websocket');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/market', marketRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/news', newsRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.error(err));

// WebSocket
setupWebSocket(server);

server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});