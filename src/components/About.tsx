import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // trigger, start, end를 더 깰끔하게 정리 가능
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip", // 요친구에 도달하면
        start: "center center",
        end: "+=800 center", // it will trigger 800px after it passes the center
        scrub: 0.5, // how we are moving throw the animation on scroll
        pin: true, // an element to be pinned while the trigger is active. If set to true, the trigger element will be pinned.
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="w-screen min-h-screen">
      <div className="relative flex flex-col items-center gap-5 mb-8 mt-36">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        <AnimatedTitle />

        <div className="about-subtext">
          <p>The Game of Games begins - your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>

      <div className="w-screen h-dvh" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute top-0 left-0 object-cover size-full"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
