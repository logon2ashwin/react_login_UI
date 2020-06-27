const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./utils/mongoConnect');
const serverless = require('serverless-http');
const config = require('./config/dev');
/** Routes */
const authRoutes = require('./routes/authRoutes');

const app = express();

/**Middleware */
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/.netlify/functions/api/auth', authRoutes);


mongoConnect.initialize();

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

console.log(`App listening at ${config.app.port}`)
app.listen(config.app.port);
