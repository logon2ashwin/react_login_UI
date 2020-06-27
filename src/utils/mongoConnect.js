
const mongoose = function () {
  const fs = require("fs");
  const Mongoose = require('mongoose');
  const config = require(`../config/${process.env.ENVIRONMENT}`);
  let connectionURI;
  if(process.env.ENVIRONMENT === 'prod'){
    connectionURI = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0-kiuu9.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
  }
  else {
    connectionURI = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`;
  }
  const path = require("path");
  console.log("Connecting...", connectionURI);		
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