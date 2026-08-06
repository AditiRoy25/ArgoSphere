require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const DbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        logger.info('MongoDB Connected');
        console.log("Database connected");
    } catch (err) {
        logger.error(err.message);
        console.log("DB Error:", err.message);
    }
};

module.exports = DbConnect;