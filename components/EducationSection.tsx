import React, { forwardRef, useEffect, useState } from 'react';

const EducationSection = forwardRef<HTMLDivElement>((props, ref) => {
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
  id="education"
  ref={ref}
  className={`min-h-screen w-11/12 h-1/2 flex flex-col items-center justify-center transition-opacity duration-1500 ease-in-out  ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`}
  style={{
    background: 'url("/book.png") center no-repeat  ',
    padding: '2rem',
    backgroundSize: '80% 70%', 
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
 My Education</h2>
  <div className='grid grid-cols-2 gap-10'>
    <div
      className="text-center text-lg leading-relaxed"
      style={{
        maxWidth: '400px',
        lineHeight: '1.8',
        textAlign: 'justify',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
      }}
     >  
      <p>
        July 2018 - 2021<br/>
        Master of Computer Application,<br/>
        Kalam Technological University Kerala<br/>
        I have graduated my masters form Vidya Academy of science and technology College Thrissur. The program has provided me with a well-rounded education, covering both theoretical foundations and practical applications of computer science.
      </p>
   </div>
   <div
      className="text-center text-lg leading-relaxed"
      style={{
        maxWidth: '400px',
        lineHeight: '1.8',
        textAlign: 'justify',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
      }}
     >  
      <p>
      July 2015 - 2018<br/>
        Bachelor of Computer Application,<br/>
        Calicut University Kerala<br/>
        I have graduated my bachelors form St josephs College Thrissur. The program has provided me with a well-rounded education, covering both theoretical foundations and practical applications of computer science.
      </p>
    </div>
  </div>
</div>
);
});


EducationSection.displayName = "Education Section";

export default EducationSection;
