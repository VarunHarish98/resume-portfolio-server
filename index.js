const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

const apiRoute = require("./src/routes/retrieve-parsed-data");

app.use("/", apiRoute);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
