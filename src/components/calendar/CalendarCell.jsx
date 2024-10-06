import { useCalendarCell } from "react-aria";
import { useRef } from "react";
import "../../styles/CalendarCell.css";

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

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`cell ${isSelected ? "selected" : ""} ${
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
