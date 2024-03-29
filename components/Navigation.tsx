import {
  ButtonHTMLAttributes,
  FC,
  createRef,
  useCallback,
  useEffect,
} from "react";

export interface ALinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  offset?: string | number | (() => number);
  comp: string;
}
const ALink: FC<ALinkProps> = (props) => {
  const onClick: ALinkProps["onClick"] = (event) => {
    event.preventDefault();
    const e = { ...event };
    setTimeout(() => {
      let offset = () => 0;
      if (typeof props.offset !== "undefined") {
        if (typeof props.offset === "function") {
          offset = props.offset;
        } else {
          offset = () => parseInt(props.offset as string);
        }
      }
      const id = props.comp.slice(1);
      const $anchor = document.getElementById(id);
      // Check if the change occurs for the x or y axis
      if ($anchor && $anchor.getBoundingClientRect().top !== 0) {
        window.scroll({
          top: $anchor.getBoundingClientRect().top + window.scrollY - offset(),
          behavior: "smooth",
        });
      } else if ($anchor && $anchor.getBoundingClientRect().left !== 0) {
        window.scroll({
          left:
            $anchor.getBoundingClientRect().left + window.scrollX - offset(),
          behavior: "smooth",
        });
      }
      if (props.onClick) props.onClick(e);
    }, 0);
  };

  useEffect(() => {
    require("smoothscroll-polyfill").polyfill();
  }, []);

  return (
    <button {...props} onClick={onClick} className="flex-1 text-center px-0" />
  );
};

