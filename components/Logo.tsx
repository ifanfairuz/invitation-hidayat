import { DetailsHTMLAttributes, FC } from "react";
import Image, { ImageProps } from "next/image";

export interface LogoProps extends DetailsHTMLAttributes<HTMLSpanElement> {
  withLabel?: boolean;
  _label?: Partial<DetailsHTMLAttributes<HTMLParagraphElement>>;
  _image?: Partial<Omit<ImageProps, "src">>;
}

export const Logo: FC<LogoProps> = ({ withLabel, _label, ...props }) => {
  return (
    <span {...props} className={`relative ${props.className || ""}`}>
      <Image
        height={100 * 0.4}
        width={347.5 * 0.4}
        src="/logo.png"
        alt="Logo"
        style={{ objectFit: "fill" }}
      />
      <p className="text-center -mt-2 text-main-500 f-type text-3xl">
        inVitation
      </p>
    </span>
  );
};
