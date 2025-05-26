import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalWindowProps {
  children: ReactNode;
  title: string;
  className?: string;
}

const TerminalWindow = ({ children, title, className = "" }: TerminalWindowProps) => {
  return (
    <motion.div 
      className={`terminal-window w-full max-w-4xl bg-terminal-bg border border-gray-700 rounded-lg overflow-hidden shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-header flex items-center p-3 bg-terminal-lightbg border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="ml-2 text-sm text-terminal-text">{title}</div>
      </div>
      <div className="p-6 md:p-10">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
