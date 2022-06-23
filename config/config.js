require('dotenv').config();

const options = {
  host: process.env.HOSTNAME,
  port: '3306',
  database: process.env.MYSQL_DB_NAME || 'blogs-api',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '1234',
  dialect: 'mysql',
  logging: process.env.DEBUG !== 'false',
};

module.exports = {
  development: {
    ...options,
  },
};
