const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.send(401).json({ error: "Access Denied!!!" });
  jwt.sign(token, JWT_TOKEN, (err, user) => {
    if (err) return res.send(401).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
};

module.exports = authMiddleWare;

