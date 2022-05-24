const express = require('express');
const router = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app
  .use(express.json())
  .use('/', router)
  .use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
