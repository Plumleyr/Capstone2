import { useCalendarCell } from "react-aria";
import { useEffect, useRef, useState } from "react";
import "../../styles/CalendarCell.css";

function CalendarCell({ state, date, gutStatus, setSelectedDate }) {
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

  const [className, setClassName] = useState("");

  const getBackgroundColor = () => {
    if (gutStatus === "good") {
      setClassName("GC-good");
    } else if (gutStatus === "meh") {
      setClassName("GC-meh");
    } else if (gutStatus === "bad") {
      setClassName("GC-bad");
    } else {
      setClassName("");
    }
  };

  useEffect(() => {
    getBackgroundColor();
  }, []);

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
