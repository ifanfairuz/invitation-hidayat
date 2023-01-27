import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export interface UserMenuNavigationProps extends DivProps {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}
const UserMenuNavigationComponent: FC<UserMenuNavigationProps> = ({
  open,
  onOpenChange,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement>();
  const toggleDropDown = () => {
    onOpenChange && onOpenChange(!open);
  };
  const logout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === "OK") window.location.assign("/login");
      });
  };

  return (
    <div {...props} className={`ml-3 relative ${props.className || ``}`}>
      <div>
        <button
          onClick={toggleDropDown}
          type="button"
          className="bg-main-400 flex text-sm rounded-full focus:outline-none p-2"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 15 15"
            className="text-main-50"
          >
            <path
              fill="currentColor"
              d="M3 13v.5h1V13H3Zm8 0v.5h1V13h-1Zm-7 0v-.5H3v.5h1Zm2.5-3h2V9h-2v1Zm4.5 2.5v.5h1v-.5h-1ZM8.5 10a2.5 2.5 0 0 1 2.5 2.5h1A3.5 3.5 0 0 0 8.5 9v1ZM4 12.5A2.5 2.5 0 0 1 6.5 10V9A3.5 3.5 0 0 0 3 12.5h1ZM7.5 3A2.5 2.5 0 0 0 5 5.5h1A1.5 1.5 0 0 1 7.5 4V3ZM10 5.5A2.5 2.5 0 0 0 7.5 3v1A1.5 1.5 0 0 1 9 5.5h1ZM7.5 8A2.5 2.5 0 0 0 10 5.5H9A1.5 1.5 0 0 1 7.5 7v1Zm0-1A1.5 1.5 0 0 1 6 5.5H5A2.5 2.5 0 0 0 7.5 8V7Zm0 7A6.5 6.5 0 0 1 1 7.5H0A7.5 7.5 0 0 0 7.5 15v-1ZM14 7.5A6.5 6.5 0 0 1 7.5 14v1A7.5 7.5 0 0 0 15 7.5h-1ZM7.5 1A6.5 6.5 0 0 1 14 7.5h1A7.5 7.5 0 0 0 7.5 0v1Zm0-1A7.5 7.5 0 0 0 0 7.5h1A6.5 6.5 0 0 1 7.5 1V0Z"
            />
          </svg>
        </button>
      </div>

      <CSSTransition
        in={open}
        nodeRef={menuRef}
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
          ref={menuRef as any}
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <button
            onClick={logout}
            className="w-full text-left block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="btn-logout"
          >
            Sign out
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export const UserMenuNavigation = UserMenuNavigationComponent;
