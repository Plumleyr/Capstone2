import { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";
import useStore from "./store";
import { getTracker, getIngredientRatings } from "./functions";

export const useUserSession = () => {
  const [error, setError] = useState(null);
  const [initialSignIn, setInitialSignIn] = useState(true);

  const { setHasDisease, setUser, setIsAnonymous, setLoading } = useStore();

  const fetchSessionAndUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const session = sessionData?.session;

      if (session) {
        setIsAnonymous(session.user.is_anonymous || false);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", session.user.id);

        if (userError) throw userError;

        setUser(userData?.[0]);
        setHasDisease(userData?.[0].disease ? true : false);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" || event === "USER_UPDATED") {
        fetchSessionAndUser();
      } else if (event === "SIGNED_IN" && initialSignIn) {
        setInitialSignIn(false);
        fetchSessionAndUser();
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [initialSignIn]);

  return { error };
};

export const useTrackerInfo = (selectedDate) => {
  const [trackerInfo, setTrackerInfo] = useState(null);
  const [ingredientInfo, setIngredientInfo] = useState({});
  const [goodIngredients, setGoodIngredients] = useState([]);
  const [badModerateIngredients, setBadModerateIngredients] = useState([]);
  const { user } = useStore();

  useEffect(() => {
    const fetchTrackerInfo = async () => {
      try {
        const info = await getTracker(selectedDate);
        setTrackerInfo(info);
        setIngredientInfo({});
        await Promise.all(
          info.current_ingredients.map(async (ingredient) => {
            const ratings = await getIngredientRatings(
              ingredient,
              user?.disease
            );
            setIngredientInfo((prevInfo) => ({
              ...prevInfo,
              [ingredient]: ratings,
            }));
            return ratings;
          })
        );
      } catch (error) {
        console.error("Failed to fetch tracker info:", error);
      }
    };

    if (selectedDate) {
      fetchTrackerInfo();
    }
  }, [selectedDate, user]);
  useEffect(() => {
    const good = [];
    const badModerate = [];

    Object.entries(ingredientInfo).forEach(([ingredient, info]) => {
      if (info?.rating === "Good") {
        good.push(info);
      } else if (info?.rating === "Bad" || info?.rating === "Moderate") {
        badModerate.push(info);
      }
    });

    setGoodIngredients(good);
    setBadModerateIngredients(badModerate);
  }, [ingredientInfo]);

  return {
    trackerInfo,
    goodIngredients,
    badModerateIngredients,
  };
};
