import React, { forwardRef, useEffect, useState } from 'react';

const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref && 'current' in ref ? ref.current : null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (currentRef) {
              observer.unobserve(currentRef); // Stop observing once it's visible
            }// Stop observing once it's visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

   // Observe the element using the stored ref
   if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
}, [ref]);

return (
  <div
  id="about"
  ref={ref}
  className={`min-h-screen flex flex-col items-center justify-center transition-opacity duration-1500 ease-in-out ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`}
  style={{
   // background: 'url("/path-to-your-parchment-image.jpg") center center/cover no-repeat',
    padding: '2rem',
 //   fontFamily: '"Times New Roman", Times, serif', // Adjust to your preferred font
    color: '#3e2723', // Dark brown color for text
  }}
>
  <h2
    className="text-4xl text-center mb-8"
    style={{
    //  fontFamily: '"Cinzel", serif', // Ancient manuscript-like font
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
      letterSpacing: '0.1em',
    }}
  >
    About Me
  </h2>
  <div
    className="text-center text-lg leading-relaxed"
    style={{
      maxWidth: '800px',
      lineHeight: '1.8',
      textAlign: 'justify',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    }}
  >
    <p>
      I am a full-stack web developer with a passion for creating interactive and responsive web applications. I have experience working with JavaScript, React, Redux, Node.js, Express, PostgreSQL, HTML, CSS, and Git. I am a quick learner and always looking to expand my knowledge and skill set. I am a team player and am excited to work with others to create amazing applications.
    </p>
    <p className="mt-4">Language, nationality, gender, hobbies</p>
  </div>
</div>
);
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
