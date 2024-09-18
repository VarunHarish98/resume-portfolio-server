const supabase = require("../config/dbConnection");

const retrieveTemplates = async (template_id) => {
  if (!template_id) return "No Templates found!!!";
  try {
    let { data, error } = await supabase
      .from("template")
      .select("*")
      .eq("template_id", template_id);
    if (error) return "No template found - Glitch from our end";
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = retrieveTemplates;
