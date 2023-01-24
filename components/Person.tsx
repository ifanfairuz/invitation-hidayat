import Image from "next/image";
import { FC } from "react";

interface PersonProps {
  image: string;
  name: string;
  fullname: string;
  description: string;
  nameClass?: string;
  borderType?: string;
}
const Person: FC<PersonProps> = (props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div
          className={`img-bordered ${
            props.borderType ? "img-bordered-" + props.borderType : ""
          } p-2`}
        >
          <Image
            src={props.image}
            alt="Dita"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="text-center flex-1 flex flex-col">
        <p
          className={`f-sans text-lg md:text-xl lg:text-2xl text-main-400 font-bold ${
            props.nameClass || ""
          }`}
        >
          {props.name}
        </p>
        <p className="f-type text-2xl md:text-3xl lg:text-4xl mt-auto">
          {props.fullname}
        </p>
        <p className="f-sans text-sm md:text-md lg:text-lg opacity-70 mt-auto">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Person;
