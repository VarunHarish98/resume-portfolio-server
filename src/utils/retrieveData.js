const { default: supabase } = require("../config/dbConnection");

export const retrieveData = async (template_id) => {
  try {
    const { data, error } = await supabase
      .from("template")
      .select("*")
      .in("template_id", template_id);
    if (error) return "No template found - Glitch from our end";
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
