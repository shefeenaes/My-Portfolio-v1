import React from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false, // This ensures that the Lottie component is only loaded on the client-side
});


import compassAnimation from '@/public/compass.json';

interface ScrollTopButtonProps {
  showScrollTopButton: boolean;
}

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({ showScrollTopButton }) => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {showScrollTopButton && (
        <Lottie
          animationData={compassAnimation}
          loop={true}
          className="fixed bottom-4 right-4 h-40 w-40 cursor-pointer text-white rounded-full shadow-pulse hover:shadow-glow hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default ScrollTopButton;
