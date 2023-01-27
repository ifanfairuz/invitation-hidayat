import { FC, useEffect, useMemo, useState } from "react";

const Counter: FC = () => {
  const [d, setD] = useState(0);
  const pad = (val: number) => {
    var s = val + "";
    return s.length < 2 ? "0" + s : s;
  };

  const display = useMemo(() => {
    const seconds = d;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const day = hours / 24;
    return {
      seconds: Math.floor(seconds % 60),
      minutes: Math.floor(minutes % 60),
      hours: Math.floor(hours % 24),
      day: Math.floor(day),
    };
  }, [d]);

  useEffect(() => {
    const date = new Date(Date.parse("2023-02-06 16:00:00"));
    setD(Math.round((date.getTime() - Date.now()) / 1000));
    let interval = setInterval(() => {
      setD((a) => a - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-around f-sans mt-8 mb-4">
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(display.day)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          hari
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(display.hours)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          jam
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(display.minutes)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          menit
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-main-800 font-medium">
          {pad(display.seconds)}
        </h1>
        <p className="f-serif text-md md:text-lg lg:text-xl text-main-700">
          detik
        </p>
      </div>
    </div>
  );
};

export default Counter;
