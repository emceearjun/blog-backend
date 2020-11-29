const mongoose = require("mongoose");

const MONGO_CONN_URL = process.env.MONGO_CONN_URL;

const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(MONGO_CONN_URL, mongoOptions, onMongoDBConnected);

function onMongoDBConnected(error, client) {
  console.log("connected to mongo server");
}
