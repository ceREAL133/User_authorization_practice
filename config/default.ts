const dotenv = require('dotenv');

dotenv.config();

export default {
  port: 3000,
  host: 'localhost',
  dbUri: `mongodb+srv://dan:${process.env.ATLAS_PASSWORD}@cluster0.93pq6.mongodb.net/users-database?retryWrites=true&w=majority`,
  saltWorkFactor: 10,
};
