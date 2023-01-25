import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export interface NotificationNavigationProps extends DivProps {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}
export const NotificationNavigation: FC<NotificationNavigationProps> = ({
  open,
  onOpenChange,
  ...props
}) => {
  const notificationMenuRef = useRef<HTMLDivElement>();
  const toggleNotification = () => {
    onOpenChange && onOpenChange(!open);
  };

  return (
    <div {...props} className={`ml-3 relative ${props.className || ``}`}>
      <button
        onClick={toggleNotification}
        type="button"
        className="p-1 rounded-full text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        <span className="sr-only">View notifications</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      <CSSTransition
        in={open}
        nodeRef={notificationMenuRef}
        unmountOnExit
        classNames={{
          enter: "transition ease-out duration-100",
          enterDone: "transform opacity-0 scale-0",
          enterActive: "transform opacity-100 scale-100",
          exit: "transition ease-in duration-75",
          exitDone: "transform opacity-100 scale-100",
          exitActive: "transform opacity-0 scale-0",
        }}
        addEndListener={() => {}}
      >
        <div
          ref={notificationMenuRef as any}
          className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        ></div>
      </CSSTransition>
    </div>
  );
};
