import { Tamu } from "@prisma/client";
import Image from "next/image";
import { FC, MouseEventHandler } from "react";
import ScrollAnimation from "@components/ScrollAnimation";
import { useStaticBackground } from "./hooks";

export const Cover: FC<{
  onOpen: MouseEventHandler<HTMLButtonElement>;
  tamu: Tamu;
}> = ({ onOpen, tamu }) => {
  const staticBackground = useStaticBackground();
  return (
    <div className="cover w-full bg-main-50 z-50 overflow-hidden">
      <ScrollAnimation offset={0} animateIn="fadeIn">
        <Image
          src={require("@public/img/frame-c1.png")}
          alt="frame"
          className="absolute w-44 md:w-64 lg:w-80 right-0 top-0 z-0"
          width={358}
          height={467}
        />
      </ScrollAnimation>
      <ScrollAnimation offset={0} animateIn="fadeIn">
        <Image
          src={require("@public/img/frame-c2.png")}
          alt="frame"
          className="absolute w-44 md:w-64 lg:w-80 left-0 bottom-0 z-0"
          width={403}
          height={491}
        />
      </ScrollAnimation>
      <ScrollAnimation offset={0} animateIn="fadeIn">
        <Image
          src={require("@public/img/frame-c1.png")}
          alt="frame"
          className="absolute w-36 md:w-56 lg:w-72 left-0 -top-12 z-0 scale-x-[-1] scale-y-[-1] rotate-90"
          width={358}
          height={467}
        />
      </ScrollAnimation>
      <ScrollAnimation offset={0} animateIn="fadeIn">
        <Image
          src={require("@public/img/frame-c2.png")}
          alt="frame"
          className="absolute w-36 md:w-56 lg:w-72 right-0 -bottom-12 z-0 scale-x-[-1] scale-y-[-1] rotate-90"
          width={403}
          height={491}
        />
      </ScrollAnimation>
      <div className="container mx-auto h-screen min-h-[650px] flex flex-col justify-center py-4 px-4 md:px-0 gap-4 relative z-1">
        <div className="text-main-800 mb-4">
          <h2 className="f-serif text-xl md:text-2xl lg:text-3xl text-center tracking-widest">
            UNDANGAN
          </h2>
          <p className="f-serif text-md md:text-lg lg:text-xl text-center italic">
            Keluarga Bpk.Hidayat/Ibu.Wati
          </p>
        </div>
        <div className="relative py-20 md:py-24 lg:py-32">
          <ScrollAnimation offset={0} animateIn="fadeIn">
            <div
              className="framed absolute h-full w-full mx-auto top-0 z-0"
              style={staticBackground.framed}
            ></div>
          </ScrollAnimation>
          <div className="flex flex-col gap-4 relative z-1 -mt-2">
            <div>
              <p className="f-serif text-center">PERNIKAHAN</p>
              <h1 className="f-type text-center text-3xl md:text-4xl lg:text-5xl text-main-800">
                Dita
                <span className="text-xl md:text-2xl lg:text-3xl mx-2">
                  {" & "}
                </span>
                Khoirul
              </h1>
            </div>
            <div>
              <p className="f-serif text-center">KHITANAN</p>
              <h1 className="f-type text-center text-4xl md:text-5xl lg:text-6xl text-main-800">
                Safian
              </h1>
            </div>
            <h1 className="f-cinzel text-center text-xl md:text-2xl lg:text-3xl text-main-800 mt-4">
              05-06 Februari 2023
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center py-4 text-main-900 -mt-5">
          <div className="mb-4 text-center f-sans text-sm md:text-md lg:text-lg px-4 py-2 rounded-lg">
            <p className="border-b border-black px-2">
              Kepada Yth. Bapak/Ibu :
            </p>
            <div className="min-h-[50px] min-w-[200px] max-w-[300px] font-bold flex items-center px-2">
              <p className="text-center flex-1">{tamu.name}</p>
            </div>
          </div>
          <button
            type="button"
            className="f-sans bg-main-500 text-main-00 flex items-center gap-2 text-md animated pulse infinite"
            onClick={onOpen}
          >
            BUKA UNDANGAN
          </button>
        </div>
      </div>
    </div>
  );
};
