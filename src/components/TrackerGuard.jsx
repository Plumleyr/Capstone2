import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTrackerCompletion } from "../functions";
import useStore from "../store";

const TrackerGuard = ({ children }) => {
  const [shouldRedirect, setShouldRedirect] = useState(null);
  const { user, disease, setLoading } = useStore();

  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setShouldRedirect("/landing");
      } else {
        const hasCompletedTracker = await checkTrackerCompletion();
        if (hasCompletedTracker) {
          setShouldRedirect(null);
        } else {
          if (!disease) {
            setShouldRedirect("/first-entry");
          } else {
            setShouldRedirect("/stomach-status");
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
