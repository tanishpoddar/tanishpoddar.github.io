import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import TimelineItem from "@/components/TimelineItem";

interface Education {
  title: string;
  institution: string;
  period: string;
}

interface EducationSectionProps {}

const EducationSection = forwardRef<HTMLElement, EducationSectionProps>((props, ref) => {
  const educationItems: Education[] = [
    {
      title: "B.Tech in Computer Science Engineering",
      institution: "SRM Institute of Science and Technology, KTR",
      period: "2023 - 2027",
    },
    {
      title: "High School - 12th (PCM + CS)",
      institution: "Mother's Global School - CBSE",
      period: "2011 - 2023",
    }
  ];

  return (
    <section ref={ref} id="education" className="min-h-screen flex items-center justify-center py-20 px-4">
      <TerminalWindow title="education.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">cat</span> ./education/timeline.json | jq
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Education
          </h2>
          
          <div className="relative pl-8 space-y-10 mb-6">
            {/* Timeline line */}
            <div className="absolute left-3 top-0 h-full w-0.5 bg-terminal-lightbg"></div>
            
            {/* Timeline Items */}
            {educationItems.map((education, index) => (
              <TimelineItem
                key={index}
                title={education.title}
                subtitle={education.institution}
                period={education.period}                delay={index * 0.2}              />
            ))}
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
});

EducationSection.displayName = "EducationSection";

export default EducationSection;
