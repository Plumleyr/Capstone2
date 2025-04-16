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

  const getAndSetIngredients = async (ingredientInfo) => {
    const good = [];
    const badModerate = [];

    // eslint-disable-next-line no-unused-vars
    Object.entries(ingredientInfo).forEach(([ingredient, info]) => {
      if (info && info.rating) {
        if (info.rating === "Good") {
          good.push(info);
        } else if (info.rating === "Bad" || info.rating === "Moderate") {
          badModerate.push(info);
        }
      }
    });

    setGoodIngredients(good);
    setBadModerateIngredients(badModerate);
  };

  useEffect(() => {
    const fetchTrackerInfo = async () => {
      let ingredientInfo = {};

      setLoading(true);

      try {
        const info = await getTracker(selectedDate);
        setTrackerInfo(info);
        if (info && info.current_ingredients) {
          const current_ingredients = info.current_ingredients || null;
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
        getAndSetIngredients(ingredientInfo);
      } catch (error) {
        console.error("Failed to fetch tracker info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackerInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return {
    trackerInfo,
    goodIngredients,
    badModerateIngredients,
    loading,
  };
};
