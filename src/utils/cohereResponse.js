require("dotenv").config();
const { CohereClient } = require("cohere-ai");
const { insertData } = require("./insertData");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
const cohereResponse = async (data) => {
  let resp = "";
  try {
    const response = await cohere.generate({
      model: "command-r-plus-08-2024",
      prompt: `From this data please give me a json structured data extracted for name, phone number, email, skills, education, experience, achievements, projects, location, github link, portfolio link. Data - ${data}`,
    });
    let respData = response.body?.generations?.[0]?.text;
    if (respData) resp = await insertData(respData);
    return resp;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};
module.exports = cohereResponse;
