import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export interface ContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Content: FC<ContentProps> = ({ children, ...props }) => {
  return (
    <main
      {...props}
      className={`bg-white text-gray-800 ${props.className || ""}`}
    >
      {children}
    </main>
  );
};
