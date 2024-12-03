import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import Button from "./Button";

const NAV_ITEMS = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (navContainerRef.current) {
      if (currentScrollY === 0) {
        // on top of the page
        setIsNavVisible(true);
        navContainerRef.current.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        // scrolling down
        setIsNavVisible(false);
        navContainerRef.current.classList.remove("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        // scrolling up
        setIsNavVisible(true);
        navContainerRef.current.classList.add("floating-nav");
      }

      setLastScrollY(currentScrollY);
    }
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const [isAudioPlaying, setIsAudiPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const toggleAuditoIndicator = () => {
    setIsAudiPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 z-50 h-16 transition-all duration-700 border-none top-4 sm:inset-x-6"
    >
      <header className="absolute w-full -translate-y-1/2 top-1/2">
        <nav className="flex items-center justify-between p-4 size-full">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex items-center h-full">
            <div className="hidden md:block">
              {NAV_ITEMS.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                );
              })}
            </div>

            <button
              className="ml-10 flex items-centrer space-x-0.5"
              onClick={toggleAuditoIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
