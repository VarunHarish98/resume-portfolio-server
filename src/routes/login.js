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
  try {
    const { email, password } = req?.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) return res.status(401).json({ error: "Invalid credentials" });
    const { data: user } = await supabase.auth.getUser();
    //Create a JWT for 1hr on trial basis
    const token = jwt.sign({ userId: data.user?.id }, JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000,
      path: "/",
    });
    console.log(res.cookie);
    res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
