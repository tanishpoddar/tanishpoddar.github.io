import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { motion } from "framer-motion";

interface SkillItemProps {
  name: string;
  percentage: number;
  delay: number;
}

const SkillItem = ({ name, percentage, delay }: SkillItemProps) => (
  <motion.div 
    className="skill-item"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay }}
  >
    <div className="flex justify-between mb-1">
      <span>{name}</span>
      <span className="text-terminal-accent">{percentage}%</span>
    </div>
    <div className="w-full bg-terminal-lightbg rounded-full h-2">
      <motion.div 
        className="bg-terminal-accent h-2 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 1 }}
      />
    </div>
  </motion.div>
);

interface SkillSectionProps {}

const SkillsSection = forwardRef<HTMLElement, SkillSectionProps>((props, ref) => {
  const frontendSkills = [
    { name: "React", percentage: 90 },
    { name: "JavaScript / TypeScript", percentage: 85 },
    { name: "HTML & CSS", percentage: 95 },
    { name: "Redux", percentage: 80 },
  ];

  const backendSkills = [
    { name: "Node.js", percentage: 85 },
    { name: "Express", percentage: 80 },
    { name: "MongoDB", percentage: 75 },
    { name: "SQL", percentage: 70 },
  ];

  const devOpsSkills = [
    { name: "Git & GitHub", percentage: 90 },
    { name: "Docker", percentage: 75 },
    { name: "AWS", percentage: 70 },
  ];

  const otherSkills = [
    { name: "UI/UX Design", percentage: 80 },
    { name: "Testing (Jest/React Testing Library)", percentage: 75 },
    { name: "Progressive Web Apps", percentage: 65 },
  ];

  return (
    <section ref={ref} id="skills" className="min-h-screen flex items-center justify-center py-20 px-4">
      <TerminalWindow title="skills.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">ls -la</span> ./skills/
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frontend */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-terminal-green">
                Frontend
              </h3>
              <div className="space-y-4">
                {frontendSkills.map((skill, index) => (
                  <SkillItem 
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            </div>
            
            {/* Backend */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-terminal-green">
                Backend
              </h3>
              <div className="space-y-4">
                {backendSkills.map((skill, index) => (
                  <SkillItem 
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={0.1 * (index + frontendSkills.length)}
                  />
                ))}
              </div>
            </div>
            
            {/* DevOps & Tools */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-terminal-green">
                DevOps & Tools
              </h3>
              <div className="space-y-4">
                {devOpsSkills.map((skill, index) => (
                  <SkillItem 
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={0.1 * (index + frontendSkills.length + backendSkills.length)}
                  />
                ))}
              </div>
            </div>
            
            {/* Other Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-terminal-green">
                Other Skills
              </h3>
              <div className="space-y-4">
                {otherSkills.map((skill, index) => (
                  <SkillItem 
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={0.1 * (index + frontendSkills.length + backendSkills.length + devOpsSkills.length)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
