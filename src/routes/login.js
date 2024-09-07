const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { createClient } = require("@supabase/supabase-js");
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });
  if (error) return res.send(401).json({ error: "Invalid credentials" });

  //Create a JWT for 1hr on trial basis
  const token = jwt.sign({ userId: data.user?.id }, JWT_SECRET, {
    expiresIn: "1hr",
  });
  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 3600000,
  });
  res.status(200).json({ message: "Login Successfull" });
});
