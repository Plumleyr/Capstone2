import { useState } from "react";
import Calendar from "./calendar/Calendar";
import TrackerInfo from "./TrackerInfo";
import "../styles/Home.css";

const Home = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const formatSelectedDate = (dateObj) => {
    const { year, month, day } = dateObj;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    setSelectedDate(formattedDate);
  };

  return (
    <div className="Home-main">
      <Calendar
        aria-label="Appointment date"
        setSelectedDate={formatSelectedDate}
      />
      <TrackerInfo selectedDate={selectedDate} />
    </div>
  );
};

export default Home;
