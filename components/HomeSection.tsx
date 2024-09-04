import React, { forwardRef, useEffect, useState } from 'react';

const HomeSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [unroll, setUnroll] = useState(false);
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    if (!ref || typeof ref !== 'object' || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing all elements once visibility is set
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);
  useEffect(() => {
    setUnroll(true);

    // Reveal content after scroll unroll animation ends
    const timer = setTimeout(() => {
      setReveal(true);
    }, 2000); // Match this with the animation duration

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      id="home"
      ref={ref}
      className={`min-h-screen flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
      className={`relative w-9/12 h-[400px] 
        bg-[url('/scroll.png')] 
        bg-no-repeat bg-contain overflow-hidden ${unroll ? 'animate-unrollScroll' : ''}`}
    >
      <div
        className={`absolute w-7/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ${
          reveal ? 'animate-revealContent' : 'opacity-0'
        }`}
      >
        <h1 className="text-3xl font-bold">The Code Chronicles</h1>
        <p className="mt-4 text-lg">Hear ye, hear ye! Welcome, wanderer, to the sacred scrolls of code crafted by Shefeena E S. Within these digital parchment lies the tale of a dedicated web developers quest through realms of creativity and innovation. Embark upon this journey and unveil the chronicles of code that weave functionality with artistry. Scroll onward, and let the adventure begin!</p>
      </div>
    </div>
    </div>
  );
});

HomeSection.displayName = "HomeSection";

export default HomeSection;
