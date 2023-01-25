import { FC, PropsWithChildren, ReactNode, useState } from "react";
import Link, { LinkProps } from "next/link";
import { Url } from "url";
import { Logo } from "@components/Logo";

interface LinkWrapperProps extends PropsWithChildren<Omit<LinkProps, "href">> {
  href?: Url;
  wrap?: boolean;
}
const LinkWrapper: FC<LinkWrapperProps> = ({
  children,
  wrap,
  href,
  ...props
}) => {
  return wrap ? (
    <Link legacyBehavior href={href!} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export interface SidebarItemProps extends LiProps {
  href?: Url | string;
  child?: { href: Url | string; title: string }[];
  title: string;
  icon?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export const SidebarItem: FC<SidebarItemProps> = ({
  child,
  href,
  title,
  icon,
  open,
  onOpenChange,
  ...props
}) => {
  const [state, setState] = useState(!!open);
  const toggleOpen = () => {
    const openend = !state;
    setState(openend);
    onOpenChange && onOpenChange(openend);
  };

  return (
    <li className="relative" {...props}>
      <LinkWrapper href={child ? undefined : (href as Url)} wrap={!child}>
        <a
          onClick={toggleOpen}
          className="flex gap-3 items-center text-sm py-4 px-5 h-12 mb-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-full text-gray-100 hover:text-gray-800 bg-blue-500 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer shadow-lg"
        >
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
          {!!child && (
            <svg
              aria-hidden="true"
              focusable="false"
              className={`w-3 h-3 ml-auto transition ease-out ${
                !state ? "-rotate-90" : ""
              }`}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
              ></path>
            </svg>
          )}
        </a>
      </LinkWrapper>
      {!!child && (
        <ul
          className={`relative overflow-hidden transition-all ease-in-out ${
            !state ? "h-0" : ""
          }`}
        >
          {child.map((c, i) => (
            <li className="relative" key={`${c.title}-${i}`}>
              <LinkWrapper wrap href={c.href as Url}>
                <a className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded text-gray-600 hover:text-gray-800 hover:bg-blue-50 transition duration-300 ease-in-out">
                  {c.title}
                </a>
              </LinkWrapper>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export interface SidebarProps extends DivProps {
  hide?: boolean;
}
export const SidebarComponent: FC<SidebarProps> = ({
  hide,
  className,
  ...props
}) => {
  return (
    <div
      className={`w-72 h-full bg-white absolute z-20 shadow md:static shadow-lg ${
        className ?? ""
      } ${hide ? "-left-72" : "left-0"}`}
      {...props}
    >
      <div className="flex justify-center px-2 py-6 mx-4 mb-2">
        <Logo withLabel />
      </div>
      <ul className="relative px-4">
        <SidebarItem
          href="/dashboard"
          title="Dashboard"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect
                x="48"
                y="48"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <rect
                x="288"
                y="48"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <rect
                x="48"
                y="288"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <rect
                x="288"
                y="288"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
          }
        />
        <SidebarItem
          href="/dashboard/tamu"
          title="Tamu Undangan"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M248.8 146.4a7.7 7.7 0 0 1-4.8 1.6a8 8 0 0 1-6.4-3.2A51.6 51.6 0 0 0 196 124a8 8 0 0 1 0-16a24 24 0 1 0-23.6-28.5a8 8 0 1 1-15.7-3a40 40 0 1 1 66.3 37a67.8 67.8 0 0 1 27.4 21.7a8 8 0 0 1-1.6 11.2Zm-56 66.1a8.1 8.1 0 0 1-3.7 10.7a9.3 9.3 0 0 1-3.5.8a8.1 8.1 0 0 1-7.2-4.5a56.1 56.1 0 0 0-100.8 0a8 8 0 0 1-10.7 3.7a8.1 8.1 0 0 1-3.7-10.7a72.1 72.1 0 0 1 35.6-34.4a48 48 0 1 1 58.4 0a72.1 72.1 0 0 1 35.6 34.4ZM128 172a32 32 0 1 0-32-32a32.1 32.1 0 0 0 32 32Zm-60-56a8 8 0 0 0-8-8a24 24 0 1 1 23.6-28.5a8 8 0 1 0 15.7-3a40 40 0 1 0-66.3 37a67.8 67.8 0 0 0-27.4 21.7a8 8 0 0 0 1.6 11.2A7.7 7.7 0 0 0 12 148a8 8 0 0 0 6.4-3.2A51.6 51.6 0 0 1 60 124a8 8 0 0 0 8-8Z"
              />
            </svg>
          }
        />
        <SidebarItem
          href="/dashboard/ucapan"
          title="Ucapan"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="1em"
              height="1em"
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
          }
        />
      </ul>
    </div>
  );
};

export const Sidebar = SidebarComponent;
