const express = require('express');
const errorMiddleware = require('./middlewares/error');
const validateAccessData = require('./middlewares/validateAccessData');
// const validateUserData = require('../middlewares/validateUserData');
// const { validateToken } = require('../auth/token');
const User = require('./controllers/user');

const app = express();

app.use(express.json());
app
  .post('/login', validateAccessData, User.login);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
