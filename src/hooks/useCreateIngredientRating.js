import { getIngredient, addIngredient } from "../api/supabase/ingredients";
import { createIngredientRating } from "../api/openai/gptCalls";
import { addIngredientRatings } from "../api/supabase/ingredientRating";

export const useCreateIngredientRating = async (ingredients) => {
  const results = await Promise.all(
    ingredients.map(async (ing) => {
      const ingredientData = await getIngredient(ing);
      return { ingredient: ing, found: ingredientData.length > 0 };
    })
  );

  const notFoundIngredients = results
    .filter((result) => !result.found)
    .map((result) => result.ingredient);

  const newRatings = await createIngredientRating(notFoundIngredients);

  const ratingResults = await Promise.all(
    newRatings.map(async (ratingData, index) => {
      const ing =
        notFoundIngredients[index].charAt(0).toUpperCase() +
        notFoundIngredients[index].slice(1).toLowerCase();

      const addedIngredient = await addIngredient(ing);
      if (!addedIngredient) {
        console.error(`Failed to add ingredient: ${ing}`);
        return null;
      }

      const ingInfo = await getIngredient(ing);
      if (!ingInfo || ingInfo.length === 0) {
        console.error(`Failed to retrieve added ingredient: ${ing}`);
        return null;
      }

      const ingId = ingInfo[0].ingredient_id;

      const ibsRating = await addIngredientRatings(
        ingId,
        3,
        ratingData["IBS Rating"],
        ratingData["IBS Reason"]
      );
      const crohnsRating = await addIngredientRatings(
        ingId,
        1,
        ratingData["Crohn’s Rating"],
        ratingData["Crohn’s Reason"]
      );
      const ucRating = await addIngredientRatings(
        ingId,
        2,
        ratingData["UC Rating"],
        ratingData["UC Reason"]
      );

      if (!ibsRating || !crohnsRating || !ucRating) {
        console.error(`Failed to add ratings for ingredient: ${ing}`);
        return null;
      }

      return { ing, ibsRating, crohnsRating, ucRating };
    })
  );

  return ratingResults;
};
