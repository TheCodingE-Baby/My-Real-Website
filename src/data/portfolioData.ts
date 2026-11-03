import { Project, Experience, Education, Article, GuestbookEntry, GithubRepo, Interest, FamilyMember } from '../types';

export const PERSONAL_INFO = {
  name: 'Eyob Fikre',
  fullName: 'Eyob Fikre Enquoselassie',
  title: 'Software Engineering Student & Builder',
  location: 'Addis Ababa, Ethiopia (UTC+3 / EAT)',
  email: 'eyobfik5@gmail.com',
  telegramHandle: '@E_BabMan95',
  status: 'Open for projects, internships & tech chats',
  bio: "Hey there! I'm Eyob, a software engineering student at AAiT (Addis Ababa Institute of Technology). I love building practical web apps, experimenting with mobile on Android (Jetpack Compose & Flutter), tinkering with computer graphics, and exploring algorithms. When I'm not coding coursework, you'll find me hanging out on Telegram or hacking on side projects.",
  heroHeadline: "Hey, I'm Eyob — I build web apps, mobile tools, and love clean design.",
  logoUrl: '/assets/aistudio/Combine_E_and_F_d6889eaf.png',
  avatarUrl: '/assets/aistudio/Me_f700750c.jpg',
  codingPhotoUrl: '/assets/aistudio/Me2_1371af72.jpg',
  workspaceUrl: '/assets/aistudio/Me2_1371af72.jpg',
  stats: [
    { label: 'AAiT Degree Track', value: 'Software Eng' },
    { label: 'Matric Total Score', value: '480 / 600' },
    { label: 'Public Repos', value: '9+' },
    { label: 'Timezone', value: 'EAT (UTC+3)' },
  ],
  socials: {
    github: 'https://github.com/TheCodingE-Baby',
    telegram: 'https://t.me/E_BabMan95',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    email: 'mailto:eyobfik5@gmail.com',
  },
};

