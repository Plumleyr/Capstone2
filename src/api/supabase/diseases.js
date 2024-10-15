import { supabase } from "../../config/supabaseClient";

export const getDiseases = async () => {
  try {
    const { data, error } = await supabase
      .from("diseases")
      .select("disease_name");

    if (error) {
      console.error("error getting diseases", error);
    }

    return data;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};
