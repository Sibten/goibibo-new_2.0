import React, { useEffect, useState } from "react";
import { MyProps } from "../Types";

export default function Timer({ Start, callback }: MyProps) {
  const [second, setSecond] = useState(30);
  const [min, setMin] = useState(0);
  const [start, setStart] = useState(Start);

  useEffect(() => {
    let interval: any;
    if (start) {
      interval = setInterval(() => {
        if (second == 1) {
          setSecond(0);
          setStart(false);
          clearInterval(interval);
          callback!(1);
        } else {
          setSecond(second - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [Start, start, second]);
  return (
    <div className="text-orange-700 font-qs font-light text-sm text-right mx-2">
      {min} : {second}
    </div>
  );
}
