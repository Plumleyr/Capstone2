import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { getUser } from "../api/supabase/user";
import useStore from "../store";

export const useUserSession = () => {
  const [error, setError] = useState(null);
  const [initialSignIn, setInitialSignIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setUser, setIsAnonymous } = useStore();

  const fetchSessionAndUser = async () => {
    setError(null);

    try {
      setLoading(true);
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const session = sessionData?.session;

      if (session) {
        setIsAnonymous(session.user.is_anonymous || false);

        const userData = await getUser(session.user.id);

        setUser(userData[0]);
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
      console.log(event);
      if (event === "SIGNED_OUT") {
        fetchSessionAndUser();
        setInitialSignIn(true);
      } else if (event === "USER_UPDATED") {
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

  return { error, loading };
};
