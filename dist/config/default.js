"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
exports.default = {
    port: process.env.PORT,
    host: 'localhost',
    dbUri: process.env.MONGODB_CONNECTION_STRING,
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    privateKey: process.env.PRIVATE_KEY,
};
