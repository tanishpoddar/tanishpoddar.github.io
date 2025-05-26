import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import TimelineItem from "@/components/TimelineItem";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities?: string[];
  projects?: string[];
  technologies?: string[];
  type: "responsibilities" | "projects" | "technologies";
}

interface ExperienceSectionProps {}

const ExperienceSection = forwardRef<HTMLElement, ExperienceSectionProps>((props, ref) => {
  const experiences: Experience[] = [
    {
      title: "Core Team Member",
      company: "Networking Nexus Club, SRM Institute of Science and Technology",
      period: "2024 - Present",
      description: "Leading technical initiatives and managing club operations at SRMIST Kattankulathur, India.",
      responsibilities: [
        "Organized an IoT workshop attended by over 120 participants, generating 15% growth in club revenue",
        "Collaborated with 6 cross-functional teams to execute industry and departmental projects successfully",
        "Increased project success rate by 25% by streamlining workflows and integrating advanced IoT tools",
        "Led and mentored a team of 10 students, enhancing technical expertise and ensuring timely project delivery",
        "Partnered with faculty and industry professionals to deliver high-impact training sessions and workshops"
      ],
      technologies: ["Communication", "API", "Front-End Development", "Graphic Design", "Kotlin", "Leadership", "Organization Skills", "Soft Skills"],
      type: "responsibilities"
    },
    {
      title: "Graphic Designer",
      company: "School of Computing, SRMIST",
      period: "Nov 2023 - Oct 2024",
      description: "Led graphic design initiatives for the School of Computing department.",
      responsibilities: [
        "Contributed to the design of the department's newsletter 'Smart Sprinklers' for multiple issues",
        "Designed the brochure for the department's NAAC visit, representing academic and institutional strengths",
        "Contributed to the design of the section N1 magazine, Nebula"
      ],
      technologies: ["Graphic Design", "Creative Ideation"],
      type: "responsibilities"
    },
    {
      title: "Web Dev Team Member",
      company: "Team Envision",
      period: "Apr 2024 - Present",
      description: "Contributing to web development initiatives and event management at SRMIST's largest technical fest.",
      responsibilities: [
        "Developing and maintaining Aarush's Inventory Management System, streamlining resource allocation and tracking",
        "Playing a key role in organizing SRMIST's flagship technical fest, one of India's largest collegiate tech events",
        "Collaborating with cross-functional teams to ensure seamless execution of technical workshops and competitions"
      ],
      technologies: ["API", "Front-End Development", "Node.js", "Technical Communication", "Streamlit", "Event Management", "Team Collaboration"],
      type: "responsibilities"
    }
  ];

  return (
    <section ref={ref} id="experience" className="min-h-screen flex items-center justify-center py-20 px-4">
      <TerminalWindow title="experience.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">cat</span> ./experience/career.log
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Work Experience
          </h2>
          
          <div className="relative pl-8 space-y-10 mb-6">
            {/* Timeline line */}
            <div className="absolute left-3 top-0 h-full w-0.5 bg-terminal-lightbg"></div>
            
            {/* Experience Items */}
            {experiences.map((experience, index) => (
              <TimelineItem
                key={index}
                title={experience.title}
                subtitle={experience.company}
                period={experience.period}
                tags={experience.responsibilities}
                technologies={experience.technologies}
                delay={index * 0.2}
                tagTitle="Key Responsibilities:"
                listType="list"
              />
            ))}
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
