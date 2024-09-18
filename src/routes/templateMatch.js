const express = require("express");
const supabase = require("../config/dbConnection");
const router = express.Router();
const retrieveTemplates = require("../utils/retrieveTemplates");
const retrieveData = require("../utils/retrieveData");
const templateCreater = require("../utils/handlebars.js/templateCreater");

/**
 * @params {id} - Client to send the unique ID
 * Description - Query the template from the template ID,
 *               Fetch the user details from the DB
 *               Maps the dynamic variables
 * returns - HTML content of the template
 */

router.get("/get-template-data/:id", async (req, res) => {
  try {
    let response = {};
    let result;
    let { id } = req.params;
    if (!id) return res.status(404).json({ message: "Template not found" });
    let templateData = await retrieveTemplates(id);
    let userData = await retrieveData("Varun Hosadurga Harish");
    if (!templateData || !userData)
      return res.status(401).json({ message: "Not found" });
    response.template = templateData[0]?.template;
    response.userData = userData;
    result = await templateCreater(response);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Some error occurred" });
  }
});

module.exports = router;
