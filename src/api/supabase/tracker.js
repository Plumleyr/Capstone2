import { supabase } from "../../config/supabaseClient";

export const getTracker = async (date) => {
  try {
    const { data: tracker, error: trackerError } = await supabase
      .from("trackers")
      .select("*")
      .eq("entry_date", date);

    if (trackerError) {
      console.error("error getting selected tracker", trackerError);
    }

    return tracker[0];
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const createTracker = async (date, gutStatus, ingredientsArr) => {
  try {
    const { data, error } = await supabase
      .from("trackers")
      .insert([
        {
          entry_date: date,
          current_gut_status: gutStatus,
          current_ingredients: ingredientsArr,
        },
      ])
      .select();
    if (error) {
      console.error("error creating tracker", error);
    }

    return data;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const checkTrackerCompletion = async () => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const { data: tracker, error: trackerError } = await supabase
      .from("trackers")
      .select("entry_date")
      .eq("entry_date", today);

    if (trackerError) {
      console.error("error getting user's trackers", trackerError);
    }
    return tracker[0]?.entry_date === today;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};
