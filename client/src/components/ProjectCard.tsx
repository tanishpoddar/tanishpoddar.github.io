import { motion } from "framer-motion";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  stars: number;
  forks: number;
}

interface ProjectCardProps {
  project: Project;
  delay: number;
}

const ProjectCard = ({ project, delay }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Function to truncate text to 4 lines
  const truncateText = (text: string, maxLines: number = 4) => {
    const lines = text.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...';
    }
    return text;
  };

  return (
    <motion.div
      className="project-card w-72 md:w-80 flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay }}
      whileHover={{ y: -5 }}
    >
      <div className="terminal-window bg-terminal-bg border border-gray-700 rounded-lg overflow-hidden shadow-lg h-full">
        <div className="terminal-header flex items-center p-3 bg-terminal-lightbg border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="ml-2 text-sm text-terminal-text">project-{project.id.toString().padStart(2, '0')}.js</div>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100%-3rem)]">
          <div className="aspect-video mb-3 bg-terminal-lightbg rounded-md overflow-hidden flex items-center justify-center">
            {!imageError ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-terminal-lightbg">
                <i className="ri-code-line text-4xl text-terminal-accent opacity-70"></i>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-terminal-accent mb-2">{project.title}</h3>
          <p className="text-sm mb-4 line-clamp-4">{truncateText(project.description)}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 2).map((tech, index) => (
              <span 
                key={index} 
                className="text-xs bg-terminal-lightbg px-2 py-1 rounded-md text-terminal-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4 mb-4 text-sm text-terminal-text">
            <div className="flex items-center">
              <i className="ri-star-line mr-1"></i>
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center">
              <i className="ri-git-branch-line mr-1"></i>
              <span>{project.forks}</span>
            </div>
          </div>

          <div className="flex space-x-3 mt-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-terminal-accent hover:text-terminal-green transition-colors text-sm flex items-center"
            >
              <i className="ri-github-line mr-1"></i> GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-terminal-accent hover:text-terminal-green transition-colors text-sm flex items-center"
              >
                <i className="ri-external-link-line mr-1"></i> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
