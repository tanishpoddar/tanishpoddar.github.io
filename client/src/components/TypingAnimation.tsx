import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  delayStart?: number;
}

const TypingAnimation = ({
  text,
  typingSpeed = 100,
  delayStart = 500,
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let currentIndex = 0;

    // Delay start of typing animation
    timer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }, delayStart);

    return () => clearTimeout(timer);
  }, [text, typingSpeed, delayStart]);

  return (
    <div className="inline-flex items-center">
      <motion.p className="text-xl md:text-2xl text-terminal-green">
        {displayText}
        {isTyping && (
          <motion.span
            className="inline-block h-full"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            |
          </motion.span>
        )}
      </motion.p>
    </div>
  );
};

export default TypingAnimation;
