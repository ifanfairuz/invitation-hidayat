import { useEffect, useState } from "react";
import frame from "@public/img/frame.png";
import framec1 from "@public/img/frame-c1.png";
import framec2 from "@public/img/frame-c2.png";
import bg1 from "@public/img/bg-1.jpg";

export const useLazyBg = <T extends Record<string, string>>(bgs: T) => {
  const [loaded, setLoaded] = useState<
    Partial<Record<keyof T, { backgroundImage: string }>>
  >({});

  useEffect(() => {
    for (const i in bgs) {
      const image = new Image();
      image.src = bgs[i];
      image.onload = () =>
        setLoaded((l) => ({
          ...l,
          [i]: { backgroundImage: `url(${bgs[i]})` },
        }));
    }
  });

  return loaded;
};

export const useStaticBackground = () =>
  useLazyBg({
    framed: frame.src,
    "frame-c1": framec1.src,
    "frame-c2": framec2.src,
    "bg-1": bg1.src,
  });
