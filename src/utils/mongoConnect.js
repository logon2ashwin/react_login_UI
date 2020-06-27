
const mongoose = function () {
  const fs = require("fs");
  const Mongoose = require('mongoose');
  const config = !!process.env.ENVIRONMENT ? require(`../config/${process.env.ENVIRONMENT}`) : require("../config/dev");
  const connectionURI = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`;
  const path = require("path");
  console.log("Connecting...", connectionURI)		
  Mongoose.connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true });

  const modelPath = path.resolve(__dirname, "../models/");
  fs.readdirSync(modelPath).forEach(file => {
      require(`${modelPath}/${file}`);
  });
  

  const db = Mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function callback() {
      console.log("Connection with database succeeded");
  });

  return Mongoose;

};


module.exports = {
  initialize: mongoose
};