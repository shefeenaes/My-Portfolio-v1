import Image from 'next/image';
import React, { forwardRef, useEffect, useState } from 'react';

const SkillsSection =  forwardRef<HTMLDivElement>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
        const currentRef= ref && 'current' in ref ? ref.current : null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if(currentRef)
                observer.unobserve(currentRef); // Stop observing once it's visible
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the section is visible
      );
  
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
    id="skills"
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
My Technical Experience/Skills.
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

Currently i have an experience of 2 years and i have a solid understand of 
<ul className='grid grid-cols-5 gap-4'>
  <li>HTML5 : <Image src='/html.png' alt='html' width={100} height={100}/></li>
  <li>CSS3: <Image src='/css.png' alt='css' width={100} height={100}/></li>
  <li>JS: <Image src='/js.png' alt='js' width={100} height={100}/></li>
  <li>TS: <Image src='/ts.jpeg' alt='ts' width={100} height={100}/></li>
  <li>React: <Image src='/react.png' alt='react' width={100} height={100}/></li>
  <li>NextJS: <Image src='/next.png' alt='next' width={100} height={100}/></li>
  <li>Python: <Image src='/python.png' alt='python' width={100} height={100}/></li>
  <li>Salesforce: <Image src='/salesforce.png' alt='salesforce' width={100} height={100}/></li>
  <li>Tailwind: <Image src='/tailwind.png' alt='tailwind' width={100} height={100}/></li>
  <li>Github: <Image src='/git.png' alt='git' width={100} height={100}/></li>
</ul>
I specialize in building web applications and sites using Javascript, HTML, React & Nextjs


</div>
</div>
  );
  });
  

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
