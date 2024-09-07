const { failureResponse, successResponse } = require("./utils");
const { Details } = require("../models/resumeData");

const insertData = async (data) => {
  try {
    let { name, ...details } = data;
    details = JSON.stringify(details);
    const resumeData = await Details.insertMany([{ name, details }]);

    if (resumeData.insertedCount === 1) {
      return successResponse;
    }
    return failureResponse;
  } catch (error) {
    console.error("Error inserting data:", error);
    return failureResponse; 
  }
};

module.exports = insertData;
