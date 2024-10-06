import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import CalendarGrid from "./CalendarGrid";
import { Button } from "react-aria-components";
import ArrowLeft from "../../assets/ArrowLeft.png";
import ArrowRight from "../../assets/ArrowRight.png";
import "../../styles/Calendar.css";

function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="calendar">
      <div className="calendarHeaderDiv">
        <Button className="calendarPrev" {...prevButtonProps}>
          <img src={ArrowLeft} />
        </Button>
        <h2 className="calendarHeader">{title}</h2>
        <Button className="calendarNext" {...nextButtonProps}>
          <img src={ArrowRight} />
        </Button>
      </div>
      <div className="calendarBodyDiv">
        <CalendarGrid state={state} setSelectedDate={props.setSelectedDate} />
      </div>
    </div>
  );
}

export default Calendar;
