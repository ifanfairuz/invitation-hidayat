import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  LiHTMLAttributes,
  SVGAttributes,
} from "react";

declare global {
  type RecordValue<R extends Record<K, V>> = V;

  interface DivProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
  interface LiProps
    extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {}
  interface PProps
    extends DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    > {}
  interface AProps
    extends DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > {}
  interface ButtonProps
    extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}
  interface NavProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
  interface SvgProps extends SVGAttributes<SVGSVGElement> {}

  interface PageProps {
    initialStore: Store.InitialStore;
  }
}
