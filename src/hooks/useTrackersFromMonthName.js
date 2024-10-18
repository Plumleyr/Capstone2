import { supabase } from "../config/supabaseClient";

export const useTrackersFromMonthName = async (date) => {
  const [month, year] = date.split(" ");
  const getDateRangeForMonthName = (month, year) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthIndex = monthNames.indexOf(month);

    if (monthIndex === -1) {
      throw new Error("Invalid month name");
    }

    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    return {
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
      currMonth: monthIndex + 1,
    };
  };

  try {
    const { start, end, currMonth } = getDateRangeForMonthName(month, year);
    const { data: trackers, error: trackersError } = await supabase
      .from("trackers")
      .select("*")
      .gte("entry_date", start)
      .lte("entry_date", end);

    if (trackersError) {
      console.error("Error fetching trackers:", trackersError);
      return null;
    }

    return { trackers, currMonth };
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return null;
  }
};
