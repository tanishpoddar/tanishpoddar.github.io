import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [typingText, setTypingText] = useState("");
  
  const messages = [
    'Initializing components...',
    'Loading modules...',
    'Fetching portfolio data...',
    'Compiling experience...',
    'Ready!'
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    let messageIndex = 0;
    let charIndex = 0;

    // Handle progress bar animation
    progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    // Handle typing animation
    const typeWriter = () => {
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        
        if (charIndex < currentMessage.length) {
          setTypingText(prev => prev + currentMessage.charAt(charIndex));
          charIndex++;
        } else {
          setTypingText("");
          messageIndex++;
          charIndex = 0;
          setTimeout(() => typeWriter(), 500);
          return;
        }
      }
      
      typingInterval = setTimeout(typeWriter, 50);
    };
    
    typeWriter();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(typingInterval);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-terminal-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="terminal-window w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 max-w-xl h-64 bg-terminal-bg border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <div className="terminal-header flex items-center p-3 bg-terminal-lightbg border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="ml-2 text-sm text-terminal-text">init.sh</div>
        </div>
        <div className="p-4 h-full flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="text-terminal-green">$</span>{" "}
              <span className="text-terminal-command">initializing</span> portfolio.js
            </div>
            <div id="typing-output" className="text-sm mb-2">
              {typingText}<span className="animate-pulse">|</span>
            </div>
            <div className="mb-2">
              <span className="text-terminal-green">$</span>{" "}
              <span className="text-terminal-command">loading</span> modules...
            </div>
            <div className="mb-2">
              <span className="text-green-400">[OK]</span> React
            </div>
            <div className="mb-2">
              <span className="text-green-400">[OK]</span> Experience
            </div>
            <div className="mb-2">
              <span className="text-green-400">[OK]</span> Projects
            </div>
            <div className="mb-2">
              <span className="text-green-400">[OK]</span> Skills
            </div>
          </div>
          <div>
            <div className="mb-2">
              <span className="text-terminal-green">$</span>{" "}
              <span className="text-terminal-command">starting</span> portfolio.js
            </div>
            <div className="w-full bg-terminal-lightbg rounded-full h-1 mt-2">
              <motion.div 
                className="bg-terminal-accent rounded-full h-1"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
