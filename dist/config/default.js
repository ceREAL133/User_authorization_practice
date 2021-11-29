"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
exports.default = {
    port: 3000,
    host: 'localhost',
    dbUri: process.env.dbUri,
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    privateKey: process.env.PRIVATE_KEY,
};
