import { useCalendarCell } from "react-aria";
import { useEffect, useRef, useState } from "react";
import "../../styles/CalendarCell.css";
import { getTracker } from "../../functions";

function CalendarCell({ state, date, setSelectedDate }) {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const [className, setClassName] = useState(null);

  const getBackgroundColor = async (dateObj) => {
    const { year, month, day } = dateObj;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    try {
      const tracker = await getTracker(formattedDate);
      const daysStatus = tracker?.current_gut_status;

      if (daysStatus === "good") {
        setClassName("GC-good");
      } else if (daysStatus === "meh") {
        setClassName("GC-meh");
      } else if (daysStatus === "bad") {
        setClassName("GC-bad");
      } else {
        setClassName("");
      }
    } catch (error) {
      console.error("Error fetching tracker data:", error);
      setClassName("");
    }
  };

  useEffect(() => {
    getBackgroundColor(date);
  }, [date]);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`cell ${className} ${isSelected ? "selected" : ""} ${
          isDisabled ? "disabled" : ""
        } ${isUnavailable ? "unavailable" : ""}`}
        onClick={() => setSelectedDate(date)}
      >
        {formattedDate}
      </div>
    </td>
  );
}

export default CalendarCell;
