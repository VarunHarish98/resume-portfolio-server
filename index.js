const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/middleware/auth");

app.use(cookieParser());

app.use(
  cors({
    origin: ["*"],
    credentials: true, // Allow credentials (cookies)
  })
);
// app.use(authMiddleware);
app.use(express.json()); // Parses incoming JSON requests

const apiRoute = require("./src/routes/retrieve-parsed-data");
const loginRoute = require("./src/routes/login");
const dataRoute = require("./src/routes/templateMatch");

app.use("/", apiRoute);
app.use("/login", loginRoute);
app.use("/getData", dataRoute);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
