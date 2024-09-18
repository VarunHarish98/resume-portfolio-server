const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdf = require("pdf-parse");
require("dotenv").config();
const { CohereClient } = require("cohere-ai");
const authMiddleWare = require("../middleware/auth");
const insertData = require("../utils/insertData");
const supabase = require("../config/dbConnection");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "",
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/retrieve-parsed-data",
  // authMiddleWare,
  upload.single("uploadedFile"),
  async (req, res) => {
    let resp = "";
    try {
      const { data } = await supabase.auth.getUser();
      const fileBuffer = req.file?.buffer;
      let pdf_data = await pdf(fileBuffer);
      pdf_data = pdf_data.text;
      let response = await cohere.generate({
        model: "command-r-plus-08-2024",
        prompt: `From this data please give me a json structured data, please do not stringify it and don't give me any other response apart from the json, extracted for name, phone number, email, skills, education, experience, achievements, projects, location, github link, portfolio link. Data - ${pdf_data}`,
      });
      response = JSON.parse(response.generations?.[0]?.text);
      if (response) resp = await insertData(response);
      res.send({ res: resp });
    } catch (error) {
      console.error(error);
      res.send("Error Parsing File");
    }
  }
);

module.exports = router;
