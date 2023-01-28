import Image from "next/image";
import {
  ButtonHTMLAttributes,
  FC,
  Fragment,
  HTMLAttributes,
  useMemo,
  useState,
} from "react";
import ScrollAnimation from "@components/ScrollAnimation";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface GalleryData extends Object {
  src: string;
  className?: string;
  image?: any;
  image_big?: any;
}

interface GalleryItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: GalleryData;
  i: number;
}
const GalleryItem: FC<GalleryItemProps> = ({ data, i, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className={
        "hover:shadow-2xl px-0 py-0 transition-all duration-300 rounded-xl " +
        (data.className || "")
      }
    >
      <ScrollAnimation
        animateIn="fadeIn"
        animateOut="fadeOut"
        animatePreScroll={false}
        animateOnce={true}
        offset={0}
        className="w-full h-full"
      >
        <div className="relative overflow-hidden rounded-xl w-full h-full">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={data.image || require(`../gallery/${data.src}`)}
            alt={"galeri-" + i}
            loading="lazy"
            placeholder="blur"
            sizes="lg"
          />
        </div>
      </ScrollAnimation>
    </button>
  );
};

interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  datas: GalleryData[];
}
const Gallery: FC<GalleryProps> = ({ datas, ...props }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images: GalleryData[] = useMemo(
    () =>
      datas.map((d) => ({
        ...d,
        image: require(`../gallery/${d.src}`).default,
        image_big: require(`../gallery/big/${d.src}`).default,
      })),
    [datas]
  );

  const onOpen = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <Fragment>
      <div
        {...props}
        className={"grid grid-cols-6 gap-2 lg:gap-4 " + (props.className || "")}
      >
        {datas.map((d, i) => (
          <GalleryItem key={d.src} data={d} i={i} onClick={() => onOpen(i)} />
        ))}
      </div>
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        slides={images.map((i) => i.image_big!) as any}
        render={{
          slide: (image, offset, rect) => {
            const img_h = image.height || 0;
            const img_w = image.width || 0;
            const width = Math.round(
              Math.min(rect.width, (rect.height / img_h) * img_w)
            );
            const height = Math.round(
              Math.min(rect.height, (rect.width / img_w) * img_h)
            );

            return (
              <div style={{ position: "relative", width, height }}>
                <Image
                  fill
                  src={image as any}
                  loading="lazy"
                  alt={image.alt || ""}
                  placeholder="blur"
                  sizes={
                    typeof window !== "undefined"
                      ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
                      : `${width}px`
                  }
                />
              </div>
            );
          },
        }}
      />
    </Fragment>
  );
};

export default Gallery;
