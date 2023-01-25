import { createRef, FC, useEffect, useState } from "react";
import { UserMenuNavigation } from "@components/navigation/index";
import { Logo } from "@components/Logo";

export interface HeaderSidebarProps {
  menuOpen?: boolean;
  defaultUserMenuOpen?: boolean;
  onMenuChange?: (open: boolean) => void;
}
export const HeaderSidebarComponent: FC<HeaderSidebarProps> = ({
  menuOpen,
  defaultUserMenuOpen,
  onMenuChange,
}) => {
  const navComp = createRef<HTMLElement>();
  const [navFixed, setNavFixed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(!!defaultUserMenuOpen);

  const toggleMenu = () => {
    const open = !menuOpen;
    onMenuChange && onMenuChange(open);
  };
  const toggleUserMenu = (open: boolean) => {
    setUserMenuOpen(open);
  };
  const closeAll = () => {
    setUserMenuOpen(false);
  };

  useEffect(() => {
    menuOpen
      ? navComp.current?.classList.add("navigation-open")
      : navComp.current?.classList.remove("navigation-open");
    navFixed
      ? navComp.current?.classList.add("fix")
      : navComp.current?.classList.remove("fix");
  }, [menuOpen, navFixed, navComp]);

  useEffect(() => {
    const onScroll = (e: Event) => setNavFixed(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="relative z-30 h-[64px] shadow">
      {!!userMenuOpen && (
        <div className="fixed w-screen h-screen" onClick={closeAll} />
      )}
      <nav ref={navComp} className="header">
        <div className="nav-container max-w-7xl mx-auto">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
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
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"></div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <UserMenuNavigation
                open={userMenuOpen}
                onOpenChange={toggleUserMenu}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export const HeaderSidebar = HeaderSidebarComponent;
