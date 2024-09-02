const { failureResponse, successResponse } = require("./utils");

const { Details } = require("../models/resumeData");

const insertData = async (data) => {
  try {
    let { name, ...details } = data;
    details = JSON.stringify(details);
    data = { name, details };
    const resumeData = await Details.insertMany(data);
    if (resumeData) return successResponse;
    return failureResponse;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = insertData;
