import { FC, PropsWithChildren } from "react";
import ScrollAnimationReal, {
  ScrollAnimationProps,
} from "react-animate-on-scroll";

const ScrollAnimation: FC<
  PropsWithChildren<ScrollAnimationProps & { disable?: boolean }>
> = ({ disable, ...props }) => {
  return <>{disable ? props.children : <ScrollAnimationReal {...props} />}</>;
};

export default ScrollAnimation;
