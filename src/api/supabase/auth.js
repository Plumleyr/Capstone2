import { supabase } from "../../config/supabaseClient";

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
