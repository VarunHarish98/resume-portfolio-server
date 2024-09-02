const mongoose = require("mongoose");

const resumeDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = {
  Details: mongoose.model("Details", resumeDataSchema)
};
