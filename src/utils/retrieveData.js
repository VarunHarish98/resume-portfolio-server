const supabase = require("../config/dbConnection");

const retrieveData = async (user) => {
  if (!user) return "No user found";
  try {
    const { data, error } = await supabase
      .from("user_data")
      .select("*")
      .eq("user_id", user);
    if (error) return "No User found - Glitch from our end";
    console.log(data);
    return data[0]?.user_details?.[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = retrieveData;
