import { forwardRef, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/TerminalWindow";
import ProjectCard from "@/components/ProjectCard";
import LoadingScreen from "../LoadingScreen";

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  socialPreview: string;
}

interface ProjectsSectionProps {}

const ProjectsSection = forwardRef<HTMLElement, ProjectsSectionProps>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // List of repositories in specific order
  const repositoryList = [
    "tanishpoddar/Moodify",
    "tanishpoddar/NeuralNexus",
    "tanishpoddar/PosturePro",
    "tanishpoddar/LogiTrack",
    "tanishpoddar/FaceLock",
    "tanishpoddar/EventFlow",
    "tanishpoddar/ShareAcademia",
    "tanishpoddar/CelestialWeather"
  ];
  
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (!githubToken) {
          throw new Error("GitHub token not found in environment variables");
        }

        const projectsData = await Promise.all(
          repositoryList.map(async (repo) => {
            const [owner, repoName] = repo.split('/');
            const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${githubToken}`
              }
            });
            if (!response.ok) {
              throw new Error(`GitHub API error: ${response.statusText}`);
            }
            const data = await response.json();
            
            // Use GitHub's default social preview image with the correct format
            let socialPreview;
            if (repoName === "NeuralNexus") {
              socialPreview = `https://opengraph.githubassets.com/1/${owner}/${repoName}/blob/master/README.md`;
            } else {
              socialPreview = `https://opengraph.githubassets.com/1/${owner}/${repoName}/blob/main/README.md`;
            }
            
            return {
              ...data,
              socialPreview
            };
          })
        );
        
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  // Handle horizontal scroll with mouse drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = containerRef.current;
    if (!slider) return;
    
    let startX = e.pageX - slider.offsetLeft;
    let scrollLeft = slider.scrollLeft;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };
    
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section ref={ref} id="projects" className="min-h-screen flex items-center justify-center py-20 px-4">
      <TerminalWindow title="projects.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">find</span> ./projects -type f -name "*.js" | sort
        </div>
        <div className="ml-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Projects
          </h2>
          <p className="mb-4">Swipe or scroll to explore my projects →</p>
          
          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <motion.div 
              className="overflow-x-auto custom-scrollbar py-4 -mx-4 horizontal-scroll"
              ref={containerRef}
              onMouseDown={handleMouseDown}
              whileTap={{ cursor: "grabbing" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex space-x-4 px-4">
                {projects.map((repo, index) => (
                  <ProjectCard 
                    key={repo.id}
                    project={{
                      id: repo.id,
                      title: repo.name,
                      description: repo.description || "No description available",
                      image: repo.socialPreview,
                      technologies: [
                        ...(repo.language ? [repo.language] : []),
                        ...(repo.topics ? repo.topics.slice(0, 2) : [])
                      ].filter(Boolean),
                      githubUrl: repo.html_url,
                      demoUrl: repo.homepage || "",
                      stars: repo.stargazers_count,
                      forks: repo.forks_count
                    }}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
