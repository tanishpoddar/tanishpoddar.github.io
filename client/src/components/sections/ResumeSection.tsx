import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { motion } from "framer-motion";

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

interface ResumeSectionProps {}

const ResumeSection = forwardRef<HTMLElement, ResumeSectionProps>((props, ref) => {
  const certifications: Certification[] = [
    {
      title: "Accelerated Computer Science Fundamentals",
      issuer: "University of Illinois Urbana-Champaign",
      year: "2024"
    },
    {
      title: "Cybersecurity for Everyone",
      issuer: "University of Maryland",
      year: "2024"
    },
    {
      title: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      year: "2023"
    }
  ];

  return (
    <section ref={ref} id="resume" className="min-h-screen flex items-center justify-center py-20 px-4">
      <TerminalWindow title="resume.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">view</span> ./documents/resume.pdf
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Resume
          </h2>
          
          <motion.div 
            className="bg-terminal-lightbg p-6 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <i className="ri-file-pdf-line text-4xl text-terminal-accent mr-3"></i>
                <div>
                  <h3 className="text-xl font-semibold">TanishPoddar-Resume.pdf</h3>
                  <p className="text-sm text-gray-400">Updated: November 2025</p>
                </div>
              </div>
              <a 
                href="/documents/TanishPoddar-Resume.pdf" 
                download
                className="bg-terminal-accent text-terminal-bg px-4 py-2 rounded-md flex items-center hover:bg-opacity-80 transition-colors"
                aria-label="Download Resume"
              >
                <i className="ri-download-line mr-2"></i> Download Resume
              </a>
            </div>
            
            <div className="aspect-[3/4] bg-gray-800 rounded-md border border-gray-700 flex items-center justify-center">
              <iframe
                src="/documents/TanishPoddar-Resume.pdf#toolbar=0"
                className="w-full h-full rounded-md"
                title="Resume Preview"
              />
            </div>
          </motion.div>
          
          <div className="mb-4">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">ls</span> ./documents/certifications/
          </div>
          
          <motion.div 
            className="ml-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-terminal-accent">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  className="bg-terminal-lightbg p-4 rounded-md flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  <i className="ri-award-line text-2xl text-terminal-accent mr-3"></i>
                  <div>
                    <h4 className="font-medium">{cert.title}</h4>
                    <p className="text-sm text-gray-400">{cert.issuer} • {cert.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </TerminalWindow>
    </section>
  );
});

ResumeSection.displayName = "ResumeSection";

export default ResumeSection;
