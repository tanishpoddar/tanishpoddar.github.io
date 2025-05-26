import { useState, useEffect, RefObject } from "react";
import { motion } from "framer-motion";
import useScrollActive from "@/hooks/useScrollActive";

interface NavigationBarProps {
  sections: {
    [key: string]: RefObject<HTMLElement>;
  };
}

const NavigationBar = ({ sections }: NavigationBarProps) => {
  const activeSection = useScrollActive(sections);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 300) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navItems = [
    { id: "home", icon: "ri-home-line" },
    { id: "about", icon: "ri-user-line" },
    { id: "skills", icon: "ri-code-s-slash-line" },
    { id: "projects", icon: "ri-folder-line" },
    { id: "education", icon: "ri-book-open-line" },
    { id: "experience", icon: "ri-briefcase-line" },
    { id: "resume", icon: "ri-file-list-line" },
    { id: "contact", icon: "ri-chat-1-line" }
  ];

  const scrollToSection = (id: string) => {
    sections[id].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      className="fixed bottom-6 left-1/2 z-40 bg-terminal-lightbg bg-opacity-80 backdrop-blur-sm rounded-full px-1 py-1 shadow-lg border border-gray-700"
      initial={{ y: 100, x: "-50%" }}
      animate={{ 
        y: visible ? 0 : 100,
        x: "-50%"
      }}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex space-x-1 sm:space-x-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-terminal-bg transition-colors ${
                activeSection === item.id ? "text-terminal-green" : ""
              }`}
              aria-label={`Navigate to ${item.id} section`}
            >
              <i className={`${item.icon} text-lg sm:text-xl`}></i>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default NavigationBar;
