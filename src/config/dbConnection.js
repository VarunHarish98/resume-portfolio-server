const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected to " + uri);
});

connection.on("error", (err) => {
  console.error("Mongoose connection error: ", err);
});

connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
process.on("SIGINT", async () => {
  await connection.close();
  console.log("MongoDB connection is closed");
  process.exit(0);
});

module.exports = dbConnection;
