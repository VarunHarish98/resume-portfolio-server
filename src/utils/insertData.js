const supabase = require("../config/dbConnection");

const insertData = async (response) => {
  let name = response[0]?.name;
  if (!name) return "Not able to get name";
  const { data, error } = await supabase
    .from("user_data")
    .insert([
      {
        user_name: name,
        user_details: response,
      },
    ])
    .select();
  if (error) {
    console.error("Error inserting data:", error);
  }
  console.log(data);
  return data;
};

module.exports = insertData;
