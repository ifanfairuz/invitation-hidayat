import { FC } from "react";

interface PanelProps extends DivProps {
  aside?: JSX.Element;
}
const Panel: FC<PanelProps> = ({ title, children, aside, ...props }) => {
  return (
    <div
      {...props}
      className={
        "w-full max-w-5xl mx-auto bg-white shadow-lg border border-gray-200 rounded-lg " +
        (props.className || "")
      }
    >
      {(!!title || !!aside) && (
        <header className="inline-flex items-center w-full px-5 py-4 border-b border-gray-100 bg-main-400 rounded-t-lg">
          <h2 className="font-semibold text-main-00 text-lg">{title}</h2>
          <div className="ml-auto">{aside}</div>
        </header>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
};

export default Panel;
