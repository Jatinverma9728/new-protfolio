// ─── Portfolio Data ───────────────────────────────────────────────

export interface Skill {
  name: string;
  image: string;
  level: number; // 0-100
  color: string;
  category: string;
  experience: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

export interface Experience {
  title: string;
  company?: string;
  date: string;
}

export interface Service {
  name: string;
  link: string;
  description: string;
}

// ─── Skills ──────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    name: "React",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    level: 80,
    color: "#61DAFB",
    category: "Frontend",
    experience: "2+ years",
  },
  {
    name: "Python",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    level: 75,
    color: "#ffe05d",
    category: "Language",
    experience: "1+ years",
  },
  {
    name: "Node.js",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    level: 60,
    color: "#68A063",
    category: "Backend",
    experience: "2+ years",
  },
  {
    name: "Express Js",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    level: 60,
    color: "#ff0000",
    category: "Backend",
    experience: "2+ years",
  },
  {
    name: "TypeScript",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    level: 80,
    color: "#3178C6",
    category: "Language",
    experience: "2+ years",
  },
  {
    name: "Next.js",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    level: 70,
    color: "#ffffff",
    category: "Frontend",
    experience: "1.5+ years",
  },
  {
    name: "Tailwind",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    level: 85,
    color: "#38B2AC",
    category: "Frontend",
    experience: "2+ years",
  },
  {
    name: "JavaScript",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    level: 75,
    color: "#F7DF1E",
    category: "Language",
    experience: "2.5+ years",
  },
  {
    name: "MongoDB",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    level: 70,
    color: "#4DB33D",
    category: "Database",
    experience: "1.5+ years",
  },
  {
    name: "MySQL",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-plain-wordmark.svg",
    level: 70,
    color: "#3e6e93",
    category: "Database",
    experience: "1.5+ years",
  },
  {
    name: "Redis",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
    level: 55,
    color: "#D84940",
    category: "Database",
    experience: "6+ months",
  },
  {
    name: "Firebase",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
    level: 65,
    color: "#FF9900",
    category: "Database",
    experience: "1+ years",
  },
  {
    name: "AWS",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    level: 65,
    color: "#FF9900",
    category: "Cloud",
    experience: "6+ months",
  },
  {
    name: "Github",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    level: 75,
    color: "#ffffff",
    category: "Tools",
    experience: "2+ years",
  },
  {
    name: "Git",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    level: 75,
    color: "#F05032",
    category: "Tools",
    experience: "2+ years",
  },
  {
    name: "Docker",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    level: 60,
    color: "#2496ED",
    category: "DevOps",
    experience: "1+ years",
  },
  {
    name: "Kubernetes",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg",
    level: 50,
    color: "#326CE5",
    category: "DevOps",
    experience: "6+ months",
  },
  {
    name: "Jenkins",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
    level: 50,
    color: "#D84940",
    category: "DevOps",
    experience: "6+ months",
  },
  {
    name: "Gitlab",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg",
    level: 50,
    color: "#D84940",
    category: "DevOps",
    experience: "6+ months",
  },
  {
    name: "Terraform",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg",
    level: 50,
    color: "#7B42BC",
    category: "DevOps",
    experience: "6+ months",
  },
];

