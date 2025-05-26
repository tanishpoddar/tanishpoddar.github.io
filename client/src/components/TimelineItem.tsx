import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  tags?: string[];
  technologies?: string[];
  tagTitle?: string;
  delay: number;
  listType?: "list" | "tags";
}

const TimelineItem = ({
  title,
  subtitle,
  period,
  tags = [],
  technologies = [],
  tagTitle = "Key Items:",
  delay,
  listType = "list",
}: TimelineItemProps) => {
  return (
    <motion.div
      className="relative timeline-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="absolute top-5 left-0 w-3.5 h-3.5 rounded-full bg-terminal-accent z-10"></div>
      <div className="pl-6">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
          <h3 className="text-xl font-bold text-terminal-accent">{title}</h3>
          <span className="text-sm text-terminal-green">{period}</span>
        </div>
        <div className="mb-1 text-lg">{subtitle}</div>
        
        {tags.length > 0 && (
          <div className="bg-terminal-lightbg p-3 rounded-md mb-3">
            <p className="text-sm mb-1 text-terminal-green">{tagTitle}</p>
            {listType === "list" ? (
              <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                {tags.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + (index * 0.05) }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.span 
                    key={index} 
                    className="text-xs bg-terminal-bg px-2 py-1 rounded-md"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + (index * 0.05) }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        )}

        {technologies.length > 0 && (
          <div className="bg-terminal-lightbg p-3 rounded-md">
            <p className="text-sm mb-1 text-terminal-green">Technologies & Skills:</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span 
                  key={index} 
                  className="text-xs bg-terminal-bg px-2 py-1 rounded-md"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + (index * 0.05) }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem;