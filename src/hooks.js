import { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";

export const useUserSession = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSessionAndUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: newSession, error: sessionError } =
          await supabase.auth.getSession();
        console.log("session", newSession, "error", sessionError);

        if (sessionError) throw sessionError;

        let userId = null;

        if (newSession) {
          userId = newSession.session.user.id;
        } else {
          const { data: anonUser, error: anonError } =
            await supabase.auth.signInAnonymously();
          console.log("anon user", anonUser, "error", anonError);

          if (anonError) throw anonError;

          userId = anonError.user.id;
        }

        const { data: user, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId);

        if (userError) throw userError;

        setUser(user[0]);
      } catch (err) {
        setError(err.message || "An error occurred");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getSessionAndUser();
  }, []);

  return { user, loading, error };
};
