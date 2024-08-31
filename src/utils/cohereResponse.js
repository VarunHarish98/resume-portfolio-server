require("dotenv").config();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token:
    process.env.COHERE_API_KEY || "Kjc8Z7psEjg8zMu74Pu6WeSY6OBxkXpAFUyMw984",
});
const cohereResponse = async (data) => {
  try {
    const response = await cohere.generate({
      model: "command-r-plus-08-2024",
      prompt: `From this data please give me a json structured data extracted for name, phone number, email, skills, education, experience, achievements, projects, location, github link, portfolio link. Data - ${data}`,
    });

    return response.body?.generations?.[0]?.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};
module.exports = cohereResponse;
