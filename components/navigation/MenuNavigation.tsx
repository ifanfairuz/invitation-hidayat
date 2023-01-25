import { ExoticComponent, FC, Fragment, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface MenuNavigationItemProps extends AProps {
  active?: boolean;
}
export const MenuNavigationItem: ExoticComponent<MenuNavigationItemProps> =
  memo(
    (({ menu, active, ...props }) => {
      return (
        <Link legacyBehavior href={menu.link} shallow>
          <a aria-current={active ? "page" : undefined} {...props}>
            {menu.title}
          </a>
        </Link>
      );
    }) as FC<MenuNavigationItemProps>,
    (prev, next) => prev.active === next.active
  );

export interface MenuNavigationProps {
  mobile?: boolean;
}
const MenuNavigationComponent: FC<MenuNavigationProps> = ({ mobile }) => {
  const router = useRouter();
  const classNameAdditional = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium"
    : "px-3 py-2 rounded-md text-sm font-medium";
  return <Fragment></Fragment>;
};
export const MenuNavigation = MenuNavigationComponent;
