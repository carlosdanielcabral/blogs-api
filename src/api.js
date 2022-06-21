const express = require('express');
const router = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app
  .use(express.json())
  .use('/', router)
  .use(errorMiddleware);

module.exports = app;