// ─── Projects ────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "North Tech Hub",
    description:
      "A Modern Scalable and Robust E-commerce Website and an online Course Platform with online payment integration and a user friendly interface.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4YkEF7aed7Q_hWnTanK3RKjtHtUvOn_jBw&s",
    tags: [
      "Next.js", "MongoDB", "Express", "Node.Js", "TypeScript",
      "JavaScript", "TailwindCSS", "Framer Motion", "Redux", "Razorpay",
      "Cloudinary", "JWT", "Render",
    ],
    liveUrl: "https://northtechhub.in/",
    githubUrl: "https://github.com/Jatinverma9728/sunil-sir-project.git",
    color: "#ff0000",
  },
  {
    title: "Acharam",
    description:
      "A full stack e-commerce website for a fictional store called Acharam, built with React, Node.js, Express, MongoDB, and Tailwind CSS. It features user authentication, product browsing, shopping cart functionality, and a responsive design.",
    image:
      "https://www.reshot.com/preview-assets/illustrations/HW724VTQ8D/shopping-data-analysis-HW724VTQ8D-w600.jpg",
    tags: [
      "React", "MongoDB", "Express", "Node.Js", "TypeScript",
      "JavaScript", "TailwindCSS", "Framer Motion", "Redux",
    ],
    liveUrl: "https://acharam.vercel.app/",
    githubUrl: "https://github.com/Jatinverma9728/goldy-achram.git",
    color: "#61DAFB",
  },
  {
    title: "Love File",
    description:
      "A modern web application that provides powerful file conversion tools, enabling users to convert between various image formats and manipulate PDF documents.",
    image:
      "https://img.freepik.com/free-vector/image-upload-concept-landing-page_23-2148319539.jpg?t=st=1756224075~exp=1756227675~hmac=e94dae6f2a22f03b0f2f62d9a7b3cd796f714669cde6f1e7089809c6d1c0d898&w=1480",
    tags: ["Next.js", "TypeScript", "JavaScript", "TailwindCSS", "jsPDF", "PDF-lib"],
    liveUrl: "https://lovefile.shop/",
    githubUrl: "https://github.com/Jatinverma9728/image-pdf-converter--1-.git",
    color: "#61DAFB",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing my skills and projects with smooth animations and responsive design.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/587ff4235471139.Y3JvcCwzOTAxLDMwNTEsOTY1LDUxMQ.jpg",
    tags: ["React", "GSAP", "Three.js", "Framer Motion"],
    liveUrl: "https://devjatin.in/",
    githubUrl: "https://github.com/Jatinverma9728/new-protfolio.git",
    color: "#FF4A4A",
  },
  {
    title: "Portfolio Website Client",
    description:
      "A modern portfolio website showcasing the skills and projects of a client with smooth animations and responsive design.",
    image:
      "https://i.pinimg.com/736x/bc/c9/3c/bcc93cbc1ce46e687f4e61fef7340206.jpg",
    tags: ["React", "GSAP", "Three.js", "Framer Motion"],
    liveUrl: "https://yogeshdev.in/",
    githubUrl: "https://github.com/Jatinverma9728/new-yogesh-portfolio.git",
    color: "#8401ff",
  },
  {
    title: "Chawla Architects",
    description:
      "A modern portfolio website showcasing the architectural projects of Chawla Architects with smooth animations and responsive design.",
    image:
      "https://img.freepik.com/free-vector/creative-office-workers-illustration_33099-2336.jpg?t=st=1756223160~exp=1756226760~hmac=7cff0adb49c3cc994dee3444d42843c58d35f63aa28f80d8b44416d13c81268d&w=1480",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    liveUrl: "https://www.chawlaarchitects.com/",
    githubUrl: "https://github.com/Jatinverma9728/Chawala-Arc-website-project-new-new",
    color: "#00ffdd",
  },
  {
    title: "Premium-Construction",
    description:
      "Premium Construction is a modern, responsive website showcasing a fictional construction company with a focus on clean design and smooth animations.",
    image:
      "https://i.pinimg.com/736x/b1/eb/7e/b1eb7ec6c594fceb0ca71a5449252a93.jpg",
    tags: ["Next.js", "GSAP", "TailwindCSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://premium-construction-1.vercel.app/",
    githubUrl: "https://github.com/Jatinverma9728/premium-construction-1",
    color: "#FF0000",
  },
  {
    title: "Averiq",
    description:
      "Averiq is a modern, responsive website showcasing a fictional tech company website with a focus on clean design and smooth animations.",
    image:
      "https://i.pinimg.com/736x/76/d6/31/76d631d86b984e363bda1781f433d6cb.jpg",
    tags: ["React", "GSAP", "Tailwind CSS", "Framer Motion", "formspree"],
    liveUrl: "https://averiq.vercel.app/",
    githubUrl: "https://github.com/Jatinverma9728/averiq-original.git",
    color: "#22c55e",
  },
];

// ─── Experience ──────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: "Frontend Development",
    date: "June 23 - Present",
  },
  {
    title: "Backend Development",
    date: "Nov 2023 - Present",
  },
  {
    title: "UI Library Development",
    date: "Jan 24 - Present",
  },
  {
    title: "MERN Stack",
    company: "Full Stack Development",
    date: "June 24 - Present",
  },
  {
    title: "Internship - Team Lead Frontend",
    company: "SmallFare",
    date: "March 25 - June 25",
  },
];

// ─── Services ────────────────────────────────────────────────────

export const services: Service[] = [
  {
    name: "Web Development",
    link: "#projects",
    description: "Modern web applications with React & Next.js",
  },
  {
    name: "Frontend Development",
    link: "#skills",
    description: "Responsive and interactive user interfaces",
  },
  {
    name: "Backend Development",
    link: "#experience",
    description: "Scalable backend solutions",
  },
];

// ─── Skill Categories ────────────────────────────────────────────

export const skillCategories = [
  "All", "Frontend", "Backend", "Database", "Language", "Cloud", "Tools", "DevOps",
];

// ─── Social Links ────────────────────────────────────────────────

export const socialLinks = {
  github: "https://github.com/Jatinverma9728",
  linkedin: "https://www.linkedin.com/in/jatinverma9728/",
  email: "vermajatin447@gmail.com",
  resume: "https://drive.google.com/file/d/16EID4qXjN_GrSuNLrBCfVRNRm-vwa2Yj/view?usp=sharing",
};

// ─── Navigation ──────────────────────────────────────────────────

export const navItems = ["About", "Experience", "Skills", "Projects", "Contact"];
