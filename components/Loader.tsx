import { FC, SVGProps } from "react";

const Loader: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "auto" }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        fill="currentColor"
        stroke="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51;360 50 51"
        ></animateTransform>
      </path>
    </svg>
  );
};

export default Loader;
