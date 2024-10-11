import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  const customButton = (buttonProps) => ({
    ...buttonProps,
    onPress: () => {
      setLoading(true);
      console.log("true");
      buttonProps.onPress();
      setTimeout(() => {
        setLoading(false);
      }, 200);
    },
  });

  return (
    <div {...calendarProps} className="calendar">
      <div className="calendarHeaderDiv">
        <Button className="calendarPrev" {...customButton(prevButtonProps)}>
          <img src={ArrowLeft} />
        </Button>
        <h2 className="calendarHeader">{title}</h2>
        <Button className="calendarNext" {...customButton(nextButtonProps)}>
          <img src={ArrowRight} />
        </Button>
      </div>
      <div className="calendarBodyDiv">
        {loading ? (
          <div className="calendar-Loading">Loading...</div>
        ) : (
          <CalendarGrid state={state} setSelectedDate={props.setSelectedDate} />
        )}
      </div>
    </div>
  );
}

export default Calendar;
