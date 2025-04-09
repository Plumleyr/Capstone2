/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import CalendarGrid from "./CalendarGrid";
import { Button } from "react-aria-components";
import ArrowLeft from "../../assets/ArrowLeft.png";
import ArrowRight from "../../assets/ArrowRight.png";
import { fetchTrackersFromMonthName } from "../../hooks/fetchTrackersFromMonthName";
import "../../styles/Calendar.css";

function Calendar(props) {
  let { locale } = useLocale();
  const [loading, setLoading] = useState(false);
  const [trackers, setTrackers] = useState([]);
  const [currMonth, setCurrMonth] = useState(0);

  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );
  useEffect(() => {
    const getMonthlyTrackers = async () => {
      setLoading(true);

      try {
        const result = await fetchTrackersFromMonthName(title);
        if (result) {
          const { trackers: fetchedTrackers, currMonth: fetchedCurrMonth } =
            result;
          setTrackers(fetchedTrackers);
          setCurrMonth(fetchedCurrMonth);
        }
      } catch (error) {
        console.error("Error fetching trackers:", error);
      } finally {
        setLoading(false);
      }
    };

    getMonthlyTrackers();
  }, [title]);

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
        {loading ? (
          <div className="calendar-Loading">Loading...</div>
        ) : (
          <CalendarGrid
            state={state}
            trackers={trackers}
            currMonth={currMonth}
            setSelectedDate={props.setSelectedDate}
          />
        )}
      </div>
    </div>
  );
}

export default Calendar;
