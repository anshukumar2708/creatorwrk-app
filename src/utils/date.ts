// import dayjs from "dayjs";

// export const formatDate = (date: string, format: string = "YYYY-MM-DD HH:MM") =>
//   dayjs(date).format(format);

// export const TimeAgo = (date: any) => {
//   const now = new Date();
//   const secondsPast = (now.getTime() - date.getTime()) / 1000;

//   if (secondsPast < 60) {
//     return `${Math.floor(secondsPast)} sec`;
//   }
//   if (secondsPast < 3600) {
//     return `${Math.floor(secondsPast / 60)} min`;
//   }
//   if (secondsPast < 86400) {
//     return `${Math.floor(secondsPast / 3600)} hr`;
//   }
//   if (secondsPast < 2592000) {
//     // 30 days
//     return `${Math.floor(secondsPast / 86400)} day`;
//   }
//   if (secondsPast < 31536000) {
//     // 365 days
//     return `${Math.floor(secondsPast / 2592000)} month`;
//   }
//   return `${Math.floor(secondsPast / 31536000)} year`;
// };

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);

// Update the locale for relative time formatting
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    // past: "%s Ago",
    s: "1s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1hr",
    hh: "%dhr",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1yr",
    yy: "%dyr",
  },
});

// Function to convert UTC time to IST and get the relative time string
export const TimeAgo = (time: any) => {
  // Convert UTC to IST (Indian Standard Time)
  const istTime = dayjs.utc(time).tz("Asia/Kolkata");

  // Get the relative time string
  return istTime.fromNow(true);
};

// Example usage
dayjs().subtract(1, "minutes").utc(); // Subtract 1 minute from the current UTC time
// console.log("getTimeString", getTimeString("2024-08-16T07:44:01Z"));

//For chat component
export const chatTimeAgo = (dateString: any) => {
  const date: any = new Date(dateString);
  const today: any = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of today
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeDifference = today - date;
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
  const oneWeek = 7 * oneDay;

  if (timeDifference < oneDay && date.getDate() === today.getDate()) {
    return "Today";
  }

  if (timeDifference < oneWeek) {
    return dayOfWeekNames[date.getDay()];
  }

  return date.toLocaleDateString(); // Default to displaying full date
};

export function convertToMilliseconds(isoTimestamp: string) {
  const date = new Date(isoTimestamp);
  return date.getTime();
}
