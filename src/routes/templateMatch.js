const express = require("express");
const router = express.Router();

router.get("/get-template-data/:id", async (req, res) => {
  try {
    let id = req.body?.params;
    if (!id) return res.status(404).json({ message: "Template not found" });
    //Got the id, do the DB call and get the templates
    // Call the DB and get the user details stored, first from the auth get the name

  } catch (error) {}
});

module.exports = router;
