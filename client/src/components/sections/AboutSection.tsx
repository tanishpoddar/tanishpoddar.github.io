import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { motion } from "framer-motion";

interface AboutSectionProps {}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((props, ref) => {
  return (
    <section ref={ref} id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
      <TerminalWindow title="about.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">cat</span> ./about_me.md
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            About Me
          </h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.p 
                className="leading-relaxed mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I am a passionate Full Stack Developer with a strong foundation in web technologies and a keen eye for creating seamless user experiences. My journey in tech is driven by a constant desire to learn and innovate.
              </motion.p>
              <motion.p 
                className="leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Outside of tech, I am a professional martial artist. I hold a Blue-II belt in Shotokan Karate and won a Bronze Medal in the 2019 South Asian Championship.
              </motion.p>
            </motion.div>
            <motion.div 
              className="md:w-1/3 mt-6 md:mt-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-terminal-accent flex items-center justify-center bg-terminal-lightbg">
                <img 
                  src="/images/profile.jpg"
                  alt="Tanish Poddar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/profile.jpg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">grep</span> "interests" about_me.md
        </div>
        <motion.div 
          className="ml-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="mb-2 text-terminal-green">Interests:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Kotlin Dev</li>
            <li>AWS Cloud & DevOps</li>
            <li>System Design & Architecture</li>
            <li>Python Apps Dev</li>
            <li>Full Stack Web Dev</li>
          </ul>
        </motion.div>
      </TerminalWindow>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
