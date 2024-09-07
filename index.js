const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/middleware/auth")

app.use(cookieParser());

app.use(cors());
app.use(authMiddleware)

const apiRoute = require("./src/routes/retrieve-parsed-data");
const loginRoute = require("./src/routes/login");

app.use("/", apiRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
