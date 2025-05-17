import sdevImage from "./assets/sdevCropped.jpg";
import devimImage from "./assets/DEVim.png";
import deepMLImage from "./assets/deep-ml.jpg";
import aocImage from "./assets/advent_of_code_logo.jpeg";
import leetImage from "./assets/leetcode.png";
import repoRecallImage from "./assets/RepoRecallImage.jpg";
import personalPortImage from "./assets/PersonalPortfolioImage.png";

const logoText = "Samarth Dev";

const meta = {
  title: "Samarth Dev",
  description: "I am a Software Engineer working in Sunnyvale, CA",
};

const introdata = {
  title: "Samarth Dev",
  title2: "Computer Science @ Arizona State University",
  animated: {
    first: "Software Engineer Intern",
    second: "Machine Learning Engineer",
    third: "Human Computer Interactions",
    fourth: "AI Researcher",
    fifth: "Tennis Player",
    sixth: "Forza Ferrari",
    seventh: "Forza Lewis Hamilton",
  },
  description:
    "Currently looking for software engineering internships. Previously worked at a startup called AstroSeed as a Machine Learning Engineer. Created a recognition agent that can calculate the health of a plant.",
  description2:
    "My hobbies include contributing to open-source projects, this includes DEVim, a custom Neovim distribution as well as tinkering with different Linux distros.",
  your_img_url: sdevImage,
};

const dataabout = {
  title: "research interests",
  aboutme:
    "My primary research focus in on the development of AI tools, to enhance the productivity and accessibility of different devices for the general public. This includes improving the UI/UX of headsets, to be deployed in a Navy ship in the Pacific Ocean. It isn't just productivity and efficiency of machine learning programs that interests me, but also the understanding and replication of human intelligence and creativity. To understand our minds and the development of critical thinking, has a greater impact on the overall creativity of a person. Since the dawn of the Personal Computer Revolution, this has consisted of molding the general public to adopt devices. My research involves understanding the human condition, to mold devices to truly improve the daily lives of the public, as well as enhancing and improving human creativity.",
};

const worktimeline = [
  {
    jobtitle: "Arizona State University",
    where: "M.S. Computer Science",
    date: "August 2025 - May 2027",
  },
  {
    jobtitle: "Arizona State University",
    where: "B.S. Computer Science",
    date: "August 2020 - May 2024",
  },
];

const researcherExperience = [
  {
    title: "National Security Innovation Network - Machine Learning Researcher",
    period: "January 2022 - May 2023",
    description:
      "Researched image classifiers that can determine the state of the exterior hull of a ship, and manage protocols of a ship increasing a crew's productivity and safety when in dangerous environments. This research was conducted as a partnership between Arizona State University and the United States Department of Defense",
  },
  {
    title: "ASU - Student Researcher",
    period: "August 2021 - December 2021",
    description:
      "Cooperated with the United States Navy to perform market research on viable, cost-effective products, that could assess damages to a ship and/or carrier, from a remote environment. Supervised by the Assistant Vice-President of Arizona State University and Former Senior Policy Advisor to the President of the United States, Drew Trojanowski.",
  },
  {
    title: "ASU - Machine Learning Researcher",
    period: "August 2021 - December 2021",
    description:
      "Implemented Twitter Developer API (TweePy, now called X) to predict and observe trends in volatile stock options. Calculated, discussed, and presented possible risks with stock based on personality than product.",
  },
];

const workExperience = [
  {
    title: "Five9 - Software Engineer Intern Product",
    period: "Jun 2025 - Present",
    description: "",
  },
  {
    title: "AstroSeed - Machine Learning Engineer",
    period: "August 2023 - May 2024",
    description:
      "Produced an accurate CNN model capable of identifying different plants and associated symptoms with a 98.57% accuracy",
  },
  {
    title: "Private Tennis Instructor",
    period: "May 2020 - August 2021",
    description: "Taught tennis to multiple age groups and skill levels",
  },
];

const volunteeringExperience = [
  {
    title: "Machine Learning Club @ ASU - Head of Recruitment",
    period: "Nov 2021 - Mar 2022",
    description: "Recruited technical developers, held student lectures, manage and directed events and competitions",
  },
  {
    title: "OTTA United (Formerly Bayreach) - Co-Founder | President and Director of Marketing",
    period: "Jun 2018 - Nov 2019",
    description: "Created a social network, a secure network for students and teachers managing user data. Created a network of high schools in the FUHSD school district. Hosted a lecture by Stanford Professor Lin, regarding mental health and student well being",
  },
  {
    title: "Tutorfly - Math Instructor",
    period: "Jul 2018 - Jul 2019",
    description: "Algebra 1 and Geometry Instructor for underpriviliged students, who had struggled in Math during the school year. Reduced the number of failing students from 40 to 2"
  },
]

const dataportfolio = [
  {
    title: "DEVim",
    image: devimImage,
    description:
      "A custom neovim distribution with a focus on developer experience and productivity.",
    technologies: ["Neovim", "Lua", "GitHub", "Vimscript"],
    url: "https://github.com/sdev138/DEVim",
  },
  {
    title: "RepoRecall AI",
    image: repoRecallImage,
    description:
      "A web application that uses machine learning to recommend GitHub repositories based on a users goals and preferences.",
    technologies: ["TypeScript", "JavaScript", "CSS", "HTML", "React"],
    url: "https://github.com/sdev138/Repo-Recommender-AI",
  },
  {
    title: "Personal Portfolio",
    image: personalPortImage,
    description:
      "A personal portfolio website to showcase my projects and skills.",
    technologies: ["JavaScript", "CSS", "HTML", "React"],
    url: "https://github.com/sdev138/dev.github.io"
  },
  {
    title: "Leetcode Solutions",
    image: leetImage,
    description:
      "A collection of my solutions to Leetcode problems for students and prospective SWE's to study",
    technologies: ["Python", "C++"],
    url: "https://github.com/sdev138/Leetcode_Solutions",
  },
  {
    title: "Advent of Code Solutions",
    image: aocImage,
    description:
      "A collection of my solutions to Advent of Code problems for students and prospective SWE's to study",
    technologies: ["Go-lang", "Rust"],
    url: "https://github.com/sdev138/Advent-of-Code",
  },
  {
    title: "Deep ML Solutions",
    image: deepMLImage,
    description:
      "A collection of my solutions to Deep-ML problems for students and prospective SWE's to study",
    technologies: ["Python"],
    url: "https://github.com/sdev138/Deep-ML-Solutions",
  },
];

const contactConfig = {
  YOUR_EMAIL: "samarthdev138@gmail.com",
  github: "https://github.com/sdev138",
  linkedin: "https://www.linkedin.com/in/samarth-dev/",
  twitter: "",
  bluesky: "",
  gscholar: "",
  cv: "",
  description: "Feel free to contact me and keep in touch ✌🏾",
};

const socialprofils = {
  github: "https://github.com/sdev138",
  linkedin: "https://www.linkedin.com/in/samarth-dev/",
  scholar: "https://scholar.google.com/citations?user=ByJ5jz4AAAAJ&hl=en",
  bluesky: "",
  twitter: "",
};

export {
  meta,
  dataabout,
  dataportfolio,
  worktimeline,
  workExperience,
  researcherExperience,
  volunteeringExperience,
  introdata,
  contactConfig,
  socialprofils,
  logoText,
};
