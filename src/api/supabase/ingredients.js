import { supabase, getServiceSupabase } from "../../config/supabaseClient";

export const getIngredients = async () => {
  try {
    const { data: ingredients, error } = await supabase
      .from("ingredients")
      .select("ingredient_id");

    if (error) {
      console.error("error getting ingredients", error);
    }

    return ingredients;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const getIngredient = async (ing) => {
  try {
    const { data: ingredient, error } = await supabase
      .from("ingredients")
      .select("*")
      .ilike("ingredient_name", `%${ing}%`);

    if (error) {
      console.error("error getting ingredient", error);
    }

    return ingredient;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};

export const addIngredient = async (ing) => {
  try {
    const supabase = getServiceSupabase();
    const { data: ingredient, error } = await supabase
      .from("ingredients")
      .insert([{ ingredient_name: ing }])
      .select();

    if (error) {
      console.error("error adding ingredient", error);
    }

    return ingredient;
  } catch (err) {
    console.error("Unexpected Error", err.message);
  }
};