const Navigation: FC = () => {
  const navigation = createRef<HTMLElement>();

  const onScroll = useCallback(() => {
    const $mainFirst = document.getElementById("main-first");
    const t =
      ($mainFirst?.getBoundingClientRect().top || 0) +
      (window.scrollY + 150) -
      window.screen.availHeight;
    if ((document.scrollingElement?.scrollTop || 0) > t) {
      navigation.current?.classList.replace("bg-main-500", "bg-main-100");
      navigation.current?.classList.replace("text-main-50", "text-main-800");
    } else {
      navigation.current?.classList.replace("bg-main-100", "bg-main-500");
      navigation.current?.classList.replace("text-main-800", "text-main-50");
    }
  }, [navigation]);

  useEffect(() => {
    document.body.onscroll = onScroll;
    return () => {
      document.body.onscroll = () => {};
    };
  }, [onScroll]);

  return (
    <nav
      ref={navigation}
      className="fixed h-16 bg-main-500 text-main-50 transition-all duration-300 w-[90vw] max-w-[500px] z-20 bottom-4 lg:bottom-8 left-0 right-0 mx-auto rounded-xl flex shadow-lg"
    >
      <ul className="flex flex-1">
        <li className="flex-1 hover:bg-black/10 flex flex-col">
          <ALink comp="#pengantin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 64 64"
              enableBackground="new 0 0 390.675 390.675"
              className="w-9 h-9 lg:w-12 lg:h-12 mx-auto"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M23.91 32.18c0.16,-0.99 0.32,-1.97 0.5,-3.12 -1.41,0.81 -1.55,1.42 -0.5,3.12zm31.72 -9.87c-0.01,0.59 -0.3,1.27 0.76,1.66 -0.04,-0.69 -0.08,-1.26 -0.13,-1.93 -0.37,0.18 -0.52,0.25 -0.67,0.32 0.08,-0.65 0.41,-1.37 -0.51,-1.75 -0.58,1.83 -0.58,1.83 -0.07,2.72 0.22,-0.36 0.42,-0.69 0.62,-1.02zm-8.21 -1.47c-0.02,-0.32 -0.03,-0.65 -0.07,-1.32l-1.35 1.03 -0.73 1.79 0.73 -1.79 -0.02 0.02c-0.31,-0.71 -0.02,-1.12 0.67,-1.32 2.6,-0.79 5.26,-0.94 7.87,-0.23 2.71,0.74 3.63,2.16 3.52,4.99 -0.02,0.46 -0.08,0.94 -0.2,1.39 -0.45,1.71 -0.96,3.41 -1.4,5.13 -0.46,1.79 -1.45,3.25 -2.84,4.41 -1.45,1.22 -2.95,2.37 -4.5,3.47 -4.5,3.21 -9.53,5.5 -14.43,7.98 -4.04,2.05 -8.39,3.26 -12.95,3.45 -2.13,0.09 -4.26,-0.09 -6.23,-1.05 -2.42,-1.18 -3.25,-3.15 -2.33,-5.79 0.47,1.26 0.9,2.44 1.34,3.62 0.09,-0.02 0.18,-0.04 0.27,-0.07 -0.25,-1.62 -0.5,-3.25 -0.75,-4.88 1.09,1.84 0.97,4.05 2.13,5.89 0.19,-0.44 0.29,-0.88 0.22,-1.29 -0.12,-0.76 -0.39,-1.49 -0.52,-2.25 -0.21,-1.16 -0.35,-2.34 -0.52,-3.51 0.13,-0.02 0.25,-0.04 0.38,-0.07 0.37,1.5 0.74,3 1.18,4.78 1.25,-2.09 0.18,-3.9 0.37,-5.66 -1.11,-0.69 -2.16,-1.34 -3.27,-2.03 -1.71,1.82 -2.84,3.75 -2.96,6.29 -0.15,3.12 1.38,5.57 2.83,8.07 0.27,0.47 0.66,0.87 1.04,1.37 0.16,-0.39 0.24,-0.59 0.36,-0.87 0.65,1.36 0.96,2.95 2.99,2.79 -0.39,-1.04 -0.75,-2 -1.1,-2.96 1.99,3.29 1.99,3.29 3.1,3.13 -0.07,-0.46 -0.14,-0.91 -0.21,-1.37l0 0c-0.26,-0.39 -0.52,-0.78 -0.78,-1.17 0.12,-0.06 0.24,-0.11 0.36,-0.16 0.12,0.45 0.25,0.91 0.38,1.36l0 0 0 0c0.23,0.32 0.52,0.62 0.69,0.97 0.3,0.59 0.79,0.71 1.34,0.63 1.4,-0.21 2.82,-0.15 4.29,-0.28 -0.33,-0.86 -0.64,-1.65 -0.94,-2.44 0.45,0.3 0.67,0.7 0.86,1.11 0.4,0.89 0.88,1.4 2.04,1.11 3.03,-0.78 6.22,-1.09 9.13,-2.17 6.56,-2.43 12.44,-6.07 17.46,-11.02 2.25,-2.22 4.14,-4.73 5.62,-7.52 0.59,-1.12 1.09,-2.42 1.18,-3.67 0.26,-3.6 -0.76,-6.89 -2.84,-9.87 -1.39,-2 -3.27,-3.26 -5.53,-3.96 -3.01,-0.94 -6.06,-0.85 -9.12,-0.12 -3.2,0.76 -6.05,2.38 -9.04,3.65 -5.28,2.25 -9.98,5.41 -14.54,8.82 -0.31,0.23 -0.58,0.51 -1.05,0.94 1.15,0.56 2.07,1.01 3.13,1.52 0.11,-0.63 0.17,-1.02 0.25,-1.49 -0.45,0.04 -0.81,0.07 -1.25,0.11 1.31,-2.09 5.89,-4.83 8.46,-5.15 0.87,1.97 -0.02,4.01 0.11,6.07 1.03,-0.3 1,-1.09 1.12,-1.76 0.29,-1.54 0.54,-3.1 0.81,-4.65 0.1,0.02 0.19,0.03 0.29,0.05 -0.15,1.67 -0.29,3.34 -0.46,5.31 0.7,-0.47 1.12,-0.76 1.48,-1 0.05,-1.68 0.24,-3.21 1.07,-4.6 -0.14,1.32 -0.27,2.63 -0.44,4.33 3.07,-2.04 6.18,-2.95 9.28,-3.9 0.45,-0.13 0.79,-0.63 1.18,-0.96l0.74 -1.81 -0.73 1.81c1.07,0.39 1.37,0.32 1.76,-0.55 0.4,-0.9 0.75,-1.83 1.12,-2.74 -0.18,0.95 -0.37,1.91 -0.64,3.28 0.73,-0.48 1.16,-0.77 1.49,-0.98 0.24,0.12 0.46,0.22 0.75,0.36 0.43,-1.36 0.81,-2.57 1.22,-3.87 -1.3,-0.07 -2.38,-0.06 -2.87,1.27l0 0zm-19.39 12.7c0.93,-0.66 1.32,-1.57 1.43,-2.7 0.17,-1.73 0.47,-3.45 0.71,-5.18 -0.12,-0.06 -0.24,-0.12 -0.36,-0.19 -1.59,0.98 -3.17,1.96 -4.81,2.96 -0.13,1.19 -0.29,2.36 -0.39,3.53 -0.06,0.65 0.28,0.95 0.95,0.87 0.25,-1.47 0.5,-2.89 0.74,-4.31 0.11,0.02 0.23,0.03 0.34,0.05 -0.13,1.55 -0.25,3.1 -0.37,4.65 0.53,0.18 0.91,0.33 1.31,0.43 0.13,0.03 0.3,-0.08 0.46,-0.14 0.17,-0.92 0.35,-1.84 0.48,-2.76 0.13,-0.91 0.19,-1.83 0.29,-2.74 -0.93,2.05 -1.12,3.88 -0.75,5.5l0 0 -0.03 0.03 0 0zm23.28 -5.11c-0.04,-0.65 -0.07,-1.3 -0.11,-2.01 1.34,0.86 2.13,2.62 1.77,3.93 -0.42,1.53 -1.23,2.78 -2.62,3.66 -2.88,1.84 -5.86,3.09 -9.39,3.35 -6.33,0.48 -12.22,-0.89 -17.97,-3.32 -3.91,-1.65 -7.36,-4.08 -10.7,-6.62 -2.3,-1.76 -4.44,-3.76 -5.89,-6.35 -1.32,-2.35 -1.04,-4.75 0.14,-6.96 0.87,-1.63 2.56,-2.47 4.25,-3.11 0.12,0.09 0.25,0.18 0.37,0.27 -0.57,1.81 -1.14,3.62 -1.71,5.43 1.87,-0.78 1.57,-3 3.13,-4.25 -0.51,1.48 -0.93,2.74 -1.35,3.98 0.89,0.41 1.15,-0.05 1.39,-0.68 0.43,-1.09 0.92,-2.15 1.39,-3.22 0.13,0.04 0.25,0.09 0.38,0.14 -0.41,1.24 -0.81,2.48 -1.22,3.74 0.86,0.33 1.05,-0.14 1.29,-0.65 0.64,-1.34 1.32,-2.66 1.98,-3.99 0.11,0.05 0.21,0.1 0.31,0.15 -0.57,1.5 -1.15,3 -1.76,4.6 1.46,0.25 1.33,-0.93 1.73,-1.52 0.47,-0.68 0.82,-1.45 1.23,-2.17 0.1,0.05 0.19,0.09 0.29,0.14 -0.47,1.21 -0.93,2.41 -1.4,3.62 0.14,0.07 0.29,0.15 0.44,0.22 1.03,-1.66 2.07,-3.33 3.11,-4.99 0.11,0.07 0.23,0.13 0.35,0.2 -0.77,1.49 -1.54,2.99 -2.3,4.47 0.16,0.14 0.23,0.27 0.33,0.29 0.22,0.05 0.46,0.05 0.69,0.07 0.63,-2.02 1.7,-3.7 3.09,-4.7 -0.81,1.67 -1.53,3.14 -2.29,4.71 4.23,0.85 8.44,1.49 12.4,3.26 2.41,-1.17 4.85,-2.34 7.42,-3.58 -1.88,-1.52 -3.91,-2.37 -5.94,-3.14 -2.06,-0.79 -4.19,-1.37 -6.29,-2.05 2.59,-0.75 10.54,2.39 12.7,5.02 0.28,-0.08 0.57,-0.15 0.84,-0.26 0.24,-0.11 0.46,-0.26 0.72,-0.41 -0.18,-0.24 -0.27,-0.39 -0.39,-0.52 -0.16,-0.17 -0.33,-0.35 -0.51,-0.49 -5.26,-4.12 -11.16,-6.39 -17.9,-6.32 -1.24,0.02 -2.49,-0.03 -3.73,0.03 -2.3,0.09 -4.63,0.07 -6.89,0.43 -2.44,0.38 -4.84,1.12 -7.01,2.41 -0.91,0.53 -1.62,1.21 -1.89,2.24 -0.45,1.71 -0.89,3.43 -1.26,5.16 -0.85,3.88 0.65,7.01 3.36,9.59 2.22,2.13 4.66,4.02 7,6.02 4.53,3.88 10,5.7 15.62,7.19 0.49,-0.41 0.96,-0.8 1.43,-1.2 0.05,0.06 0.1,0.12 0.15,0.17 -0.34,0.37 -0.67,0.74 -1.02,1.13 1.21,0.52 1.21,0.52 1.86,-0.03 0.58,-0.49 1.04,-1.17 2.22,-1.5 -0.85,0.95 -1.43,1.59 -2.1,2.35 1.55,0.56 2.12,-0.83 3.35,-1.23 -0.4,0.58 -0.67,0.97 -0.95,1.38 0.8,0.6 1.42,0.53 2.05,-0.18 0.75,-0.84 1.56,-1.63 2.36,-2.42 0.29,-0.27 0.63,-0.49 0.94,-0.74 0.06,0.08 0.12,0.16 0.17,0.23 -0.98,1.12 -1.97,2.25 -2.96,3.37 0.75,0.57 1.15,0.16 1.53,-0.22 1.04,-1.06 2.05,-2.14 3.09,-3.19 0.38,-0.39 0.79,-0.74 1.18,-1.11 0.07,0.08 0.15,0.16 0.22,0.24 -0.6,0.82 -1.21,1.64 -1.82,2.46 5.16,-2.17 9.75,-5.07 13.54,-9.01 -0.47,-2.42 0.22,-4.96 -1.76,-6.85 -2.39,0.11 -4.74,0.5 -7.16,1.71 1.18,0.48 1.69,1.98 3.16,1.12 -0.63,1.36 0.73,2.05 0.91,3.29 0.48,-0.43 0.82,-0.74 1.15,-1.05 -0.3,0.82 -0.61,1.63 -0.92,2.44 0.86,-0.67 1.42,-1.48 2.13,-2.15 0.77,-0.72 0.79,-1.33 0.05,-2.02l0 0zm-44.56 -10.83c0.61,-1.35 1.1,-2.42 1.58,-3.49 0.09,0.05 0.17,0.09 0.25,0.13 -0.35,1.03 -0.7,2.06 -1.18,3.45 0.64,-0.32 1.09,-0.4 1.17,-0.62 0.64,-1.62 1.2,-3.27 1.83,-5.05 -3.12,1.49 -4,2.77 -3.65,5.58l0 0zm46.71 3.22c-0.13,0.76 -0.25,1.42 -0.36,2.08 0.13,0.04 0.26,0.09 0.39,0.13 0.83,-0.7 0.7,-1.82 1.17,-2.83 -0.83,-0.21 -1.49,-0.37 -2.29,-0.58 -0.33,1.16 -0.62,2.2 -0.95,3.38 1.64,0.02 1.09,-1.57 2.04,-2.18l0 0zm-3.67 2.39c0.13,0.05 0.26,0.09 0.4,0.13 1.24,-0.89 1.2,-2.35 1.64,-4.07 -0.64,0.31 -1.15,0.39 -1.21,0.61 -0.34,1.09 -0.57,2.22 -0.83,3.33l0 0zm-32.08 16.48c0.19,1.21 0.33,2.1 0.51,3.3 0.78,-0.91 1.32,-1.54 1.95,-2.27 -0.87,-0.37 -1.51,-0.63 -2.46,-1.03zm37.81 -11.39c0.21,-0.9 0.37,-1.56 0.53,-2.24 -0.8,-0.36 -1.46,-0.65 -2.36,-1.05 0.67,1.2 1.19,2.14 1.83,3.29l0 0z"
                />
              </g>
            </svg>
          </ALink>
        </li>
        <li className="flex-1 hover:bg-black/10 flex">
          <ALink comp="#khitan" offset={50}>
            <svg
              fill="currentColor"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 245.01 245.01"
              className="w-8 h-8 lg:w-11 lg:h-11 mx-auto"
            >
              <path
                d="M244.914,188.109l-9.951-133.345c-0.39-5.22-4.738-9.256-9.973-9.256h-31.994v54.413h2.666c2.571,0,4.737,1.92,5.047,4.473
	l4.181,34.545c0.073,0.344,0.112,0.7,0.112,1.066c0,2.808-2.276,5.083-5.084,5.083c-0.005,0-0.013,0.001-0.02,0h-28.805
	c-1.455,0-2.84-0.623-3.805-1.711c-0.965-1.089-1.417-2.539-1.242-3.982l4.236-35c0.31-2.553,2.476-4.473,5.047-4.473h2.666V45.509
	H20c-5.234,0-9.583,4.036-9.973,9.256l-10,133.992c-0.207,2.773,0.751,5.509,2.644,7.547c1.892,2.039,4.548,3.197,7.329,3.197
	h224.99c0.008,0,0.016,0.001,0.02,0c5.523,0,10-4.478,10-10C245.01,189.028,244.978,188.564,244.914,188.109z"
              />
            </svg>
          </ALink>
        </li>
        <li className="flex-1 hover:bg-black/10 flex">
          <ALink offset={50} comp="#acara">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 lg:w-11 lg:h-11 mx-auto"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4m-5 4h5m9.5 7.5L16 16.25V14" />
                <path d="M22 16a6 6 0 1 1-12 0a6 6 0 0 1 12 0Z" />
              </g>
            </svg>
          </ALink>
        </li>
        <li className="flex-1 hover:bg-black/10 flex">
          <ALink offset={50} comp="#peta">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 lg:w-11 lg:h-11 mx-auto"
            >
              <path
                fill="currentColor"
                d="M12 4c2.2 0 4 1.8 4 4c0 2.1-2.1 5.5-4 7.9c-1.9-2.5-4-5.8-4-7.9c0-2.2 1.8-4 4-4m0-2C8.7 2 6 4.7 6 8c0 4.5 6 11 6 11s6-6.6 6-11c0-3.3-2.7-6-6-6m0 4c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m8 13c0 2.2-3.6 4-8 4s-8-1.8-8-4c0-1.3 1.2-2.4 3.1-3.2l.6.9c-1 .5-1.7 1.1-1.7 1.8c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5c0-.7-.7-1.3-1.8-1.8l.6-.9c2 .8 3.2 1.9 3.2 3.2Z"
              />
            </svg>
          </ALink>
        </li>
        <li className="flex-1 hover:bg-black/10 flex">
          <ALink comp="#galeri">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 lg:w-11 lg:h-11 mx-auto"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-9.56 12.91a.29.29 0 0 0 0 .1a9.83 9.83 0 0 0 1.79 3.32l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 9.46-6.78v-.08A9.89 9.89 0 0 0 22 12A10 10 0 0 0 12 2Zm0 18H5.41l.3-.29l8.41-8.42a1 1 0 0 1 1.4 0l3.62 3.6l.23.22A8 8 0 0 1 12 20Zm-7.46-5.13l1.58-1.58a1 1 0 0 1 1.41 0l.87.87l-2.72 2.74a7.67 7.67 0 0 1-1.14-2.03Zm15.41-2l-3-3a3 3 0 0 0-4.24 0l-2.89 2.89l-.88-.87a3 3 0 0 0-4.23 0l-.71.67A5.25 5.25 0 0 1 4 12a8 8 0 0 1 16 0a8.27 8.27 0 0 1 0 .86Z"
              />
            </svg>
          </ALink>
        </li>
        <li className="flex-1 hover:bg-black/10 flex">
          <ALink comp="#ucapan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-7 h-7 lg:w-9 lg:h-9 mx-auto"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1.133l.941.502A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765L2 3.133V2Zm0 2.267l-.47.25A1 1 0 0 0 1 5.4v.817l1 .6v-2.55Zm1 3.15l3.75 2.25L8 8.917l1.25.75L13 7.417V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.417Zm11-.6l1-.6V5.4a1 1 0 0 0-.53-.882L14 4.267v2.55ZM8 2.982C9.664 1.309 13.825 4.236 8 8C2.175 4.236 6.336 1.31 8 2.982Zm7 4.401l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734Z"
              />
            </svg>
          </ALink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
