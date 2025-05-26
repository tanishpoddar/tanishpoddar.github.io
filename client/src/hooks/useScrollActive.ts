import { useState, useEffect, RefObject } from "react";

export default function useScrollActive(
  sectionRefs: {
    [key: string]: RefObject<HTMLElement>;
  }
) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Consider element in view when it's 50% in viewport
        threshold: 0, // Trigger as soon as any part of the element is visible
      }
    );

    // Observe all section refs
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  return activeSection;
}
