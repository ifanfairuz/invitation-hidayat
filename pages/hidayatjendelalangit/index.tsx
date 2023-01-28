import { createRef } from "react";
import Head from "next/head";
import { Cover } from "@components/Cover";
import Person from "@components/Person";
import Counter from "@components/Counter";
import Timeline from "@components/Timeline";
import Gallery from "@components/Gallery";
import ScrollAnimation from "react-animate-on-scroll";
import Image from "next/image";
import { MapDraw } from "@icon-park/react";
import Comment from "@components/Comment";
import Navigation from "@components/Navigation";
import Music, { MusicComp } from "@components/Music";
import { GetServerSideProps } from "next";
import { getTamuByUsername } from "@repo/tamu";
import { Tamu } from "@prisma/client";
import { useStaticBackground } from "@components/hooks";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = new URL(req.url || "", `https://${req.headers.host}`);
  const username = url.searchParams.get("name");
  if (username) {
    const tamu = await getTamuByUsername(username);
    if (tamu) {
      return { props: { tamu } };
    }
  }
  return { notFound: true };
};

const timeline = [
  { date: "05 Februari 2023", time: "07:00 - 19:00", title: "Ramah Tamah" },
  { date: "06 Februari 2023", time: "07:00 - 12:00", title: "Orkes Dangdut" },
  {
    date: "06 Februari 2023",
    time: "12:00 - 16:00",
    title: "Hiburan Rakyat",
    desc: "Uyon-Uyon & Ujungan",
  },
  { date: "06 Februari 2023", time: "16:00 - 18:00", title: "Resepsi" },
  { date: "06 Februari 2023", time: "18:00 - 19:00", title: "Ramah Tamah" },
  { date: "06 Februari 2023", time: "19:00 - 20:00", title: "Campursari" },
  { date: "06 Februari 2023", time: "20:00 - selesai", title: "Wayang Kulit" },
];
const gallery = [
  { src: "w-3.jpg", className: "col-span-4" },
  { src: "p-3.jpg", className: "col-span-2 row-span-2" },
  { src: "p-2.jpg", className: "col-span-2 row-span-2" },
  { src: "p-1.jpg", className: "col-span-2" },
  { src: "p-4.jpg", className: "col-span-2" },
  { src: "w-1.jpg", className: "col-span-2" },
  { src: "w-4.jpg", className: "col-span-3" },
  { src: "w-2.jpg", className: "col-span-3" },
];

