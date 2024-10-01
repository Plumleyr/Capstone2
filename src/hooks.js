import { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";
import useStore from "./store";

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
