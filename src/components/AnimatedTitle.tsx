import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  containerClass?: string;
};
const AnimatedTitle = ({ title = "", containerClass = "" }: Props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom", //100px and bottom of the container
          end: "center bottom",
          toggleActions: "play none none reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)", //resetting animation
        ease: "power2.inOut",
        stagger: 0.02, // inbetween each word
      });

      return () => ctx.revert();
    }, containerRef);
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => {
        return (
          <div
            key={index}
            className="flex-wrap max-w-full gap-2 px-10 flex-center md:gap-3"
          >
            {line.split(" ").map((word, i) => {
              return (
                <span
                  key={i}
                  className="animated-word"
                  dangerouslySetInnerHTML={{ __html: word }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedTitle;
