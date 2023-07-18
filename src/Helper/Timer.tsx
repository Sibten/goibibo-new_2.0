import React, { useState, useEffect } from "react";

export default function Timer({
  Start,
  InComingSecond,
  InComingMinute,
  InComingHour,
  Callback,
}: {
  Start: boolean;
  InComingSecond: number;
  InComingMinute: number;
  InComingHour?: number;
  Callback: Function;
}) {
  const [second, setSecond] = useState(InComingSecond);
  const [min, setMin] = useState(InComingMinute);
  const [hour, setHour] = useState(InComingHour ?? 0);
  const [start, setStart] = useState(Start);

  useEffect(() => {
    let interval: any = null;
    if (start) {
      interval = setInterval(() => {
        if (second == 1 && min == 0 && hour == 0) {
          setSecond(0);
          setStart(false);
          clearInterval(interval);
          Callback(1);
        } else if (second >= 1) {
          setSecond((second) => second - 1);
        } else if (second == 0 && min != 0) {
          setMin(min - 1);
          setSecond(59);
        } else if (second == 0 && min == 0 && hour != 0) {
          setHour(hour - 1);
          setMin(59);
          setSecond(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [Start, start, second]);

  return (
    <div className="mx-2 text-sm">
      {min} : {second}
    </div>
  );
}
