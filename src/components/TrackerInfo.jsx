import "../styles/TrackerInfo.css";
import { useState, useEffect } from "react";
import { getTracker } from "../functions";

const TrackerInfo = ({ selectedDate }) => {
  const [trackerInfo, setTrackerInfo] = useState(null);

  useEffect(() => {
    const fetchTrackerInfo = async () => {
      try {
        const info = await getTracker(selectedDate);
        setTrackerInfo(info);
      } catch (error) {
        console.error("Failed to fetch tracker info:", error);
      }
    };

    if (selectedDate) {
      fetchTrackerInfo();
    }
  }, [selectedDate]);

  return (
    <div className="TI-main">
      <p className="TI-date">{selectedDate}</p>
      <h3 className="TI-heading">Things we ate</h3>
      <div className="TI-ingAte">
        <p className="TI-p">{trackerInfo?.current_ingredients.join(", ")}</p>
      </div>
      <h3 className="TI-heading">Good food items.</h3>
      <div className="TI-goodIng">
        <ul>
          <li></li>
        </ul>
      </div>
      <h3 className="TI-heading">Sensitive food items?</h3>
      <div className="TI-badIng">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default TrackerInfo;
