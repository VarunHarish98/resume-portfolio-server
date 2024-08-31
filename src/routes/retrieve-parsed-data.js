const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pdf = require("pdf-parse");
require("dotenv").config();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token:
    process.env.COHERE_API_KEY || "",
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/retrieve-parsed-data",
  upload.single("uploadedFile"),
  async (req, res) => {
    try {
      const fileBuffer = req.file?.buffer;
      let data = await pdf(fileBuffer);
      data = data.text;
      let response = await cohere.generate({
        model: "command-r-plus-08-2024",
        prompt: `From this data please give me a json structured data, please do not stringify it,  extracted for name, phone number, email, skills, education, experience, achievements, projects, location, github link, portfolio link. Data - ${data}`,
      });
      response = JSON.parse(response.generations?.[0]?.text)
      res.send({ res: response });
    } catch (error) {
      console.error(error);
      res.send("Error Parsing File"); 
    }
  }
);

module.exports = router;
