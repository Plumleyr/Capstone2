import { supabase } from "../../config/supabaseClient";

export const updateUser = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user:", error.message);
    }
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};
