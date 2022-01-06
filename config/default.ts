const dotenv = require('dotenv');

dotenv.config();

export default {
  port: process.env.PORT,
  host: 'localhost',
  dbUri: process.env.MONGODB_CONNECTION_STRING,
  saltWorkFactor: 10,
  accessTokenTtl: '1m',
  refreshTokenTtl: '1y',
  privateKey: process.env.PRIVATE_KEY,
};
