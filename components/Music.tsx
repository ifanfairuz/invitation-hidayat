import {
  ForwardRefExoticComponent,
  RefAttributes,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Pause, PlayOne } from "@icon-park/react";

export interface MusicComp {
  play: () => Promise<void> | undefined;
  pause: () => void | undefined;
  toggle: () => Promise<void> | void;
}
const Music: ForwardRefExoticComponent<RefAttributes<MusicComp>> =
  forwardRef<MusicComp>((props, ref) => {
    const music = createRef<HTMLAudioElement>();
    const box = createRef<HTMLDivElement>();
    const [playing, setPlaying] = useState(false);

    const play = () => music.current?.play();
    const pause = () => music.current?.pause();
    const toggle = () =>
      playing ? music.current?.pause() : music.current?.play();

    useEffect(() => {
      if (music.current) {
        music.current.volume = 0.8;
        music.current.addEventListener("playing", () => setPlaying(true));
        music.current.addEventListener("pause", () => setPlaying(false));
      }
    }, [music]);

    useImperativeHandle(ref, () => ({
      play,
      pause,
      toggle,
    }));

    return (
      <div
        ref={box}
        className="fixed h-14 w-14 lg:h-16 lg:w-16 text-main-50 transition-all duration-300 z-20 top-4 left-4 lg:top-auto lg:bottom-8 lg:left-8 mx-auto rounded-xl flex shadow-lg rounded-full bg-main-200 p-2"
      >
        <div
          className={
            "absolute w-[75%] h-[75%] bg-main-200 rounded-full z-10 opacity-70 inset-0 m-auto" +
            (playing ? " animate-ping" : "")
          }
        ></div>
        <div className="relative z-20 bg-main-500 w-full h-full flex items-center justify-center rounded-full">
          <button className="rounded-full" onClick={toggle}>
            {playing ? (
              <Pause className="text-xl lg:text-2xl" />
            ) : (
              <PlayOne className="text-xl lg:text-2xl" />
            )}
          </button>
        </div>
        <audio ref={music} loop preload="auto" src="/music.m4a"></audio>
      </div>
    );
  });
Music.displayName = "Music";

export default Music;
