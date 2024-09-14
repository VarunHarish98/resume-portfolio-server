const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) return res.status(401).json("Access Denied!!!");
    jwt.sign(token, JWT_TOKEN, (err, user) => {
      if (err) return res.status(401).json({ error: "Invalid Token" });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleWare;
