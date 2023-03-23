import React, { useState, useEffect } from "react";
import moment from "moment";

const useTimeDiff = (date: string) => {
  const [countdown, setCountdown] = useState(getReminderCountdown());

  function getReminderCountdown() {
    const now = moment();
    const reminder = moment(date);
    const duration = moment.duration(reminder.diff(now));
    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  useEffect(() => {
    if (!date) return;

    const intervalId = setInterval(() => {
      setCountdown(getReminderCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  return [
    countdown.days,
    countdown.hours,
    countdown.minutes,
    countdown.seconds,
  ];
};
export default useTimeDiff;