export const GITHUB_REPOS: GithubRepo[] = [
  {
    id: 'my-website',
    name: 'My-Website',
    fullName: 'TheCodingE-Baby/My-Website',
    description:
      'My personal portfolio website built with HTML, CSS, JavaScript, and interactive tools.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/My-Website',
    language: 'HTML',
    stars: 1,
    forks: 0,
    updatedAt: 'Recently updated',
    topics: ['personal-website', 'frontend', 'portfolio', 'html5', 'javascript'],
    isFeatured: true,
    cloneUrl: 'https://github.com/TheCodingE-Baby/My-Website.git',
    license: 'MIT',
    readmePreview:
      '# My-Website\nMy personal portfolio repo where I showcase my projects, helpful little web tools, and experiments.',
  },
  {
    id: 'dsa-assignments',
    name: 'DSA-Assignments',
    fullName: 'TheCodingE-Baby/DSA-Assignments',
    description:
      'Data Structures & Algorithms coursework at AAiT: sorting algorithms, binary search trees, and graph problems implemented in Java.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/DSA-Assignments',
    language: 'Java',
    stars: 2,
    forks: 1,
    updatedAt: 'AAiT Coursework',
    topics: ['data-structures', 'algorithms', 'java', 'aait', 'trees-and-graphs'],
    isFeatured: true,
    cloneUrl: 'https://github.com/TheCodingE-Baby/DSA-Assignments.git',
    license: 'MIT',
    readmePreview:
      '# Data Structures & Algorithms (AAiT)\nMy implementations of classic data structures, recursive search, and graph traversal algorithms in Java.',
  },
  {
    id: 'graphics-project',
    name: 'Graphics-Project',
    fullName: 'TheCodingE-Baby/Graphics-Project',
    description:
      'Interactive computer graphics project with 3D geometric transformations, lighting models, and viewport projections in JavaScript / WebGL.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/Graphics-Project',
    language: 'JavaScript',
    stars: 2,
    forks: 0,
    updatedAt: 'AAiT Computer Graphics',
    topics: ['computer-graphics', 'webgl', 'javascript', '3d-rendering', 'transformations'],
    isFeatured: true,
    cloneUrl: 'https://github.com/TheCodingE-Baby/Graphics-Project.git',
    license: 'MIT',
    readmePreview:
      '# Computer Graphics Project\nInteractive 3D viewport featuring matrix transformations, lighting, and camera perspectives.',
  },
  {
    id: 'jetpack-compose-2',
    name: 'JetPack-Compose-Assignment-2',
    fullName: 'TheCodingE-Baby/JetPack-Compose-Assignment-2',
    description:
      'Native Android mobile app built with Kotlin and Jetpack Compose declarative UI, state management, and coroutines.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/JetPack-Compose-Assignment-2',
    language: 'Kotlin',
    stars: 1,
    forks: 0,
    updatedAt: 'Android Track',
    topics: ['android', 'kotlin', 'jetpack-compose', 'mobile-ui', 'coroutines'],
    isFeatured: false,
    cloneUrl: 'https://github.com/TheCodingE-Baby/JetPack-Compose-Assignment-2.git',
    license: 'Apache-2.0',
    readmePreview:
      '# Jetpack Compose Android App\nFun reactive Android app experimenting with modern Jetpack Compose layouts and state management.',
  },
  {
    id: 'flutter-lab-3',
    name: 'Flutter-Lab-Assignment-3',
    fullName: 'TheCodingE-Baby/Flutter-Lab-Assignment-3',
    description:
      'Cross-platform mobile app built with Flutter and Dart, with responsive screens and slick animations.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/Flutter-Lab-Assignment-3',
    language: 'Flutter',
    stars: 1,
    forks: 0,
    updatedAt: 'Mobile Systems',
    topics: ['flutter', 'dart', 'mobile', 'cross-platform', 'cpp'],
    isFeatured: false,
    cloneUrl: 'https://github.com/TheCodingE-Baby/Flutter-Lab-Assignment-3.git',
    license: 'MIT',
  },
  {
    id: 'linearstacks-lab',
    name: 'LinearStacks-Lab',
    fullName: 'TheCodingE-Baby/LinearStacks-Lab',
    description:
      'Linear data structure lab covering LIFO stacks, dynamic memory management, and expression evaluation in C++.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/LinearStacks-Lab',
    language: 'C++',
    stars: 0,
    forks: 0,
    updatedAt: 'Systems Track',
    topics: ['data-structures', 'stacks', 'cpp', 'memory-management'],
    isFeatured: false,
    cloneUrl: 'https://github.com/TheCodingE-Baby/LinearStacks-Lab.git',
    license: 'MIT',
  },
  {
    id: 'github-pages',
    name: 'TheCodingE-Baby.github.io',
    fullName: 'TheCodingE-Baby/TheCodingE-Baby.github.io',
    description:
      'My GitHub Pages site for hosting web projects and personal prototypes.',
    htmlUrl: 'https://github.com/TheCodingE-Baby/TheCodingE-Baby.github.io',
    language: 'HTML',
    stars: 1,
    forks: 0,
    updatedAt: 'Live Deployment',
    topics: ['github-pages', 'web', 'deployment'],
    isFeatured: false,
    cloneUrl: 'https://github.com/TheCodingE-Baby/TheCodingE-Baby.github.io.git',
    license: 'MIT',
  },
  {
    id: 'figma-portfolio',
    name: 'UGR-9963-15-figma-prototype-portfolio',
    fullName: 'TheCodingE-Baby/UGR-9963-15-figma-prototype-portfolio',
    description:
      'AAiT Software Engineering portfolio prototype created in Figma (Student Roll: UGR/9963/15).',
    htmlUrl: 'https://github.com/TheCodingE-Baby/UGR-9963-15-figma-prototype-portfolio',
    language: 'Design',
    stars: 0,
    forks: 0,
    updatedAt: 'AAiT SE Project',
    topics: ['figma', 'ui-ux', 'aait', 'software-engineering'],
    isFeatured: false,
    cloneUrl: 'https://github.com/TheCodingE-Baby/UGR-9963-15-figma-prototype-portfolio.git',
    license: 'Creative Commons',
  },
  {
    id: 'assessment-2',
    name: 'Assessment-2_Eyob-Fikre-Enquoselassie_9963_2',
    fullName: 'TheCodingE-Baby/Assessment-2_Eyob-Fikre-Enquoselassie_9963_2',
    description:
      'AAiT software engineering practical assessment submission by Eyob Fikre Enquoselassie (ID: 9963, Section 2).',
    htmlUrl: 'https://github.com/TheCodingE-Baby/Assessment-2_Eyob-Fikre-Enquoselassie_9963_2',
    language: 'HTML',
    stars: 0,
    forks: 0,
    updatedAt: 'AAiT Assessment',
    topics: ['aait', 'assessment', 'web-engineering', 'eyob-fikre'],
    isFeatured: false,
    cloneUrl: 'https://github.com/TheCodingE-Baby/Assessment-2_Eyob-Fikre-Enquoselassie_9963_2.git',
    license: 'Academic',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'strata-cloud',
    title: 'StrataMesh Edge Router',
    tagline: 'Fast, lightweight edge router built to test low-latency failover.',
    category: 'systems',
    year: '2026',
    image: '/src/assets/images/project_cloud_platform_1793727402698.jpg',
    githubUrl: 'https://github.com/TheCodingE-Baby',
    demoUrl: 'https://github.com/TheCodingE-Baby',
    stack: ['Go', 'TypeScript', 'eBPF', 'gRPC', 'Redis'],
    metrics: [
      { label: 'Failover Time', value: '< 10ms' },
      { label: 'Throughput', value: '1.2 GB/s' },
      { label: 'Memory Footprint', value: '16 MB' },
    ],
    overview:
      'A fun experimental project exploring how service meshes handle traffic switches when network connections drop, testing routing performance and recovery.',
    architecture: [
      'eBPF socket inspection for zero-copy packet dispatching.',
      'Lightweight Raft consensus protocol over secure TLS.',
      'Live web dashboard showing connection health and latency in real time.',
    ],
    keyOutcomes: [
      'Tested fast node recovery without dropping in-flight requests.',
      'Kept memory footprint under 20MB per container.',
      'Learned a ton about network sockets and packet routing.',
    ],
  },
  {
    id: 'kinetic-canvas',
    title: 'Kinetic Canvas Engine',
    tagline: 'A browser-based vector playground built with WebGL and TypeScript.',
    category: 'creative',
    year: '2025',
    image: '/src/assets/images/project_creative_canvas_1793727408456.jpg',
    githubUrl: 'https://github.com/TheCodingE-Baby/Graphics-Project',
    demoUrl: 'https://github.com/TheCodingE-Baby/Graphics-Project',
    stack: ['React 19', 'TypeScript', 'WebGL', 'Tailwind CSS'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Canvas Shapes', value: '25k+' },
      { label: 'Load Time', value: 'Instant' },
    ],
    overview:
      'An interactive canvas inspired by my computer graphics coursework at AAiT. Renders smooth bezier curves, transforms 3D objects, and runs completely in your browser.',
    architecture: [
      'Custom WebGL batch rendering to avoid sluggish DOM re-renders.',
      'Fast math transformations for matrix scaling, rotation, and camera projection.',
      'Intuitive click-and-drag controls for manipulating shapes on the fly.',
    ],
    keyOutcomes: [
      'Smooth 60 frames per second even with thousands of geometric points.',
      'Submitted as a standout project for AAiT Computer Graphics.',
      'Tested across both desktop and mobile browsers.',
    ],
  },
  {
    id: 'pulse-health',
    title: 'Pulse Habit & Focus Companion',
    tagline: 'Simple, private daily habit and focus tracker that works offline.',
    category: 'mobile',
    year: '2025',
    image: '/src/assets/images/project_mobile_health_1793727402780.jpg',
    githubUrl: 'https://github.com/TheCodingE-Baby/JetPack-Compose-Assignment-2',
    demoUrl: 'https://github.com/TheCodingE-Baby/JetPack-Compose-Assignment-2',
    stack: ['Kotlin', 'Jetpack Compose', 'SQLite', 'Coroutines'],
    metrics: [
      { label: 'Offline Ready', value: '100%' },
      { label: 'App Size', value: '8.4 MB' },
      { label: 'Battery Usage', value: 'Minimal' },
    ],
    overview:
      'A calm, distraction-free Android app designed to track daily habits and study sessions without intrusive notifications or creepy cloud trackers.',
    architecture: [
      '100% local SQLite storage so your data stays on your phone.',
      'Clean Jetpack Compose declarative UI with pleasant dark mode.',
      'Background timers managed smoothly with Kotlin coroutines.',
    ],
    keyOutcomes: [
      'Super responsive UI with zero lag on budget Android devices.',
      'Complete privacy with zero ads and zero data tracking.',
      'Helped friends stay consistent during busy AAiT exam weeks.',
    ],
  },
  {
    id: 'quill-toolkit',
    title: 'Everyday Dev Utilities',
    tagline: 'Quick tools for developers: timezone checks, color contrast, and focus audio.',
    category: 'tools',
    year: '2026',
    image: '/src/assets/images/hero_workspace_desk_1793727402056.jpg',
    githubUrl: 'https://github.com/TheCodingE-Baby/My-Website',
    demoUrl: '#tools',
    stack: ['TypeScript', 'Tailwind CSS', 'Web Audio API'],
    metrics: [
      { label: 'Offline First', value: '100%' },
      { label: 'Loading Speed', value: 'Instant' },
      { label: 'Ad-Free', value: 'Always' },
    ],
    overview:
      'A collection of handy little utilities built right into this portfolio. Check timezone overlap with me in Addis Ababa, estimate project schedules, test WCAG contrast, or put on rain sounds while you work.',
    architecture: [
      'Pure client-side logic that works completely offline.',
      'Custom synthesized rain and brown noise using HTML5 Web Audio.',
      'Instant copy-to-clipboard buttons and helpful keyboard shortcuts.',
    ],
    keyOutcomes: [
      'Used daily for quick calculations and color checking.',
      'Zero external server calls or annoying cookies.',
      'Fully responsive for both phone and laptop screens.',
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Software Engineering Student & Project Lead',
    organization: 'Addis Ababa Institute of Technology (AAiT)',
    period: '2022 — Present',
    location: 'Addis Ababa, Ethiopia',
    type: 'engineering',
    summary:
      'Studying software engineering, diving deep into algorithms, operating systems, databases, and mobile/web development. Working on practical team projects and assignments.',
    achievements: [
      'Built and shipped practical coursework projects across Java, Kotlin (Jetpack Compose), Flutter, and JavaScript.',
      'Collaborated in peer coding sprints and helped classmates debug data structures and web lab assignments.',
      'Designed responsive UI prototypes in Figma and translated them into clean code.',
    ],
    technologies: ['Java', 'Kotlin', 'Jetpack Compose', 'Flutter', 'TypeScript', 'React', 'C++'],
  },
  {
    id: 'exp-2',
    role: 'Independent Web & Mobile Builder',
    organization: 'Side Projects & Freelance',
    period: '2023 — Present',
    location: 'Addis Ababa, Ethiopia',
    type: 'architecture',
    summary:
      'Building web applications, client portfolio sites, and interactive tools. Experimenting with modern frontend frameworks and clean UI design.',
    achievements: [
      'Developed and deployed full-stack web prototypes with fast load times and clean accessible styling.',
      'Created custom utility tools like timezone coordinators and audio focus players.',
      'Actively open-sourcing code and sharing repositories on GitHub.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'GitHub Pages'],
  },
  {
    id: 'exp-3',
    role: 'Open Source & Tech Community Member',
    organization: 'AAiT Tech & Developer Circles',
    period: '2023 — Present',
    location: 'Addis Ababa, Ethiopia',
    type: 'oss',
    summary:
      'Active participant in developer meetups, coding labs, and online programming groups. Sharing tips on algorithms and UI development.',
    achievements: [
      'Published open repositories for DSA exercises, 3D graphics, and mobile apps for fellow students.',
      'Helped organize study sessions for core software engineering modules.',
      'Regularly chatting and helping other learners on Telegram (@E_BabMan95).',
    ],
    technologies: ['Git', 'GitHub', 'Java', 'Android SDK', 'Linux', 'Telegram'],
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Sc. in Software Engineering',
    institution: 'Addis Ababa Institute of Technology (AAiT), Addis Ababa University',
    period: '2022 — Present',
    location: 'Addis Ababa, Ethiopia',
    credentialType: 'degree',
    badge: 'In Progress · 3rd Year',
    logo: '/assets/aistudio/photo_2023-06-29_16-44-34_c2993eb3.jpg',
    summary:
      'Studying core software engineering: data structures & algorithms, computer graphics, database systems, mobile computing, and software design.',
    achievements: [
      'Strong coursework performance across programming labs and algorithmic problem solving.',
      'Completed practical assignments in Java, C++, Android Jetpack Compose, Flutter, and WebGL.',
      'Student Roll / ID: UGR/9963/15.',
    ],
  },
  {
    id: 'edu-2',
    degree: 'Ethiopian Secondary School Leaving Examination (ESSLCE Matric)',
    institution: 'FDRE Ministry of Education / EAES (Lideta Catholic Cathedral School Center)',
    period: 'February 2023 (2015 E.C.)',
    location: 'Addis Ababa, Ethiopia',
    credentialType: 'matric',
    badge: 'National Total: 480 / 600',
    certNumber: '3371502',
    image: '/assets/aistudio/Matric_1634d593.jpg',
    scores: [
      { subject: 'English', score: '81' },
      { subject: 'Civics', score: '79' },
      { subject: 'Chemistry', score: '73' },
      { subject: 'Biology', score: '70' },
      { subject: 'Mathematics', score: '64' },
      { subject: 'Physics', score: '58' },
      { subject: 'Aptitude', score: '55' },
    ],
    summary:
      'Earned a competitive 480 mark in the national matriculation entrance exams, securing admission into AAiT software engineering.',
    achievements: [
      'Top-percentile scores in Natural Science stream: English (81), Civics (79), Chemistry (73), and Biology (70).',
      'Earned EAES Certificate of Examination No. 3371502.',
      'Admitted to Addis Ababa University Institute of Technology.',
    ],
  },
  {
    id: 'edu-3',
    degree: 'High School Diploma (Grade 12)',
    institution: 'Lideta Catholic Cathedral School',
    period: 'Completed July 2022',
    location: 'Addis Ababa, Ethiopia',
    credentialType: 'diploma',
    badge: 'Grade 12 Graduate',
    image: '/assets/aistudio/HSDip_d825c327.jpg',
    summary:
      'Completed full course of academic subjects at Lideta Catholic Cathedral School conducted by the Catholic Archdiocese of Addis Ababa.',
    achievements: [
      'Graduated Grade 12 in July 2022 with strong foundational mastery in mathematics, sciences, and humanities.',
      'Active participant in analytical and group study initiatives.',
    ],
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'learning-dsa-in-java-at-aait',
    title: 'What I Learned Implementing Core Data Structures in Java at AAiT',
    excerpt:
      'A student perspective on mastering binary search trees, graph traversals, and sorting algorithms from scratch.',
    date: 'February 2026',
    readTime: '4 min read',
    category: 'Algorithms',
    content: [
      'When you first study Data Structures and Algorithms at AAiT, the theory can feel intimidating with all the Big-O math and recursion diagrams.',
      'What really made things click for me was writing every structure from scratch in Java — manually handling pointers in linked lists, balancing nodes in trees, and visualizing how queues power breadth-first search.',
      'Once you code a graph traversal by hand, understanding real-world systems like routing networks or social graphs suddenly becomes so much more intuitive.',
      'My biggest takeaway: don’t just memorize algorithm steps for an exam; write the code, trace test cases with pen and paper, and break things until you really get why they work.',
    ],
  },
  {
    id: 'art-2',
    slug: 'why-clean-minimal-ui-beats-clutter',
    title: 'Why Clean, Minimal UI Always Beats Pill-Stuffed Clutter',
    excerpt:
      'Thoughts on keeping interfaces breathing, cutting down on visual noise, and letting good typography do the heavy lifting.',
    date: 'January 2026',
    readTime: '3 min read',
    category: 'Design & UI',
    content: [
      'Ever visit a website where every single word is inside a tiny rounded badge or pill container? It feels like reading a spreadsheet that exploded.',
      'When every date, tag, and status has a border around it, your eyes don’t know where to rest. The interface ends up feeling noisy and exhausting.',
      'Good typography — font weight, subtle color shifts, and simple punctuation like middle dots — can communicate hierarchy much more naturally without boxing everything in.',
      'Save containers and cards for things that actually need to stand out, like interactive buttons or main project cards. When the page has room to breathe, everything looks sharper.',
    ],
  },
  {
    id: 'art-3',
    slug: 'getting-started-with-jetpack-compose',
    title: 'Ditching XML: My Experience Building Android Apps with Jetpack Compose',
    excerpt:
      'Why declarative UI in Kotlin made building Android mobile screens so much more fun and fast.',
    date: 'December 2025',
    readTime: '5 min read',
    category: 'Mobile Dev',
    content: [
      'If you have ever wrestled with nested XML layouts, findViewById, and manual adapter code in old-school Android development, you know the pain.',
      'Switching to Jetpack Compose for our AAiT mobile assignment was like a breath of fresh air. Everything is just Kotlin functions describing what the screen should look like based on state.',
      'Handling state hoisting and reactive updates felt so much more intuitive, especially coming from modern React concepts.',
      'If you are starting Android development today, skip the legacy XML tutorials and jump straight into Compose — it saves so much boilerplate and makes building smooth screens a blast.',
    ],
  },
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Kidus T.',
    role: 'AAiT Classmate',
    handle: '@kidus_se',
    message:
      'Eyob is one of the most dedicated builders in our software engineering batch. His graphics project was super inspiring. Keep building cool stuff, man!',
    createdAt: '2 days ago',
    avatarColor: 'bg-blue-500',
    likes: 12,
  },
  {
    id: 'gb-2',
    name: 'Abebe B.',
    role: 'Developer Friend',
    handle: '@abebe_dev',
    message:
      'Checked out your GitHub repos — clean code and great documentation on the DSA assignments. Glad to see AAiT folks building out in the open!',
    createdAt: '1 week ago',
    avatarColor: 'bg-emerald-500',
    likes: 9,
  },
  {
    id: 'gb-3',
    name: 'Selam W.',
    role: 'Tech Enthusiast',
    handle: '@selam_ui',
    message:
      'Love the dark mode and the built-in timezone coordinator! Super clean site design.',
    createdAt: '2 weeks ago',
    avatarColor: 'bg-violet-500',
    likes: 14,
  },
];

export const INTERESTS: Interest[] = [
  {
    id: 'interest-game',
    title: "Assassin's Creed & Narrative Gaming",
    category: 'Gaming & Virtual Worlds',
    image: '/assets/aistudio/Game_8e81f2c9.jpg',
    tagline: 'Historical storytelling, stealth AI, and architectural parkour.',
    description:
      "Huge fan of the Assassin's Creed franchise. What I love most is the sheer craft of historical reconstruction, stealth level mechanics, and character animation. It actually sparked my passion for computer graphics and 3D rendering at AAiT.",
    tags: ["Assassin's Creed", 'Stealth Mechanics', 'World Building', '3D Graphics Inspiration'],
  },
  {
    id: 'interest-car',
    title: 'Classic Performance: AC & Shelby Cobra',
    category: 'Automotive & Design',
    image: '/assets/aistudio/Car1_851b77e7.jpg',
    tagline: 'Timeless aerodynamic curves, raw American muscle, and mechanical craft.',
    description:
      'I have a deep love for vintage sports machines, especially the iconic Shelby / AC Cobra 427. The metallic deep-blue finish, dual white racing stripes, side exhaust pipes, and uncompromising engineering inspire my appreciation for purposeful, timeless aesthetics.',
    tags: ['Shelby Cobra 427', 'Automotive Engineering', 'Classic Speed', 'Industrial Design'],
  },
  {
    id: 'interest-sunset',
    title: 'Sunset & Golden Hour Photography',
    category: 'Photography & Peace of Mind',
    image: '/assets/aistudio/SunSt_05679d23.jpg',
    tagline: 'Crimson skies, glowing sea horizons, and the ultimate screen break.',
    description:
      "When debugging gets intense, nothing beats closing the laptop and catching the sunset. The vibrant crimson and amber hues reflecting across wet sands provide natural calm and inspire the color palettes I use in my UI designs.",
    tags: ['Golden Hour', 'Horizon Glow', 'Mind Reset', 'Natural Palettes'],
  },
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-dad',
    role: 'Father ("Pops")',
    name: 'My Dad',
    image: '/assets/aistudio/pops_0b94f666.jpg',
    caption: 'My greatest mentor & anchor',
    note: 'The gentleman with the warm eyes and calm demeanor who taught me patience, integrity, and relentless dedication. He has always encouraged my curiosity in computers and technology.',
  },
  {
    id: 'fam-mom',
    role: 'Mother',
    name: 'My Mother',
    image: '/assets/aistudio/mom_7891fae5.jpg',
    caption: 'My unconditional supporter',
    note: 'Her warmth, prayers, and sacrifices are behind every milestone I reach. She always believed in me, from my earliest school years at Lideta Cathedral School to my software engineering journey at AAiT.',
  },
  {
    id: 'fam-celebration',
    role: 'Family Milestone',
    name: 'Family Graduation & Togetherness',
    image: '/assets/aistudio/Fam_203f6fd1.jpg',
    caption: 'Celebrating achievements together',
    note: 'Mom, my brothers, and me celebrating graduation in traditional Ethiopian attire with pure joy. Family always comes first — everything I build is dedicated to making them proud.',
  },
];

