import { useCalendarGrid, useLocale } from "react-aria";
import { getWeeksInMonth } from "@internationalized/date";
import CalendarCell from "./CalendarCell";
import "../../styles/CalendarGrid.css";

function CalendarGrid({ state, trackers, currMonth, ...props }) {
  let { locale } = useLocale();
  let { gridProps, headerProps } = useCalendarGrid(props, state);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  const getStatusForDate = (dateObj) => {
    const { year, month, day } = dateObj;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    const filteredTrackers = trackers.filter((tracker) => {
      return tracker.entry_date === formattedDate;
    });
    return filteredTrackers[0]?.current_gut_status;
  };

  return (
    <table className="CGBody" {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th className="CGTH" key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    gutStatus={getStatusForDate(date)}
                    setSelectedDate={props.setSelectedDate}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CalendarGrid;
