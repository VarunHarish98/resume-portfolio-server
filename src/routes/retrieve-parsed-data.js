const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pdf = require("pdf-parse");

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

      /*
            ToDo - Cohere/OpenAI Integration and send back the json
      */
      res.send({ res: data });
    } catch (error) {
      console.error(error);
      res.send("Error Parsing File");
    }
  }
);

module.exports = router;
