import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTrackerCompletion } from "../functions";
import useStore from "../store";

const TrackerGuard = ({ children }) => {
  const [shouldRedirect, setShouldRedirect] = useState(null);
  const { user, hasDisease } = useStore();

  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setShouldRedirect("/landing");
      } else {
        const hasCompletedTracker = await checkTrackerCompletion();
        if (hasCompletedTracker) {
          setShouldRedirect(null);
        } else {
          if (hasDisease) {
            setShouldRedirect("/stomach-status");
          } else {
            setShouldRedirect("/first-entry");
          }
        }
      }
    };
    checkStatus();
  }, [user]);

  if (shouldRedirect) {
    return <Navigate to={shouldRedirect} />;
  }

  return children;
};

export default TrackerGuard;
