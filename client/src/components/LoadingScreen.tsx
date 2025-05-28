import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const messages = [
    'Initializing components...',
    'Loading modules...',
    'Fetching portfolio data...',
    'Compiling experience...',
    'Ready!'
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let messageIndex = 0;

    const showMessage = () => {
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        setDisplayedMessages(prev => [...prev, currentMessage]);
        messageIndex++;
        setTimeout(showMessage, 500); // Delay before showing the next message
      }
    };

    // Start showing messages after a delay
    const initialMessageDelay = setTimeout(() => showMessage(), 1000); // Initial delay before the first message

    // Progress bar will be handled by CSS transition based on loadingProgress state updates later

    return () => {
      clearTimeout(initialMessageDelay);
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
            <div id="message-output" className="text-sm mb-2">
              {displayedMessages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>            <div className="mb-2">
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
