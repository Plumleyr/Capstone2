import { supabase } from "../../config/supabaseClient";

export const updateUser = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error("Error updating user:", error.message);
    }
    return data[0];
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const getUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user:", error.message);
    }
    return data;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};
