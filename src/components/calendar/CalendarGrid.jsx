import { useCalendarGrid, useLocale } from "react-aria";
import { getWeeksInMonth } from "@internationalized/date";
import CalendarCell from "./CalendarCell";
import "../../styles/CalendarGrid.css";

function CalendarGrid({ state, ...props }) {
  let { locale } = useLocale();
  let { gridProps, headerProps } = useCalendarGrid(props, state);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

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
