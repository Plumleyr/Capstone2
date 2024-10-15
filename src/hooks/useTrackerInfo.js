import { useState, useEffect } from "react";
import useStore from "../store";
import { getTracker } from "../api/supabase/tracker";
import { getIngredientRatings } from "../api/supabase/ingredientRating";

export const useTrackerInfo = (selectedDate) => {
  const [trackerInfo, setTrackerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [goodIngredients, setGoodIngredients] = useState([]);
  const [badModerateIngredients, setBadModerateIngredients] = useState([]);
  const { user } = useStore();

  const fetchTrackerInfo = async () => {
    let ingredientInfo = {};
    try {
      const info = await getTracker(selectedDate);
      setTrackerInfo(info);
      if (info && info.current_ingredients) {
        const current_ingredients = info?.current_ingredients || null;
        await Promise.all(
          current_ingredients.map(async (ingredient) => {
            const ratings = await getIngredientRatings(
              ingredient,
              user?.disease
            );
            ingredientInfo[ingredient] = ratings;
          })
        );
      }
      return ingredientInfo;
    } catch (error) {
      console.error("Failed to fetch tracker info:", error);
    }
  };

  useEffect(() => {
    const getAndSetIngredients = async () => {
      const good = [];
      const badModerate = [];

      setLoading(true);
      const ingredientInfo = await fetchTrackerInfo();
      Object.entries(ingredientInfo).forEach(([ingredient, info]) => {
        if (info?.rating === "Good") {
          good.push(info);
        } else if (info?.rating === "Bad" || info?.rating === "Moderate") {
          badModerate.push(info);
        }
      });

      console.log(trackerInfo);
      console.log(ingredientInfo);

      setGoodIngredients(good);
      setBadModerateIngredients(badModerate);
      setLoading(false);
    };
    getAndSetIngredients();
  }, [selectedDate]);

  return {
    trackerInfo,
    goodIngredients,
    badModerateIngredients,
    loading,
  };
};
