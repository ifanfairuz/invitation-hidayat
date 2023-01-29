import { FC, useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";

const Counter: FC = () => {
  const date = DateTime.fromFormat(
    "2023-02-06 16:00:00",
    "yyyy-MM-dd HH:mm:ss"
  );
  const pad = (val: number) => val.toString().padStart(2, "0");
  const [d, setD] = useState({ seconds: 0, minutes: 0, hours: 0, days: 0 });

  useEffect(() => {
    let interval = setInterval(() => {
      setD(() => {
        const { seconds, minutes, hours, days } = date.diffNow();
        return { seconds, minutes, hours, days };
      });
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex items-center justify-around f-sans mt-8 mb-4">
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(d.days)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          hari
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(d.hours)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          jam
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(d.minutes)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          menit
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(d.seconds)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          detik
        </p>
      </div>
    </div>
  );
};

export default Counter;
