import { FC, HTMLAttributes } from "react";
import ScrollAnimation from "@components/ScrollAnimation";

export interface TimelineData extends Record<string, any> {
  date: string;
  time: string;
  title: string;
  desc?: string;
}

interface ItemProps {
  data: TimelineData;
  right?: boolean;
}
const Item: FC<ItemProps> = ({ data, right }) => {
  return (
    <div className="my-8 flex items-center gap-4 relative">
      <div className="z-20 order-1 bg-main-00 py-2 text-center w-5/12">
        <ScrollAnimation
          animateIn="fadeInLeft"
          animatePreScroll={false}
          className="mx-auto"
          offset={0}
        >
          <p className="mx-auto font-medium text-md md:text-lg lg:text-xl f-cinzel">
            {data.date}
          </p>
          <p className="mx-auto font-medium text-sm md:text-md lg:text-lg f-cinzel">
            {data.time}
          </p>
        </ScrollAnimation>
      </div>
      <ScrollAnimation
        animateIn="fadeInRight"
        animatePreScroll={false}
        className="flex-1 order-1"
        offset={0}
      >
        <div className="bg-main-500 rounded-lg shadow-xl px-6 py-4">
          <h3 className="text-main-50 text-md md:text-lg lg:text-xl f-cinzel">
            {data.title}
          </h3>
          {!!data.desc && (
            <p className="text-main-50 text-sm md:text-md lg:text-lg f-sans font-light">
              {data.desc}
            </p>
          )}
        </div>
      </ScrollAnimation>
    </div>
  );
};

interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  datas: TimelineData[];
}
const Timeline: FC<TimelineProps> = ({ datas, ...props }) => {
  return (
    <div
      {...props}
      className={
        "relative wrap overflow-hidden h-full " + (props.className || "")
      }
    >
      <div className="flex items-center gap-4 absolute h-full w-5/12">
        <div className="border-2-2 border-opacity-20 border-main-800 h-full border absolute left-[50%]"></div>
      </div>

      {datas.map((d, i) => (
        <Item key={i} data={d} />
      ))}
    </div>
  );
};

export default Timeline;
