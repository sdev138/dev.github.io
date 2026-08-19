import sdevImage from "./assets/sdevCropped.jpg";

const logoText = "Samarth Dev";

const meta = {
  title: "Samarth Dev",
  description: "I am a Product Manager working @ Five9",
};

const introdata = {
  title: "Samarth Dev",
  title2: "Product Manager @ Five9",
  animated: {
    first: "Product Manager",
    second: "Software Engineer",
    third: "Machine Learning Engineer",
    fourth: "Human Computer Interactions",
    fifth: "AI Researcher",
    sixth: "Tennis Player",
    seventh: "Forza Ferrari",
    eighth: "Forza Lewis Hamilton",
  },
  description:
    "Currently working for Five9 as a Product Manager, handling our AI Solutions Products. Previously worked at a startup called AstroSeed as a Machine Learning Engineer where I created a recognition agent that can calculate the health of a plant; and AGI Inc. where I built out their entire infra for training and distilling models.",
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
  // {
  //   jobtitle: "Arizona State University",
  //   where: "M.S. Computer Science",
  //   date: "August 2025 - May 2027",
  // },
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
    title: "Product Manager, Five9",
    period: "June 2026 - Present",
    description:
      "Product Manager for AI Insights, GenAI Studio, Agent Assist, Knowledge Studio & Transcription Services. Revamped AI Insights with an entire new design and workflow. Handled customer feedback sessiosn and demos. Handled and resolved customer issues with sales, Technical Account Managers, and Professional Service personnel. Created different prototypes and features that would be groomed in AI Insights, GenAI Studio, and Knowledge Studio. Dictate necessary UI components and designs for each product. Created an automated dashboard for the Product Management org to handle OKRs and QBR prep, and led an initiative with two other Directors to standardize OKR metrics across the org for executive staff and the Board of Directors.",
  },
  {
    title: "Software Engineer, Five9",
    period: "Jun 2025 - May 2026",
    description:
      "Working under Product Engineering at the AI Insights Team. Responsible for deploying models to different call centers, manage multiple microservices, and handle customer issues. Responsible for the deployment of Llama familty models, and many features for Gen AI Studio. Also the Service Owner for the Monolith Architecture & testing environment for AI Insights",
  },
  {
    title: "Machine Learning Engineer, AGI Inc",
    period: "April 2026 - May 2026 (Part Time)",
    description:
      "Built out entire infrastructure pipeline to train and distill LLMs and SLMs. Quantized and trained different qwen models to run locally on a smartphone",
  },
  {
    title: "Machine Learning Engineer, AstroSeed",
    period: "August 2023 - May 2024",
    description:
      "Produced an accurate CNN model capable of identifying different plants and associated symptoms with a 98.57% accuracy",
  },
];

const volunteeringExperience = [
  {
    title:
      "OTTA United (Formerly Bayreach) - Co-Founder | President and Director of Marketing",
    period: "Jun 2018 - Nov 2019",
    description:
      "Created a social network, a secure network for students and teachers managing user data. Created a network of high schools in the FUHSD school district. Hosted a lecture by Stanford Professor Lin, regarding mental health and student well being",
  },
  {
    title: "Tutorfly - Math Instructor",
    period: "Jul 2018 - Jul 2019",
    description:
      "Algebra 1 and Geometry Instructor for underpriviliged students, who had struggled in Math during the school year. Reduced the number of failing students from 40 to 2",
  },
];

const dataportfolio = [
  {
    title: "DEVim",
    description:
      "A custom neovim distribution with a focus on developer experience and productivity.",
    technologies: ["Neovim", "Lua", "GitHub", "Vimscript"],
    url: "https://github.com/sdev138/DEVim",
  },
  {
    title: "RepoRecall AI",
    description:
      "A web application that uses machine learning to recommend GitHub repositories based on a users goals and preferences.",
    technologies: ["TypeScript", "JavaScript", "CSS", "HTML", "React"],
    url: "https://github.com/sdev138/Repo-Recommender-AI",
  },
  {
    title: "Personal Portfolio Repo",
    description:
      "A personal portfolio website to showcase my projects and skills.",
    technologies: ["JavaScript", "CSS", "HTML", "React"],
    url: "https://github.com/sdev138/dev.github.io",
  },
  {
    title: "Leetcode Solutions",
    description:
      "A collection of my solutions to Leetcode problems for students and prospective SWE's to study",
    technologies: ["Python", "C++"],
    url: "https://github.com/sdev138/Leetcode_Solutions",
  },
  {
    title: "Advent of Code Solutions",
    description:
      "A collection of my solutions to Advent of Code problems for students and prospective SWE's to study",
    technologies: ["Go-lang", "Rust"],
    url: "https://github.com/sdev138/Advent-of-Code",
  },
  {
    title: "Deep ML Solutions",
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
