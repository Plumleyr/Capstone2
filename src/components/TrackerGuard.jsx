import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTrackerCompletion } from "../api/supabase/tracker";
import useStore from "../store";

const TrackerGuard = ({ children }) => {
  const [shouldRedirect, setShouldRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useStore();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true);
        if (!user) {
          setShouldRedirect("/landing");
        } else {
          const hasCompletedTracker = await checkTrackerCompletion();
          if (hasCompletedTracker) {
            setShouldRedirect(null);
          } else {
            setShouldRedirect("/stomach-status");
          }
        }
      } catch (err) {
        console.err("unexpected error", err);
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
  }, []);

  if (loading) {
    <div className="App-Loading">Loading...</div>;
  }

  if (shouldRedirect) {
    return <Navigate to={shouldRedirect} />;
  }

  return children;
};

export default TrackerGuard;
