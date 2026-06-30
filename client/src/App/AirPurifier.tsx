import type { CSSProperties, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import SmartAirOne from "../assets/allClients/Smart Air 1.webp";
import SmartAirTwo from "../assets/allClients/Smart Air 2.webp";
import SmartAirThree from "../assets/allClients/Smart Air 3.webp";
import SmartAirFour from "../assets/allClients/Smart Air 4.webp";
import SmartAirFive from "../assets/allClients/Smart Air 5.webp";
import BrandStoryOne from "../assets/airPurifier/brandStory/01.png";
import BrandStoryTwo from "../assets/airPurifier/brandStory/02.png";
import BrandStoryThree from "../assets/airPurifier/brandStory/03.png";
import BrandStoryFour from "../assets/airPurifier/brandStory/04.png";
import BrandStoryFive from "../assets/airPurifier/brandStory/05.png";
import BrandStorySix from "../assets/airPurifier/brandStory/06.png";
import BrandStorySeven from "../assets/airPurifier/brandStory/07.png";
import BrandStoryEight from "../assets/airPurifier/brandStory/08.png";
import BrandStoryNine from "../assets/airPurifier/brandStory/09.png";
import BrandStoryTen from "../assets/airPurifier/brandStory/10.png";
import AdditionalShadow from "../assets/airPurifier/brandStory/Additional shadow.webp";
import BrandStoryBackdrop from "../assets/airPurifier/brandStory/Backdrop.png";
import HeroVideo from "../assets/airPurifier/hero-transparent.webm";
import SmartAirLogo from "../assets/airPurifier/logo-smart-air.webp";
import SmarterHepaLogo from "../assets/airPurifier/logo-smarter-hepa.webp";
import OwnedDigitalMediaImage from "../assets/airPurifier/owned-digital-media.webp";
import PrintSectionImage from "../assets/airPurifier/print.webp";
import CleanCarouselVideo from "../assets/airPurifier/clean-carousel-slideshow.mp4";
import AiArtboardNine from "../assets/airPurifier/what-you-get/Artboard 9.webp";
import AiChristmasSqair from "../assets/airPurifier/what-you-get/Christmas Sqair.webp";
import AiCleanAir from "../assets/airPurifier/what-you-get/clean air copy.webp";
import AiMobileYoga from "../assets/airPurifier/what-you-get/Mobile Yoga.webp";
import AiSqairDog from "../assets/airPurifier/what-you-get/Sqair Dog.webp";
import AiSqairSizeTwo from "../assets/airPurifier/what-you-get/Sqair Size 2.webp";
import AiSqairSize from "../assets/airPurifier/what-you-get/Sqair size.webp";
import SmallReferenceOne from "../assets/airPurifier/what-you-give-us/Top Down.webp";
import SmallReferenceTwo from "../assets/airPurifier/what-you-give-us/Three Quarter.webp";
import SmallReferenceThree from "../assets/airPurifier/what-you-give-us/Front.webp";
import SmallReferenceFour from "../assets/airPurifier/what-you-give-us/Back.webp";
import SocialFolderEdge from "../assets/airPurifier/social-folder-edge.webp";
import SocialLeftLoop from "../assets/airPurifier/social-left-loop.gif";
import SocialReelBento from "../assets/airPurifier/social-reels/Bento Animate_1.mp4";
import SocialReelChristmas from "../assets/airPurifier/social-reels/Christmas Dynamic.mp4";
import SocialReelCompOne from "../assets/airPurifier/social-reels/Comp 1.mp4";
import SocialReelCompOneAlt from "../assets/airPurifier/social-reels/Comp 1_1.mp4";
import SocialReelFreepikUpscale from "../assets/airPurifier/social-reels/freepik_imagemp4-upscaled_1080x1920_60fps_50437.mp4";
import SocialReelFreepikWinter from "../assets/airPurifier/social-reels/freepik__animate-the-provided-image-into-a-winter-miniature__39594.mp4";
import SocialReelMagnific from "../assets/airPurifier/social-reels/magnific_video-upscale_43rlK509Aa.mp4";
import SocialReelQtThree from "../assets/airPurifier/social-reels/QT3.mp4";
import SocialReelSmartAir from "../assets/airPurifier/social-reels/SA Reel.mp4";
import SocialReelStopmotion from "../assets/airPurifier/social-reels/Stopmotion.mp4";
import StatHundredPlusImage from "../assets/airPurifier/stat-100plus.webp";
import StatFourImage from "../assets/airPurifier/stat-4.webp";
import StatMultimediaImage from "../assets/airPurifier/stat-multimedia.webp";
import StatInsightImage from "../assets/airPurifier/stat-o-visual.webp";
import StaticEarlyBird from "../assets/airPurifier/statics-carousel/Early Bird 1.webp";
import StaticBlackFriday from "../assets/airPurifier/statics-carousel/Black Friday PopUp.webp";
import StaticBlastMini from "../assets/airPurifier/statics-carousel/blast mini copy.webp";
import StaticEducation from "../assets/airPurifier/statics-carousel/Education.webp";
import StaticLastChance from "../assets/airPurifier/statics-carousel/Last Chance.webp";
import StaticMask from "../assets/airPurifier/statics-carousel/Mask.webp";
import StaticPopup from "../assets/airPurifier/statics-carousel/Popup.webp";
import StaticSleep from "../assets/airPurifier/statics-carousel/Sleep.webp";
import StaticElectricity from "../assets/airPurifier/statics-carousel/smart air electricity 2-2.webp";
import StaticTravel from "../assets/airPurifier/statics-carousel/Sqair Travel.webp";
import StaticFiltration from "../assets/airPurifier/statics-carousel/form meets copy.webp";
import StaticMemorialDay from "../assets/airPurifier/statics-carousel/Memorial Day.webp";
import StaticSpecifications from "../assets/airPurifier/statics-carousel/sqr copy.webp";
import StaticDustAllergy from "../assets/airPurifier/statics-carousel/Copy of Copy of smart air cutout 2.webp";
import StaticHepaFilter from "../assets/airPurifier/statics-carousel/Hepa Filter 2.webp";
import StaticBirthday from "../assets/airPurifier/statics-carousel/Birthday.webp";
import "./AirPurifier.scss";

const contentFolders = [
  {
    label: "Print Media",
    href: "#print-media",
    color: "blue",
    images: [SmartAirOne, SmartAirTwo, SmartAirThree],
  },
  {
    label: "Social Media Contents",
    href: "#social-media-contents",
    color: "pink",
    images: [SmartAirTwo, SmartAirThree, SmartAirFour, SmartAirFive],
  },
  {
    label: "Owned Digital Media",
    href: "#owned-digital-media",
    color: "green",
    images: [SmartAirThree, SmartAirFour, SmartAirOne],
  },
  {
    label: "AI Gen Images & Videos",
    href: "#ai-gen-images-videos",
    color: "yellow",
    images: [SmartAirFour, SmartAirFive, SmartAirTwo, SmartAirOne],
  },
];

const aiMedia = [
  { type: "video", src: CleanCarouselVideo, alt: "AI-generated air purifier carousel" },
  { type: "image", src: AiArtboardNine, alt: "Air purifier beside a sleeping cat" },
  { type: "image", src: AiChristmasSqair, alt: "Air purifier in a Christmas scene" },
  { type: "image", src: AiCleanAir, alt: "Clean air product campaign visual" },
  { type: "image", src: AiMobileYoga, alt: "Air purifier beside yoga equipment" },
  { type: "image", src: AiSqairDog, alt: "Air purifier beside a sleeping dog" },
  { type: "image", src: AiSqairSizeTwo, alt: "Person carrying an air purifier" },
  { type: "image", src: AiSqairSize, alt: "Air purifier in a home interior" },
] as const;

const angleOptions = [
  { label: "Top Down", image: SmallReferenceOne },
  { label: "Three Quarter", image: SmallReferenceTwo },
  { label: "Front", image: SmallReferenceThree },
  { label: "Back", image: SmallReferenceFour },
];

const brandStorySlides = [
  BrandStoryOne,
  BrandStoryTwo,
  BrandStoryThree,
  BrandStoryFour,
  BrandStoryFive,
  BrandStorySix,
  BrandStorySeven,
  BrandStoryEight,
  BrandStoryNine,
  BrandStoryTen,
];

const socialMediaThreads = [
  {
    variant: "thread-one",
    images: [
      SocialReelCompOneAlt,
      SocialReelSmartAir,
      SocialReelChristmas,
      SocialReelQtThree,
      SocialReelFreepikWinter,
    ],
  },
  {
    variant: "thread-two",
    images: [
      SocialReelFreepikUpscale,
      SocialReelBento,
      SocialReelMagnific,
      SocialReelCompOne,
      SocialReelStopmotion,
    ],
  },
];

const trustedClients = [
  { name: "Smart Air", logo: SmartAirLogo },
  { name: "Smarter HEPA", logo: SmarterHepaLogo },
];

const isVideoAsset = (asset: string) => /\.(mp4|webm)(?:[?#].*)?$/i.test(asset);

const printMediaCarousel = [
  {
    image: StaticEarlyBird,
    title: "Campaign Visual 01",
    label: "Early Bird promotion",
  },
  {
    image: StaticBlackFriday,
    title: "Campaign Visual 02",
    label: "Black Friday promotion",
  },
  {
    image: StaticBlastMini,
    title: "Campaign Visual 03",
    label: "Blast Mini product visual",
  },
  {
    image: StaticEducation,
    title: "Campaign Visual 04",
    label: "Clean-air education visual",
  },
  {
    image: StaticLastChance,
    title: "Campaign Visual 05",
    label: "Last-chance promotion",
  },
  {
    image: StaticMask,
    title: "Campaign Visual 06",
    label: "Face mask product visual",
  },
  {
    image: StaticPopup,
    title: "Campaign Visual 07",
    label: "Holiday gift promotion",
  },
  {
    image: StaticSleep,
    title: "Campaign Visual 08",
    label: "Sleep campaign visual",
  },
  {
    image: StaticElectricity,
    title: "Campaign Visual 09",
    label: "Purified-air education visual",
  },
  {
    image: StaticTravel,
    title: "Campaign Visual 10",
    label: "Travel product visual",
  },
  {
    image: StaticFiltration,
    title: "Campaign Visual 11",
    label: "Filtration explainer",
  },
  {
    image: StaticMemorialDay,
    title: "Campaign Visual 12",
    label: "Memorial Day promotion",
  },
  {
    image: StaticSpecifications,
    title: "Campaign Visual 13",
    label: "Product specification visual",
  },
  {
    image: StaticDustAllergy,
    title: "Campaign Visual 14",
    label: "Dust-allergy campaign",
  },
  {
    image: StaticHepaFilter,
    title: "Campaign Visual 15",
    label: "HEPA filter comparison",
  },
  {
    image: StaticBirthday,
    title: "Campaign Visual 16",
    label: "Birthday promotion",
  },
];

const getCarouselPosition = (index: number, activeIndex: number) => {
  const totalItems = printMediaCarousel.length;
  const previousIndex = (activeIndex - 1 + totalItems) % totalItems;
  const nextIndex = (activeIndex + 1) % totalItems;
  const farPreviousIndex = (activeIndex - 2 + totalItems) % totalItems;
  const farNextIndex = (activeIndex + 2) % totalItems;

  if (index === activeIndex) return "active";
  if (index === previousIndex) return "previous";
  if (index === nextIndex) return "next";
  if (index === farPreviousIndex) return "far-previous";
  if (index === farNextIndex) return "far-next";

  return "hidden";
};

const tableOfContentsId = "air-purifier-contents";

function ScrollToContentsButton() {
  const scrollToContents = () => {
    document.getElementById(tableOfContentsId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      aria-label="Scroll to table of content"
      className="air-purifier-section-jump"
      onClick={scrollToContents}
      type="button"
    >
      <span className="air-purifier-section-jump-icon" aria-hidden="true"></span>
    </button>
  );
}

function AirPurifier() {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [previousMediaIndex, setPreviousMediaIndex] = useState<number | null>(null);
  const [aiSectionVisible, setAiSectionVisible] = useState(false);
  const [isAiMuted, setIsAiMuted] = useState(false);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [ownedVisible, setOwnedVisible] = useState(false);
  const aiSectionRef = useRef<HTMLElement | null>(null);
  const activeAiVideoRef = useRef<HTMLVideoElement | null>(null);
  const ownedSectionRef = useRef<HTMLElement | null>(null);
  const brandStoryScrollRef = useRef<HTMLDivElement | null>(null);
  const carouselThumbsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ownedSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOwnedVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(ownedSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!aiSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAiSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(aiSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsAiMuted(aiMedia[activeMediaIndex].type !== "video");
  }, [activeMediaIndex]);

  useEffect(() => {
    const video = activeAiVideoRef.current;
    if (!video || aiMedia[activeMediaIndex].type !== "video") return;

    video.muted = isAiMuted || !aiSectionVisible;

    if (!aiSectionVisible) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      setIsAiMuted(true);
    });
  }, [activeMediaIndex, aiSectionVisible, isAiMuted]);

  useEffect(() => {
    if (!aiSectionVisible || aiMedia[activeMediaIndex].type !== "image") return;

    const mediaTimer = window.setTimeout(() => {
      setPreviousMediaIndex(activeMediaIndex);
      setActiveMediaIndex((activeMediaIndex + 1) % aiMedia.length);
    }, 4000);

    return () => {
      window.clearTimeout(mediaTimer);
    };
  }, [activeMediaIndex, aiSectionVisible]);

  useEffect(() => {
    if (previousMediaIndex === null) return;

    const transitionTimer = window.setTimeout(() => {
      setPreviousMediaIndex(null);
    }, 600);

    return () => {
      window.clearTimeout(transitionTimer);
    };
  }, [previousMediaIndex, activeMediaIndex]);

  useEffect(() => {
    const carouselTimer = window.setInterval(() => {
      setActiveCarouselIndex(
        (currentIndex) => (currentIndex + 1) % printMediaCarousel.length
      );
    }, 3600);

    return () => {
      window.clearInterval(carouselTimer);
    };
  }, [activeCarouselIndex]);

  useEffect(() => {
    const thumbs = carouselThumbsRef.current;
    const activeThumb = thumbs?.querySelector<HTMLElement>(".active");
    if (!thumbs || !activeThumb) return;

    thumbs.scrollTo({
      left: activeThumb.offsetLeft - (thumbs.clientWidth - activeThumb.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [activeCarouselIndex]);

  useEffect(() => {
    const brandStoryTimer = window.setInterval(() => {
      if (!brandStoryScrollRef.current) return;

      const track = brandStoryScrollRef.current;
      const scrollAmount = track.clientWidth * 0.72;
      const nearEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - scrollAmount;

      if (nearEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, 4600);

    return () => {
      window.clearInterval(brandStoryTimer);
    };
  }, []);

  const showNextMedia = () => {
    setPreviousMediaIndex(activeMediaIndex);
    setActiveMediaIndex((activeMediaIndex + 1) % aiMedia.length);
  };

  const toggleAiSound = () => {
    if (aiMedia[activeMediaIndex].type !== "video") return;

    const nextMutedState = !isAiMuted;
    setIsAiMuted(nextMutedState);

    if (activeAiVideoRef.current) {
      activeAiVideoRef.current.muted = nextMutedState;
      if (!nextMutedState) void activeAiVideoRef.current.play();
    }
  };

  const showPreviousCarouselImage = () => {
    setActiveCarouselIndex(
      (currentIndex) =>
        (currentIndex - 1 + printMediaCarousel.length) % printMediaCarousel.length
    );
  };

  const showNextCarouselImage = () => {
    setActiveCarouselIndex(
      (currentIndex) => (currentIndex + 1) % printMediaCarousel.length
    );
  };

  const scrollBrandStory = (direction: "previous" | "next") => {
    if (!brandStoryScrollRef.current) return;

    const scrollAmount = brandStoryScrollRef.current.clientWidth * 0.72;
    brandStoryScrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleContactFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;

    if (!emailInput?.checkValidity()) {
      event.preventDefault();
      emailInput?.reportValidity();
    }
  };

  return (
    <main className="air-purifier-page">
      <div className="air-purifier-bg-group">
        <div className="air-purifier-bg-layer" aria-hidden="true"></div>

        <section className="air-purifier-hero" aria-label="Cleaner Air portfolio">
          <video
            autoPlay
            className="air-purifier-hero-video"
            loop
            muted
            playsInline
            preload="metadata"
            src={HeroVideo}
          />
        </section>
      <section className="air-purifier-intro" aria-label="Smart Air project overview">
          <div className="air-purifier-intro-content">
            <h2>Hi!</h2>
            <p>
              From scroll-stopping social campaigns to digital assets, here's a
              look at our work with the air purifier brand{" "}
              <strong>Smart Air Bangladesh &amp; Smarter Hepa.</strong>
            </p>

            <div className="air-purifier-intro-grid">
              <div className="air-purifier-panel air-purifier-panel-stats">
                <span
                  className="air-purifier-panel-stats-plus"
                  aria-hidden="true"
                ></span>
                <div className="air-purifier-stat">
                  <img
                    alt="4"
                    className="air-purifier-stat-image"
                    src={StatFourImage}
                  />
                  <span className="air-purifier-stat-label">
                    Years of
                    <span>collaboration</span>
                  </span>
                </div>
                <div className="air-purifier-stat">
                  <img
                    alt="Insight visual"
                    className="air-purifier-stat-image air-purifier-stat-image-icon"
                    src={StatInsightImage}
                  />
                  <span className="air-purifier-stat-label">
                    Insight driven
                    <span>planning</span>
                  </span>
                </div>
                <div className="air-purifier-stat">
                  <img
                    alt="100 plus"
                    className="air-purifier-stat-image air-purifier-stat-image-wide"
                    src={StatHundredPlusImage}
                  />
                  <span className="air-purifier-stat-label">
                    Visuals
                    <span>created</span>
                  </span>
                </div>
                <div className="air-purifier-stat">
                  <img
                    alt="Multimedia creative support visual"
                    className="air-purifier-stat-image air-purifier-stat-image-multimedia"
                    src={StatMultimediaImage}
                  />
                  <span className="air-purifier-stat-label">
                    Multimedia creative
                    <span>support</span>
                  </span>
                </div>
              </div>

              <div className="air-purifier-panel air-purifier-panel-brand">
                <div className="air-purifier-trusted-clients">
                  <span className="air-purifier-trusted-eyebrow">our clients</span>
                  <h3>trusted by the best</h3>
                  <div className="air-purifier-trusted-logo-grid">
                    {trustedClients.map((client) => (
                      <div className="air-purifier-trusted-logo-card" key={client.name}>
                        <img alt={client.name} src={client.logo} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="air-purifier-sky-flow">
          <section
            className="air-purifier-contents"
            id={tableOfContentsId}
            aria-label="Air purifier portfolio table of contents"
          >
            <div className="air-purifier-contents-copy">
              <h2>
                <span className="air-purifier-table-title-line">Table of</span>
                <mark className="air-purifier-table-title-highlight">content</mark>
              </h2>
              <p>
                Visions, versions,{" "}
                <span className="air-purifier-selection-highlight">
                  and everything in between.
                </span>
              </p>
            </div>

            <nav className="air-purifier-folder-nav" aria-label="Portfolio sections">
              {contentFolders.map((folder, index) => {
                const folderPosition = (index + 1).toString();

                return (
                  <a
                    className={`air-purifier-folder air-purifier-folder-${folder.color} air-purifier-folder-${folderPosition}`}
                    href={folder.href}
                    key={folder.href}
                  >
                    <span className="air-purifier-folder-icon" aria-hidden="true"></span>
                    <span className="air-purifier-folder-label">{folder.label}</span>
                    <span className="air-purifier-folder-preview" aria-hidden="true">
                      {folder.images.map((image, imageIndex) => (
                        <img
                          alt=""
                          key={image}
                          src={image}
                          style={{ "--preview-index": imageIndex } as CSSProperties}
                        />
                      ))}
                    </span>
                  </a>
                );
              })}
            </nav>
          </section>

          <section
            className="air-purifier-ai-section"
            id="ai-gen-images-videos"
            aria-label="AI generated images and videos"
            ref={aiSectionRef}
          >
            <div className="air-purifier-ai-copy">
              <h2>
                <span>Your</span>
                <span>
                  <mark>AI-powered</mark>
                </span>
                <span>Creative Squad</span>
              </h2>
              <p>
                Studio quality realistic AI visuals from rough references;
                minus the cost, crew and production load.
              </p>
            </div>

            <div className="air-purifier-ai-stage">
              <div className="air-purifier-video-window">
                <div className="air-purifier-window-title">
                  <span>What_You_Get.mp4</span>
                  <span className="air-purifier-browser-controls">
                    <span
                      aria-hidden="true"
                      className="air-purifier-browser-control air-purifier-browser-control-min"
                    ></span>
                    <span
                      aria-hidden="true"
                      className="air-purifier-browser-control air-purifier-browser-control-max"
                    ></span>
                    <button
                      aria-label={isAiMuted ? "Turn video sound on" : "Turn video sound off"}
                      aria-pressed={!isAiMuted}
                      className="air-purifier-audio-toggle"
                      disabled={aiMedia[activeMediaIndex].type !== "video"}
                      onClick={toggleAiSound}
                      type="button"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
                        {isAiMuted ? (
                          <path d="m16 9 5 6m0-6-5 6" />
                        ) : (
                          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
                        )}
                      </svg>
                    </button>
                  </span>
                </div>
                <div className="air-purifier-video-frame">
                  {[
                    ...(previousMediaIndex === null
                      ? []
                      : [{ index: previousMediaIndex, position: "previous" }]),
                    { index: activeMediaIndex, position: "active" },
                  ].map(({ index, position }) => {
                    const media = aiMedia[index];

                    return (
                      <div
                        className={`air-purifier-media-slide air-purifier-media-slide-${position}`}
                        key={`${position}-${media.src}`}
                      >
                        {media.type === "video" ? (
                          <>
                            <video
                              aria-hidden="true"
                              autoPlay={aiSectionVisible && position === "active"}
                              className="air-purifier-video-backdrop"
                              muted
                              playsInline
                              src={media.src}
                            />
                            {/* Visual-only AI reel; captions are not required. */}
                            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                            <video
                              className="air-purifier-video"
                              muted={position !== "active" || isAiMuted || !aiSectionVisible}
                              onEnded={position === "active" ? showNextMedia : undefined}
                              playsInline
                              ref={position === "active" ? activeAiVideoRef : undefined}
                              src={media.src}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              alt=""
                              aria-hidden="true"
                              className="air-purifier-video-backdrop"
                              src={media.src}
                            />
                            <img
                              alt={media.alt}
                              className="air-purifier-video air-purifier-media-image"
                              src={media.src}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  aria-label="Show next AI image or video"
                  className="air-purifier-video-next"
                  onClick={showNextMedia}
                  type="button"
                >
                  <span className="air-purifier-video-next-icon" aria-hidden="true"></span>
                </button>
              </div>

              <div className="air-purifier-angle-window">
                <div className="air-purifier-browser-bar" aria-hidden="true">
                  <span className="air-purifier-browser-title">What_You_Give_Us.png</span>
                  <span className="air-purifier-browser-dots">
                    <span className="air-purifier-browser-dot"></span>
                    <span className="air-purifier-browser-dot"></span>
                    <span className="air-purifier-browser-dot"></span>
                  </span>
                </div>
                <img
                  alt={`${angleOptions[activeAngleIndex].label} AI reference`}
                  src={angleOptions[activeAngleIndex].image}
                />
                <div className="air-purifier-angle-menu">
                  {angleOptions.map((option, index) => (
                    <button
                      className={index === activeAngleIndex ? "active" : ""}
                      key={option.label}
                      onClick={() => {
                        setActiveAngleIndex(index);
                      }}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <ScrollToContentsButton />
          </section>
        </div>
      </div>

      <section
        className={`air-purifier-owned-media ${ownedVisible ? "is-visible" : ""}`}
        id="owned-digital-media"
        ref={ownedSectionRef}
        aria-label="Owned digital media portfolio"
      >
        <span className="air-purifier-owned-frame-label">
          amazon <span aria-hidden="true">•</span> web design <span aria-hidden="true">•</span> email campaigns
        </span>

        <div className="air-purifier-owned-copy">
          <span className="air-purifier-carousel-eyebrow">Owned Digital Media</span>
          <h2>
            Built <mark>Fast</mark>.
            <br />
            Branded <mark>Right</mark>.
          </h2>
          <p>
            <span>Turn your brand-controlled platforms into</span>{" "}
            <span>polished, purposeful digital journeys.</span>
          </p>
        </div>

        <div className="air-purifier-owned-stage">
          <img
            alt=""
            aria-hidden="true"
            className="air-purifier-owned-shadow"
            src={AdditionalShadow}
          />
          <img
            alt="Owned digital media portfolio collage"
            className="air-purifier-owned-still"
            src={OwnedDigitalMediaImage}
          />
        </div>

        <div
          className="air-purifier-brand-story"
          role="region"
          aria-label="Amazon brand story carousel"
        >
          <img
            alt=""
            className="air-purifier-brand-story-backdrop"
            src={BrandStoryBackdrop}
          />

          <div className="air-purifier-brand-story-content">
            <div className="air-purifier-brand-story-shell">
              <button
                aria-label="Scroll brand story images backward"
                className="air-purifier-brand-story-button air-purifier-brand-story-button-prev"
                onClick={() => {
                  scrollBrandStory("previous");
                }}
                type="button"
              >
                <span className="air-purifier-brand-story-button-icon" aria-hidden="true"></span>
              </button>

              <div
                className="air-purifier-brand-story-track"
                ref={brandStoryScrollRef}
              >
                {brandStorySlides.map((image, index) => (
                  <article className="air-purifier-brand-story-card" key={image}>
                    <img
                      alt={`Amazon brand story visual ${(index + 1).toString()}`}
                      className="air-purifier-brand-story-image"
                      src={image}
                    />
                  </article>
                ))}
              </div>

              <button
                aria-label="Scroll brand story images forward"
                className="air-purifier-brand-story-button air-purifier-brand-story-button-next"
                onClick={() => {
                  scrollBrandStory("next");
                }}
                type="button"
              >
                <span className="air-purifier-brand-story-button-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
        <ScrollToContentsButton />
      </section>

      <section
        className="air-purifier-social-media"
        id="social-media-contents"
        aria-label="Social media contents portfolio"
      >
        <div className="air-purifier-social-folder">
          <span className="air-purifier-social-folder-shape" aria-hidden="true">
            <span className="air-purifier-social-folder-tab"></span>
          </span>
          <span className="air-purifier-social-folder-label">
            Social Media Contents
          </span>
        </div>
        <div className="air-purifier-social-copy">
          <span className="air-purifier-carousel-eyebrow air-purifier-social-eyebrow">
            Social Media Content
          </span>
          <h2>
            The Scroll-<mark>Stoppers.</mark>
          </h2>
          <p>
            Content that looks good, feels right, and gets noticed.
          </p>
          <ul>
            <li>
              <span className="air-purifier-social-highlight">Static</span>
            </li>
            <li>
              <span className="air-purifier-social-highlight">Dynamic</span>
            </li>
            <li>
              <span className="air-purifier-social-highlight">Reels</span>
            </li>
          </ul>
        </div>

        <img
          className="air-purifier-social-left-loop"
          src={SocialLeftLoop}
          alt=""
          aria-hidden="true"
        />

        <img
          className="air-purifier-social-folder-edge"
          src={SocialFolderEdge}
          alt=""
          aria-hidden="true"
        />

        <div className="air-purifier-social-reels" aria-hidden="true">
          {socialMediaThreads.map((thread) => (
            <div
              className={`air-purifier-social-thread air-purifier-social-${thread.variant}`}
              key={thread.variant}
            >
              <div className="air-purifier-social-track">
                {[...thread.images, ...thread.images].map((media, index) => {
                  const isVideo = isVideoAsset(media);

                  return (
                    <div
                      className="air-purifier-social-card"
                      key={`${thread.variant}-${media}-${index.toString()}`}
                    >
                      {isVideo ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          src={media}
                        />
                      ) : (
                        <img alt="" src={media} />
                      )}
                      <div className="air-purifier-social-card-ui">
                        <span className="air-purifier-social-heart"></span>
                        <span className="air-purifier-social-dots"></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="air-purifier-print-carousel"
        id="print-media"
        aria-label="Print media image carousel"
      >
        <div className="air-purifier-carousel-copy">
          <h2>
            Visuals, framed for <mark>impact.</mark>
          </h2>
          <p>
            We build polished static content systems so your brand always shows
            up with the right look.
          </p>
        </div>

        <div className="air-purifier-carousel-shell">
          <button
            aria-label="Show previous print media visual"
            className="air-purifier-carousel-arrow air-purifier-carousel-arrow-prev"
            onClick={showPreviousCarouselImage}
            type="button"
          >
            <span className="air-purifier-carousel-arrow-icon" aria-hidden="true"></span>
          </button>

          <div className="air-purifier-carousel-stage">
            {printMediaCarousel.map((item, index) => (
              <figure
                aria-hidden={index !== activeCarouselIndex}
                className={`air-purifier-carousel-card is-${getCarouselPosition(
                  index,
                  activeCarouselIndex
                )}`}
                key={item.image}
              >
                <img
                  alt={item.label}
                  className="air-purifier-carousel-image"
                  src={item.image}
                />
              </figure>
            ))}
          </div>

          <button
            aria-label="Show next print media visual"
            className="air-purifier-carousel-arrow air-purifier-carousel-arrow-next"
            onClick={showNextCarouselImage}
            type="button"
          >
            <span className="air-purifier-carousel-arrow-icon" aria-hidden="true"></span>
          </button>
        </div>

        <div className="air-purifier-carousel-meta">
          <div>
            <b className="air-purifier-carousel-title">
              {printMediaCarousel[activeCarouselIndex].title}
            </b>
            <span className="air-purifier-carousel-label">
              {printMediaCarousel[activeCarouselIndex].label}
            </span>
          </div>

          <div
            className="air-purifier-carousel-thumbs"
            aria-label="Choose print media visual"
            ref={carouselThumbsRef}
          >
            {printMediaCarousel.map((item, index) => (
              <button
                aria-label={`Show ${item.title}`}
                aria-pressed={index === activeCarouselIndex}
                className={`air-purifier-carousel-thumb ${
                  index === activeCarouselIndex ? "active" : ""
                }`}
                key={item.title}
                onClick={() => {
                  setActiveCarouselIndex(index);
                }}
                type="button"
              >
                <img
                  alt=""
                  className="air-purifier-carousel-thumb-image"
                  src={item.image}
                />
              </button>
            ))}
          </div>
        </div>
        <ScrollToContentsButton />
      </section>

      <section
        className="air-purifier-print-showcase"
        aria-label="Print media showcase"
      >
        <div className="air-purifier-print-showcase-copy">
          <span className="air-purifier-carousel-eyebrow air-purifier-print-showcase-eyebrow">
            Print Media
          </span>
          <h2>
            From Reels to <mark>Real</mark>
          </h2>
          <p>
            Assets that carry your brand beyond the screen, across every touchpoint.
          </p>
        </div>

        <figure className="air-purifier-testimonial">
          <span className="air-purifier-testimonial-mark" aria-hidden="true">
            “
          </span>
          <figcaption className="air-purifier-testimonial-credit">
            <b>Boudewijn Sterk</b>
            <span>Founder, Smart Air Bangladesh</span>
          </figcaption>
          <blockquote>
            I’ve been working with Irreal Visuals for more than three years,
            and during this time, they have consistently delivered exceptional,
            cutting-edge visuals and creative solutions.
          </blockquote>
        </figure>
        <form
          action="https://formsubmit.co/design@irrealvisuals.com"
          className="air-purifier-contact-form"
          method="POST"
          onSubmit={handleContactFormSubmit}
        >
          <input
            name="_subject"
            type="hidden"
            value="New project inquiry from Irreal Visuals website"
          />
          <input name="_captcha" type="hidden" value="false" />
          <h3>
            Got <mark>ideas</mark>?
            <span>We've got the <mark>skills</mark>.</span>
          </h3>
          <p>We would love to hear from you!</p>

          <label>
            <span>Your name</span>
            <input name="name" type="text" />
          </label>
          <label>
            <span>you@company.com</span>
            <input name="email" required type="email" />
          </label>
          <label>
            <span>Tell us about your project/ideas.</span>
            <textarea name="project" rows={3}></textarea>
          </label>

          <fieldset>
            <legend>How can we help?</legend>
            <label>
              <input name="services" type="checkbox" value="social-media" />
              <span>Social media content</span>
            </label>
            <label>
              <input name="services" type="checkbox" value="ai-visuals" />
              <span>AI visuals</span>
            </label>
            <label>
              <input name="services" type="checkbox" value="print-media" />
              <span>Print media</span>
            </label>
            <label>
              <input name="services" type="checkbox" value="brand-story" />
              <span>Others</span>
            </label>
          </fieldset>

          <button type="submit">Let's get started</button>
        </form>
        <img
          alt="Print media campaign showcase"
          className="air-purifier-print-showcase-image"
          src={PrintSectionImage}
        />
        <ScrollToContentsButton />
      </section>
    </main>
  );
}

export default AirPurifier;
