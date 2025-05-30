import { useRef } from "react";
import NavigationBar from "@/components/NavigationBar";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";

const Home = () => {
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    resume: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  return (
    <div className="bg-terminal-bg text-terminal-text font-mono">
      {/* Home Section */}
      <section ref={sectionRefs.home} id="home" className="min-h-screen flex items-center justify-center py-20 px-4">
        <TerminalWindow title="home.js">
          <div className="mb-4">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">whoami</span>
          </div>
          <div className="mb-10 ml-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-terminal-accent">
              Tanish Poddar
            </h1>
            <div className="mt-2">
              <TypingAnimation text="Software Developer" />
            </div>
          </div>
          <div className="mb-4">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">socials</span> --list
          </div>
          <div className="flex ml-4 mb-8 space-x-4">
            <a
              href="mailto:tanishpoddar.18@gmail.com"
              className="flex items-center text-terminal-accent hover:text-terminal-green transition-colors"
            >
              <i className="ri-mail-line mr-2 text-xl"></i>
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com/in/tanish-poddar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-terminal-accent hover:text-terminal-green transition-colors"
            >
              <i className="ri-linkedin-box-line mr-2 text-xl"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/tanishpoddar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-terminal-accent hover:text-terminal-green transition-colors"
            >
              <i className="ri-github-line mr-2 text-xl"></i>
              <span>GitHub</span>
            </a>
          </div>
          <div className="mt-6">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">scroll</span> --direction=down
          </div>
        </TerminalWindow>
      </section>

      {/* Other Sections */}
      <AboutSection ref={sectionRefs.about} />
      <SkillsSection ref={sectionRefs.skills} />
      <ProjectsSection ref={sectionRefs.projects} />
      <EducationSection ref={sectionRefs.education} />
      <ExperienceSection ref={sectionRefs.experience} />
      <ResumeSection ref={sectionRefs.resume} />
      <ContactSection ref={sectionRefs.contact} />

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm text-terminal-text">
          © 2025 | Made with <span className="text-terminal-accent">❤</span> by Tanish Poddar
        </p>
      </footer>

      {/* Go Up Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 z-40 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-terminal-accent hover:border-b-terminal-green transition-colors"
        aria-label="Scroll to top"
      />

      {/* Navigation */}
      <NavigationBar sections={sectionRefs} />
    </div>
  );
};

export default Home;
