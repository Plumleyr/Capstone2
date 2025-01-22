import { supabase, getServiceSupabase } from "../../config/supabaseClient";
import { gptPrompt } from "../../constants/prompt";

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
      .like("ingredients.ingredient_name", `%${ingredient}%`)
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

export const addIngredientRatings = async (
  ingId,
  diseaseId,
  rating,
  explanation
) => {
  const supabase = getServiceSupabase();
  try {
    const { data: ratingData, error: ratingError } = await supabase
      .from("ingredient_rating")
      .insert([
        {
          ingredient_id: ingId,
          disease_id: diseaseId,
          rating: rating,
          explanation: explanation,
        },
      ])
      .select();

    if (ratingError) {
      console.error("Error inserting ingredient rating data:", ratingError);
      return null;
    }

    return ratingData;
  } catch (err) {
    console.error("Unexpected Error", err.message);
    return null;
  }
};

export const createIngredientRating = async (ingArr) => {
  const supabase = getServiceSupabase();
  try {
    const responses = await Promise.all(
      ingArr.map(async (ing) => {
        const { data, error } = await supabase.rpc("read_api", {
          prompt: gptPrompt,
          ingredient: ing,
        });

        if (error) {
          console.error("Error calling read_api", error);
          return null;
        }

        return JSON.parse(data);
      })
    );

    return responses;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
