import supabase from "./config/supabaseClient";

// make services directroy and name file auth and continue naming schema with different functions!

export const handleAnonSignUp = async (formData) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.updateUser(
      {
        email: formData.email,
        password: formData.password,
      }
    );

    if (authError) {
      console.error("Error updating auth.users table:", authError.message);
      return;
    }
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const handleSessionlessSignUp = async (formData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        },
      },
    });
    if (error) {
      console.log("error signing up", error);
    }
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const handleSignIn = async (formData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log("error logging in", error);
    }
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const signInAnonymously = async (name) => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          name: name || "guest",
        },
      },
    });
    if (error) {
      console.error("error signing up anon", error);
    }
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

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

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("error signing out", error);
    }
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const getIngredientRatings = async (ingredient, disease) => {
  try {
    const { data: ratingData, error: ratingError } = await supabase
      .from("ingredient_rating")
      .select(
        `
        explanation,
        rating,
        ingredients!inner(ingredient_name),
        diseases!inner(disease_name)
      `
      )
      .ilike("ingredients.ingredient_name", `%${ingredient}%`)
      .eq("diseases.disease_name", disease);

    if (ratingError) {
      console.error("Error getting ingredient rating data:", ratingError);
      return null;
    }

    return ratingData[0];
  } catch (err) {
    console.error("Unexpected Error", err.message);
    return null;
  }
};
