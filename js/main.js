document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const loader = document.querySelector('.terminal-loader');

    // Hide main content initially
    mainContent.style.display = 'none';

    // Show content after loader
    setTimeout(() => {
        loader.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.animation = 'fadeIn 0.5s ease';
        }, 500);
    }, 4000); // 4 seconds for loading animation
});
// Add this to your main.js
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');

    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add this to your main.js
document.querySelectorAll('.nav-items .group').forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.currentTarget.querySelector('.nav-tooltip').textContent.toLowerCase();
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Active section tracking
  function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-items .group');
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        navItems.forEach(item => item.querySelector('div').classList.remove('text-blue-500'));
        navItems[index].querySelector('div').classList.add('text-blue-500');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
  
// Content Data
const roles = ["Frontend Dev", "Kotlin Dev", "Graphic Designer"];

const projects = [
    {
        title: "PosturePro",
        description: "PosturePro is a real-time posture detection system that uses a webcam and computer vision to monitor and alert users of poor posture.",
        tags: ["Python", "Streamlit", "Mediapipe", "cv2"],
        github: "https://github.com/tanishpoddar/PosturePro"
    },
    {
        title: "Verschlussel-Entschlussel",
        description: "Python GUI and Streamlit web app for text encryption/decryption.",
        tags: ["Python", "Streamlit"],
        github: "https://github.com/tanishpoddar/Verschlussel-Entschlussel"
    },
    {
        title: "Celestial-Weather",
        description: "Celestial Weather app - fetches weather data via OpenWeatherMap API. Built with HTML, CSS, JavaScript for current weather access.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/tanishpoddar/celestial-weather"
    },
    {
        title: "ShareAcademia",
        description: "ShareAcademia is a Java-based application for managing student academic information, including attendance and GPA calculations, through an intuitive GUI.",
        tags: ["Java", "MySQL", "JDBC", "Swing"],
        github: "https://github.com/tanishpoddar/ShareAcademia"
    }
];

const skills = [
    "HTML5", "CSS3", "Bootstrap", "JavaScript",
    "React", "Node.js", "Kotlin",
    "Git", "Python", "MongoDB", "MySQL", "ExpressJS"
];

const education = [
    {
        school: "SRM Institute of Science and Technology, KTR",
        degree: "B.Tech in Computer Science Engineering",
        period: "2023 - 2027",
        description: "Currently pursuing B.Tech in CSE (Core)",
        achievements: [
            "SRMJEEE Rank : 401",
            "Core Member of Networking Nexus SRM",
            "Graphic Designer at C.Tech Dept"
        ]
    },
    {
        school: "Mother's Global School",
        degree: "High School",
        period: "2011 - 2023",
        description: "Science with CS",
        achievements: [
            "Martial Arts-Bronze Medallist (South Asia)",
            "Nightingale House Prefect",
            "Graphic Designer"
        ]
    }
];

const experience = [
    {
        title: "Graphic Design Intern",
        company: "Climec Labs",
        period: "Jun 2024 - Nov 2024",
        description: "Was involved in creating Ads & handeling Social Media Page",
    },
    {
        title: "Social Media Marketing Intern",
        company: "Mentorsity",
        period: "Feb 2024 - Apr 2024",
        description: "Was involved in creating Ads & handeling Social Media Page",
    }
];

const certificates = [
    {
        title: "Accelerated Computer Science Fundamentals",
        issuer: "University of Illinois Urbana-Champaign",
        date: "Apr 2024",
        url: "https://www.coursera.org/accomplishments/specialization/MJ7K83RH6S2E"
    },
    {
        title: "Cybersecurity for Everyone",
        issuer: "University of Maryland",
        date: "Feb 2024",
        url: "https://www.coursera.org/accomplishments/certificate/GFTRKBREYNXB"
    },
    {
        title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
        issuer: "Amazon Web Services",
        date: "Sep 2023",
        url: "https://www.credly.com/badges/a1f617e5-e990-4e6e-8fbe-4edab3f04500/linked_in_profile"
    }
];

// Typing Animation Class
class TypingAnimation {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.currentWord = 0;
        this.isDeleting = false;
        this.loop();
    }

    async loop() {
        const word = this.words[this.currentWord];
        let text = this.element.textContent;

        if (this.isDeleting) {
            text = word.substring(0, text.length - 1);
        } else {
            text = word.substring(0, text.length + 1);
        }

        this.element.textContent = text;

        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && text === word) {
            delay = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && text === '') {
            this.isDeleting = false;
            this.currentWord = (this.currentWord + 1) % this.words.length;
            delay = 500;
        }

        await new Promise(resolve => setTimeout(resolve, delay));
        this.loop();
    }
}

// Section Population Functions
// Update the GitHub button part in your populateProjects() function
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = `project-card delay-${index + 1}`;

        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const githubButton = project.github ? `
            <button class="btn-github">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z" fill="currentcolor"></path>
                </svg>
                <span>View on Github</span>
            </button>
        ` : '';

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">
                ${tagsHTML}
            </div>
            ${githubButton}
        `;

        projectsGrid.appendChild(card);
    });
}

function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = `skill-item delay-${index + 1}`;
        skillItem.textContent = skill;
        skillsGrid.appendChild(skillItem);
    });
}

function populateEducation() {
    const educationGrid = document.querySelector('.education-grid');
    education.forEach((edu, index) => {
        const card = document.createElement('div');
        card.className = `education-card delay-${index + 1}`;
        card.innerHTML = `
            <h3>${edu.school}</h3>
            <div class="degree">${edu.degree}</div>
            <div class="period">${edu.period}</div>
            <div class="description">${edu.description}</div>
        `;
        educationGrid.appendChild(card);
    });
}

function populateExperience() {
    const timeline = document.querySelector('.timeline');
    experience.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'} delay-${index + 1}`;
        item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${exp.period}</div>
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

function populateCertificates() {
    const certificateGrid = document.querySelector('.certificate-grid');
    certificates.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = `certificate-card delay-${index + 1}`;
        card.innerHTML = `
            <h3>
                <a href="${cert.url}" target="_blank">${cert.title}</a>
            </h3>
            <div class="issuer">${cert.issuer}</div>
            <div class="date">${cert.date}</div>
        `;
        certificateGrid.appendChild(card);
    });
}

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    new TypingAnimation(typingElement, roles);

    populateProjects();
    populateSkills();
    populateEducation();
    populateExperience();
    populateCertificates();

    document.getElementById('year').textContent = new Date().getFullYear();

    document.querySelectorAll('.project-card, .skill-item, .education-card, .timeline-item, .certificate-card')
        .forEach(element => observer.observe(element));

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));
});