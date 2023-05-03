// Server configuration
import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";

// Mongoose setup and connection to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoUri,
  { dbName: config.mongoDB },
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to mongodb: " + config.mongoDB);
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

// Express app starting the server
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