const Invitation: UnauthedPage<{ tamu: Tamu }> = ({ tamu }) => {
  const main = createRef<HTMLElement>();
  const music = createRef<MusicComp>();
  const onOpen = () => {
    document.body.classList.add("open");
    main.current?.classList.remove("closed");
    music.current?.play();
  };
  const staticBackground = useStaticBackground();

  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Head>
        <title>Undangan Keluarga Bpk.Hidayat/Ibu.Wati</title>
        <meta
          name="description"
          content="Undangan Keluarga Bpk.Hidayat/Ibu.Wati"
        />
        <style>
          {`
          body #content {
            height: 0;
            overflow: hidden;
          }
          body.open #content {
            height: auto;
            overflow: auto;
          }
          `}
        </style>
      </Head>
      <main ref={main} id="main" className="closed">
        <Cover onOpen={onOpen} tamu={tamu} />
        <div id="content">
          <div
            className="bg-1 flex relative z-0"
            style={staticBackground["bg-1"]}
          >
            <div className="flex-1 bg-black/60">
              <div className="pt-6 pb-12 relative z-0">
                <div className="container mx-auto text-center text-white px-4 h-[85vh] md:h-[82vh] lg:h-[75vh] relative">
                  <div className="fixed inset-0 w-full h-72 my-auto">
                    <h1 className="text-xl md:text-2xl lg:text-3xl f-over mb-4">
                      Assalamualaikum Warahmatullahi Wabarakatuh
                    </h1>
                    <h4 className="text-lg md:text-xl lg:text-2xl f-sans font-light">
                      Maha suci Allah SWT yang telah menciptakan makhluk-Nya
                      berpasang-pasangan. <br /> Ya Allah, perkenankanlah kami
                      merangkai kasih sayang yang Kau ciptakan di antara
                      putra-putri kami
                    </h4>
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 1357 113.08"
                className="w-full relative z-1"
              >
                <g>
                  <polygon
                    fill="#F7F7F7"
                    points="-2.03,114.41 445.04,39.13 601.58,67.37 898.23,4.34 1357.74,114.41 "
                  />
                </g>
              </svg>
            </div>
          </div>
          <div
            className="min-h-screen bg-main-00 relative z-1 overflow-x-hidden -mt-[1px]"
            id="pengantin"
          >
            <div className="container mx-auto p-8">
              <div className="max-w-[900px] mx-auto flex flex-col gap-8 mb-8">
                <div className="grid grid-cols-2">
                  <ScrollAnimation
                    animateIn="fadeInLeft"
                    animateOut="fadeOutLeft"
                    animatePreScroll={false}
                  >
                    <Person
                      image={require("@public/img/dita.jpg")}
                      name="DITA"
                      fullname="Dita Dwi Kurniawati"
                      description="Putri dari Bapak Hidayat dan Ibu Wati"
                    />
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateIn="fadeInRight"
                    animateOut="fadeOutRight"
                    animatePreScroll={false}
                  >
                    <Person
                      image={require("@public/img/khoirul.jpg")}
                      name="KHOIRUL"
                      fullname="Khoirullah"
                      description="Putra dari Bapak Kasit dan Ibu Kastini"
                    />
                  </ScrollAnimation>
                </div>
                <hr />
                <div>
                  <ScrollAnimation
                    animateIn="fadeInDown"
                    animatePreScroll={false}
                  >
                    <h2 className="f-serif text-main-400 text-center text-lg md:text-xl lg:text-2xl mb-2">
                      RESEPSI
                    </h2>
                    <p className="f-cinzel text-main-800 text-center text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                      06 Februari 2023
                    </p>
                    <p className="f-cinzel text-main-800 text-center text-lg md:text-xl lg:text-2xl mb-2">
                      16:00 - 18:00
                    </p>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateIn="fadeInUp"
                    animatePreScroll={false}
                  >
                    <Counter />
                  </ScrollAnimation>
                </div>
              </div>
              <div
                className="container mx-auto p-8 bg-main-100 text-main-800 rounded-2xl shadow-lg relative overflow-hidden"
                id="khitan"
              >
                <ScrollAnimation
                  animateIn="fadeIn"
                  animateOut="fadeOut"
                  animatePreScroll={false}
                  offset={-200}
                >
                  <Image
                    src={require("@public/img/frame-c1.png")}
                    alt="frame"
                    className="absolute w-36 md:w-48 lg:w-64 -right-8 -top-10 z-0"
                    width={358}
                    height={467}
                  />
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn="fadeIn"
                  animateOut="fadeOut"
                  animatePreScroll={false}
                  offset={-200}
                >
                  <Image
                    src={require("@public/img/frame-c1.png")}
                    alt="frame"
                    className="absolute w-36 md:w-48 lg:w-64 left-0 -top-12 z-0 scale-x-[-1] scale-y-[-1] rotate-90"
                    width={358}
                    height={467}
                  />
                </ScrollAnimation>
                <div className="relative z-10">
                  <ScrollAnimation
                    animateIn="fadeInDown"
                    animateOut="fadeOutUp"
                    animatePreScroll={false}
                    offset={0}
                  >
                    <h2 className="f-over text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
                      KHITAN
                    </h2>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="fadeIn" animatePreScroll={false}>
                    <Person
                      image={require("@public/img/safian.jpg")}
                      name="SAFIAN"
                      fullname="Safian Cahya Pratama"
                      description="Putra dari Bapak Hidayat dan Ibu Wati"
                      borderType="100"
                    />
                  </ScrollAnimation>
                </div>
                <ScrollAnimation
                  animateIn="fadeIn"
                  animateOut="fadeOut"
                  animatePreScroll={false}
                >
                  <Image
                    src={require("@public/img/frame-c2.png")}
                    alt="frame"
                    className="absolute w-36 md:w-48 lg:w-64 -left-10 -bottom-8 z-0"
                    width={403}
                    height={491}
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  animateIn="fadeIn"
                  animateOut="fadeOut"
                  animatePreScroll={false}
                >
                  <Image
                    src={require("@public/img/frame-c2.png")}
                    alt="frame"
                    className="absolute w-36 md:w-48 lg:w-64 right-0 -bottom-12 z-0 scale-x-[-1] scale-y-[-1] rotate-90"
                    width={403}
                    height={491}
                  />
                </ScrollAnimation>
              </div>
            </div>
            <div className="container mx-auto p-8 bg-main-00 flex flex-col lg:flex-row gap-16 lg:gap-8">
              <Timeline datas={timeline} className="lg:w-5/12" id="acara" />
              <div
                className="flex-1 flex bg-main-100 rounded-xl shadow-2xl overflow-hidden min-h-[200px]"
                id="peta"
              >
                <div className="grid grid-rows-3 flex-1">
                  <div className="p-4 flex flex-col justify-center items-center gap-4">
                    <h3 className="f-sans text-lg md:text-xl lg:text-2xl text-center text-main-800">
                      Rumah Kediaman Bapak Hidayat <br /> Dsn.Tegal kidul, Desa
                      Jatiarjo Kec. Prigen
                    </h3>
                    <a
                      href="https://maps.google.com/maps/dir//Kedai+gumandar+7M47%2BHQP+Tegal+Kidul,+Jatiarjo+Kec.+Prigen,+Pasuruan,+Jawa+Timur+67157/@-7.7435577,112.6644786,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x2dd7d7a48d97ad1d:0x51bff73388cd7ca1"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-md f-sans bg-main-500 hover:bg-main-400 text-main-00 flex items-center gap-2 text-md flex items-center gap-1"
                      onClick={onOpen}
                    >
                      <MapDraw />
                      Buka Peta
                    </a>
                  </div>
                  <div className="row-span-2 min-h-[200px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.4357060652383!2d112.6622743150781!3d-7.7435230789123555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7d7a48d97ad1d%3A0x51bff73388cd7ca1!2sKedai%20gumandar!5e0!3m2!1sid!2sid!4v1673866131003!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="flex-1"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-main-00 h-[30rem]"></div>
            <div className="bg-main-500" id="main-first">
              <div
                className="container mx-auto px-8 py-8 max-w-[1000px] relative -top-[30rem]"
                id="galeri"
              >
                <ScrollAnimation
                  animateIn="fadeInDown"
                  animateOut="fadeOutUp"
                  animatePreScroll={false}
                  offset={0}
                >
                  <h2 className="f-over text-center text-2xl md:text-3xl lg:text-4xl font-bold text-main-800 mb-8">
                    GALERI
                  </h2>
                </ScrollAnimation>
                <div className="flex-1 min-h-[150vw] lg:min-h-[95vh] bg-white shadow-xl flex p-4 rounded-2xl">
                  <Gallery datas={gallery} className="flex-1" />
                </div>
              </div>
            </div>
            <div className="bg-main-500" id="ucapan">
              <div className="container mx-auto px-8 py-12 -mt-[30rem]">
                <ScrollAnimation
                  animateIn="fadeInDown"
                  animateOut="fadeOutUp"
                  animatePreScroll={false}
                  offset={0}
                >
                  <h2 className="f-over text-center text-2xl md:text-3xl lg:text-4xl font-bold text-main-00 mb-8">
                    KIRIM UCAPAN
                  </h2>
                </ScrollAnimation>
                <Comment name={tamu.name} tamuid={tamu.id} />
              </div>
            </div>
            <div className="bg-1 flex" style={staticBackground["bg-1"]}>
              <div className="flex-1 bg-black/60 pt-24 pb-24">
                <div className="container mx-auto text-center text-white p-8">
                  <p className="text-lg md:text-xl lg:text-2xl f-sans font-light mb-8">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami,
                    <br />
                    {
                      "apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikando'a restu."
                    }
                  </p>
                  <h1 className="text-lg md:text-xl lg:text-2xl f-cinzel mb-2 font-bold">
                    Terima Kasih
                  </h1>
                  <p className="text-md md:text-lg lg:text-xl f-sans font-light mb-8">
                    Keluarga Besar <br /> Bpk Hidayat & Ibu Wati
                  </p>

                  <h1 className="text-lg md:text-xl lg:text-2xl f-over mb-8">
                    Wassalamualaikum Warahmatullahi Wabarakatuh
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <Music ref={music} />
          <Navigation />
        </div>
      </main>
    </>
  );
};

export default Invitation;
