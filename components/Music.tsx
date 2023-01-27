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

    const play = () =>
      music.current?.play()?.catch((error) => {
        document.addEventListener(
          "click",
          () => {
            play();
          },
          { once: true }
        );
      });
    const pause = () => music.current?.pause();
    const toggle = () =>
      playing ? music.current?.pause() : music.current?.play();

    useEffect(() => {
      if (music.current) {
        music.current.volume = 0.8;
        music.current.addEventListener("playing", () => setPlaying(true));
        music.current.addEventListener("pause", () => setPlaying(false));
      }
    }, []);

    useImperativeHandle(ref, () => ({
      play,
      pause,
      toggle,
    }));

    return (
      <div
        ref={box}
        className="fixed h-14 w-14 lg:h-16 lg:w-16 bg-main-500 text-main-50 transition-all duration-300 z-20 top-4 left-4 lg:top-8 lg:left-8 mx-auto rounded-xl flex shadow-lg rounded-full border-8 border-main-200 flex items-center justify-center"
      >
        <button className="rounded-full" onClick={toggle}>
          {playing ? (
            <Pause className="text-xl lg:text-2xl" />
          ) : (
            <PlayOne className="text-xl lg:text-2xl" />
          )}
        </button>
        <audio
          ref={music}
          loop
          preload="auto"
          autoPlay
          src="/music.ogg"
        ></audio>
      </div>
    );
  });

export default Music;
