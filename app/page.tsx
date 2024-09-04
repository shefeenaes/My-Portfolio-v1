'use client'
import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import HomeSection from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import SkillSection from '@/components/SkillSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import "@fontsource/medievalsharp" 
const HomePage: NextPage = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const home = useRef<HTMLDivElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const skills = useRef<HTMLDivElement>(null);
  const education = useRef<HTMLDivElement>(null);
  const experience = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);

  const ScrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({
      top: elementRef.current?.offsetTop,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>

      <ScrollToTopButton showScrollTopButton={showScrollTopButton} />
      <nav className="flex justify-center items-center w-full md:w-3/4 lg:w-1/2 mx-auto py-4" 
     >
<ul className="flex justify-around w-full">
  <li className="cursor-pointer font-semibold text-2xl text-shadow hover:text-glow hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => ScrollToSection(home)}>Home</li>
  <li className="cursor-pointer font-semibold text-2xl text-shadow hover:text-glow hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => ScrollToSection(about)}>About me</li>
  <li className="cursor-pointer font-semibold text-2xl text-shadow hover:text-glow hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => ScrollToSection(skills)}>Skills</li>
  <li className="cursor-pointer font-semibold text-2xl text-shadow hover:text-glow hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => ScrollToSection(education)}>My Education</li>
  <li className="cursor-pointer font-semibold text-2xl text-shadow hover:text-glow hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => ScrollToSection(experience)}>My Experience</li>
  <li className="cursor-pointer font-semibold text-2xl text-shadow hover:text-glow hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => ScrollToSection(contact)}>Contact me</li>
</ul>



</nav>

      <div>
        <HomeSection ref={home} />
        <AboutSection ref={about} />
        <SkillSection ref={skills} />
        <EducationSection ref={education} />
        <ExperienceSection ref={experience} />
        <ContactSection ref={contact} />
      </div>
    </>
  );
};

export default HomePage;
