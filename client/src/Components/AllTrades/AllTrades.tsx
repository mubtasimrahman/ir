import { useEffect, useRef,forwardRef } from "react";
import Photo from "../../assets/Mind copy.svg";
import IGCursor from "../../assets/socialLogos/Instagramcursor.svg";
import FBCursor from "../../assets/socialLogos/Facebookcursor.svg";
import TTCursor from "../../assets/socialLogos/Tiktokcursor.svg";
import LazyMask from "../WrapperComponents/LazyMask";
import "./AllTrades.scss";

const AllTrades = forwardRef<HTMLDivElement, { id: string }>(function AllTrades({ id }: { id: string },ref) {
  const maskRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const maskElement = maskRef.current;
    if (!maskElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-mask");
            entry.target.classList.remove("reverse-mask");
          } else {
            entry.target.classList.remove("animate-mask");
            entry.target.classList.add("reverse-mask");
          }
        });
      },
      {
        threshold: 0.3, // Adjust this value as needed
      }
    );

    if (maskRef.current) {
      observer.observe(maskElement);
    }

    return () => {
      observer.unobserve(maskElement);
    };
  }, []);

  return (
    <div
    ref={ref}
      id={id}
      className="container-fluid description-container px-4 pb-4 my-10 text-lg-start text-center poppins-light"
    >
      <div className="row gx-5 justify-content-center align-items-start">
        <div className="col-xxl-5 col-lg-6  ">
          <img className="photo mt-3" src={Photo} alt="" />
        </div>
        <div className="col-lg-6 pointer-events-enabled">
          <div className="intro poppins-bold mt-3">JACK OF ALL TRADES</div>
          <div className="mb-2">
            Hi, I'm Ishraqur Rahman, the design-obsessed marketer behind Irreal
            Visuals. After graduating with a degree in marketing, I started my
            career at a young digital marketing agency where I learned the ropes
            of the trade. I eventually decided to go on my own way, with the aim
            of placing a greater emphasis on creativity and design to improve
            the visual appearance of client communications. This vision gave
            rise to "Irreal Visuals"
          </div>
          <div className="mb-2">
            Although Irreal Visuals began as a one-man operation, it has evolved
            to a fully remote team of employess and freelance partners.
            Operating remotely has allowed us to be cost-effective, enabling us
            to pass these savings on to our clients.
          </div>
          <div className="mb-3">
            I have also recetly started my journey as a digital content creator
            to gain a better understanding of popular social media platforms,
            with an aim to better serve our clients.
          </div>
          <div>
            <img loading="lazy" className="social-img" src={FBCursor} alt="" />
            <img loading="lazy" className="social-img" src={IGCursor} alt="" />
            <img loading="lazy" className="social-img" src={TTCursor} alt="" />
          </div>
        </div>

        <LazyMask
          maskImageUrl="https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png"
          rootMargin="250%"
          threshold={0.1}
        >
          <div className="mask" ref={maskRef}></div>
        </LazyMask>
      </div>
    </div>
  );
})

export default AllTrades;
