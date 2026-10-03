export const personalInfo = {
  fullName: "Chaitanya Sujit Sawant",

  shortName: "Chaitanya",

  tagline: "Software Engineer · Lifelong Learner",

  dateOfBirth: "5 July 2001",

  age: 25,

  height: "6'1\"",

  bloodGroup: "O+",

  nativePlace: "Akluj, Maharashtra",

  currentCity: "Pune, Maharashtra",

  religion: "Hindu",

  caste: "96 koli Maratha",

  rashi: "Dhanu",

  email: "chaitanyasawant05072001@gmail.com",

  phone: "+91 9503688182",

  linkedin: "linkedin.com/in/im-chaitanya-sawant",

  address: "Ambegaon BK, Pune, Maharashtra — 411046",

  websiteUrl: "https\://chaitanya-bio-data.netlify.app",

  currentRole: "Software Engineer",

  currentEmployer: "Encardio Rite",

  photo:
    "https\://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  familyDeity: "Kolhapur Jotiba",
  daivak: "Greater Coucal (Bharadwaj Pakshi)",
  gotra: "Durvasa Rushi",
};

export const familyInfo = {
  father: {
    name: "Sujit Bapusaheb Sawant",

    relation: "Father",

    occupation: "Farmer",
  },

  mother: {
    name: "Sumitra Sujit Sawant",

    relation: "Mother",

    occupation: "Homemaker",
  },

  siblings: [
    {
      name: "Sayee Sujit Sawant",

      relation: "Sister",

      occupation: "Software Engineer",
    },
  ],

  paternalUncle: {
    name: "Avinash Bapusaheb Sawant",
    relation: "Paternal Uncle",
    occupation: "",
  },

  paternalAunt: {
    name: "Rajashri Avinash Sawant",
    relation: "Paternal Aunt",
    occupation: "Homemaker",
  },

  paternal: {
    grandfather: "Bapusaheb Ganesh Sawant",

    grandmother: "Ranjana Bapusaheb Sawant",
  },

  maternal: {
    grandfather: "Ramchandra Vittalrao Ranaware",

    grandmother: "Vijaymala Ramchandra Ranaware",
  },
};

export const relativeInfoData = [
  {
    name: familyInfo.father.name,
    relation: familyInfo.father.relation,
    occupation: familyInfo.father.occupation,
  },
  {
    name: familyInfo.father.name,
    relation: familyInfo.father.relation,
    occupation: familyInfo.father.occupation,
  },
  {
    name: familyInfo.mother.name,
    relation: familyInfo.mother.relation,
    occupation: familyInfo.mother.occupation,
  },
  {
    name: familyInfo.paternalUncle.name,
    relation: familyInfo.paternalUncle.relation,
    occupation: familyInfo.paternalUncle.occupation,
  },
  {
    name: familyInfo.paternalAunt.name,
    relation: familyInfo.paternalAunt.relation,
    occupation: familyInfo.paternalAunt.occupation,
  },
  ...familyInfo.siblings.map((sibling) => ({
    name: sibling.name,
    relation: sibling.relation,
    occupation: sibling.occupation,
  })),
  {
    name: familyInfo.paternal.grandfather,
    relation: "Paternal Grandfather",
    occupation: null,
  },
  {
    name: familyInfo.paternal.grandmother,
    relation: "Paternal Grandmother",
    occupation: null,
  },
  {
    name: familyInfo.maternal.grandfather,
    relation: "Maternal Grandfather",
    occupation: null,
  },
  {
    name: familyInfo.maternal.grandmother,
    relation: "Maternal Grandmother",
    occupation: null,
  },
  {
    name: "Ambadas Ramchrandra Ranaware",
    relation: "Maternal Uncle",
    occupation: "Nimsakhar",
  },
  {
    name: "Prakash Ramchrandra Ranaware",
    relation: "Maternal Uncle",
    occupation: "Nimsakhar",
  },
  {
    name: "Rupali Dadashab Yadav",
    relation: "Maternal Aunt",
    occupation: "Kadepur",
  },
  {
    name: "Dipali Gorakh Wabale",
    relation: "Maternal Aunt",
    occupation: "Baramati",
  },
  {
    name: "Archana Abhimanyu Mane",
    relation: "Paternal Aunt",
    occupation: "Girjani",
  },
  {
    name: "Minakshi Vittal Fadtare",
    relation: "Paternal Aunt",
    occupation: "Bhagatwadi, Akluj",
  },
] as const;

export const educationData = [
  {
    year: "2017",

    institution: "Maharshi Prashala, Yashwantnagar",

    degree: "SSC (10th) — 91.8%",

    location: "Akluj, Maharashtra",

    icon: "🏫",
  },

  {
    year: "2017 – 2019",

    institution: "Sadashivrao Mane Vidyalaya, Akluj",

    degree: "HSC (12th — Science) — 87.54%",

    location: "Akluj, Maharashtra",

    icon: "📚",
  },

  {
    year: "2019 – 2023",

    institution: "Vishwakarma Institute of Technology, Pune",

    degree: "B.Tech — EnTC Engineering — CGPA 8.6",

    location: "Pune, Maharashtra",

    icon: "🎓",
  },
];

export const careerData = [
  {
    year: "July 2023 - Nov 2025",

    company: "Livlong 365",

    role: "Software Engineer",

    duration: "2.4 years",

    description: "",

    location: "Thane, Maharashtra",

    type: "fulltime",
  },

  {
    year: "Nov 2025 - July 2026",

    company: "Solar Square Energy",

    role: "Software Engineer",

    duration: "9 months",

    description: "",

    location: "Pune",

    type: "fulltime",
  },

  {
    year: "July 2026 - Present",

    company: "Encardio Rite",

    role: "Senior Software Engineer",

    duration: "1 year -> Present",

    description: "",

    location: "Remote",

    type: "fulltime",
  },
];

export const personalityData = {
  hobbies: [
    {
      icon: "📖",

      title: "Reading",

      description: "Comics, Science",
    },

    {
      icon: "🏋️",

      title: "Fitness",

      description: "light exercise 5-6 days a week",
    },

    { icon: "💻", title: "Coding", description: "Learning new technologies" },

    {
      icon: "🎬",

      title: "Movies & Series",

      description: "Watching Anime, Sci-fi movies and web series",
    },
  ],

  values: [
    "Continuous Learning",

    "Self-Awareness",

    "Understanding",

    "Responsibility",

    "Discipline",
  ],

  lifestyle:
    "A balanced and grounded lifestyle, driven by curiosity, personal growth, and staying active, with a love for stories, technology, and meaningful connections.",
};

export const achievementsData = [
  {
    title: "CKA",

    fullTitle: "Certified Kubernetes Administrator",

    issuer: "CNCF / Linux Foundation",

    year: "2025",

    icon: "⚙️",

    color: "#3B82F6",
  },

  {
    title: "CKAD",

    fullTitle: "Certified Kubernetes Application Developer",

    issuer: "CNCF / Linux Foundation",

    year: "2024",

    icon: "🚀",

    color: "#10B981",
  },

  {
    title: "KCNA",

    fullTitle: "Kubernetes and Cloud Native Associate",

    issuer: "CNCF / Linux Foundation",

    year: "2024",

    icon: "☁️",

    color: "#8B5CF6",
  },

  {
    title: "KCSA",

    fullTitle: "Kubernetes and Cloud Native Security Associate",

    issuer: "CNCF / Linux Foundation",

    year: "2025",

    icon: "🛡️",

    color: "#F59E0B",
  },

  {
    title: "Best Performance Award",

    fullTitle: "Best Performance of the Year",

    issuer: "ThoughtWorks",

    year: "2024",

    icon: "🏅",

    color: "#EF4444",
  },
];

export const lifeTimelineData = [
  {
    year: "2001",

    title: "Born in Akluj",

    description: "Welcomed into the Sawant family in the heart of Maharashtra.",

    icon: "👶",
  },

  {
    year: "2006",

    title: "Started Schooling",

    description:
      "Began the learning journey at Maharshi School, Yashwantnagar.",

    icon: "📚",
  },

  {
    year: "2019",

    title: "Engineering College",

    description: "Secured admission at VIT Pune — a dream come true.",

    icon: "🎓",
  },

  {
    year: "2022",

    title: "First Job",

    description:
      "Began professional career with an internship at Conglem.ai, Pune.",

    icon: "💼",
  },

  {
    year: "2023",

    title: "Software Engineer",

    description:
      "Joined Livlong 365 as Software Engineer, contributing to cloud-native solutions.",

    icon: "⬆️",
  },

  {
    year: "2024",

    title: "Kubernetes Certifications",

    description:
      "Earned KCNA, KCSA, CKA and CKAD — became a certified Kubernetes professional.",

    icon: "🏆",
  },

  {
    year: "2025",

    title: "Software Engineer 2",

    description:
      "Joined Solar Square Energy as SDE 2, contributing to web technology solutions.",

    icon: "🚀",
  },

  {
    year: "2026",

    title: "Software Engineer 2",

    description:
      "Joined Encardio Rite as SDE 2, contributing to web technology solutions.",

    icon: "🚀",
  },

  {
    year: "2026",

    title: "New Chapter",

    description:
      "Looking forward to finding the right life partner to begin a new journey.",

    icon: "",
  },
];

export const dayInLifeData = [
  {
    time: "8:00 AM",

    title: "Morning Workout",

    description: "Starts the day with a 45-min light exercise session.",

    icon: "🏋️",

    color: "#EF4444",
  },

  {
    time: "9:00 AM",

    title: "Healthy Breakfast",

    description: "Fuels up with a nutritious home-cooked breakfast.",

    icon: "🥗",

    color: "#10B981",
  },

  {
    time: "9:30 AM",

    title: "Deep Work",

    description: "Starts work for focused architecture & coding sessions.",

    icon: "💻",

    color: "#3B82F6",
  },

  {
    time: "1:00 PM",

    title: "Team Collaboration",

    description: "Stand-ups, code reviews, and collaborative problem solving.",

    icon: "👥",

    color: "#8B5CF6",
  },

  {
    time: "6:00 PM",

    title: "Evening Walk",

    description: "Unwinds with a 30-minute walk.",

    icon: "🌅",

    color: "#F59E0B",
  },

  {
    time: "7:30 PM",

    title: "Family Time",

    description: "Calls home, catches up with parents and sister.",

    icon: "👨‍👩‍👧",

    color: "#EC4899",
  },

  {
    time: "9:00 PM",

    title: "Reading & Learning",

    description: "Dedicates an hour for learning new technologies.",

    icon: "📖",

    color: "#14B8A6",
  },

  {
    time: "12:00 PM",

    title: "Relaxation",

    description:
      "Wraps up with reading comics and watching anime before sleep.",

    icon: "🌙",

    color: "#6366F1",
  },
];

export const lifePartnerExpectations = {
  intro: `Looking for someone who believes in growing together, values mutual respect and honesty, and prefers a simple, balanced lifestyle over unnecessary materialism or social pressure. I appreciate someone who thinks independently, is willing to learn, communicates openly, and approaches important decisions thoughtfully.

Compatibility in mindset matters to me more than having identical interests. I want us to be able to respect each other's individuality, have difficult conversations honestly, support each other's growth, and build a relationship where both of us continue becoming better versions of ourselves.`,

  expectations: [
    {
      icon: "🌱",

      title: "Growth & Learning",

      description:
        "Values continuous learning and personal growth. Comfortable maintaining a consistent study or learning routine and motivated to keep growing as a person.",
    },

    {
      icon: "🧠",

      title: "Mindset",

      description:
        "Thinks independently, makes decisions thoughtfully, and values understanding the reasoning behind things rather than blindly following trends, celebrities, or social influence.",
    },

    {
      icon: "🤝",

      title: "Mutual Respect",

      description:
        "Believes in an equal partnership built on respect, understanding, patience, and the ability to communicate openly even when we disagree.",
    },

    {
      icon: "",

      title: "Emotional Compatibility",

      description:
        "Kind, understanding, and emotionally mature. Prefers calm communication over aggression, ego, or unnecessary conflict.",
    },

    {
      icon: "🏡",

      title: "Family & Home",

      description:
        "Values family and is comfortable sharing responsibilities at home. Enjoys or is willing to learn home cooking and believes household responsibilities should be shared.",
    },

    {
      icon: "💰",

      title: "Financial Values",

      description:
        "Has a balanced approach to money, avoids unnecessary extravagance, and is comfortable discussing finances, spending habits, savings, and financial commitments openly.",
    },

    {
      icon: "✨",

      title: "Simple Lifestyle",

      description:
        "Prefers a comfortable and meaningful lifestyle over excessive materialism or status-driven spending. Appreciates experiences and relationships more than luxury for its own sake.",
    },

    {
      icon: "🔬",

      title: "Curiosity",

      description:
        "Curious about the world and interested in learning, science, technology, or understanding how things work.",
    },
    {
      icon: "🔐",

      title: "Trust & Transparency",

      description:
        "Believes that a strong relationship is built on honesty and transparency about important aspects of life, including past relationships, friendships, social media, health, and other matters that may affect the relationship.",
    },

    {
      icon: "📱",

      title: "Digital Lifestyle",

      description:
        "Has a thoughtful relationship with social media and digital content, and is open to discussing how we want technology and social media to fit into our relationship.",
    },
  ],
};

export const horoscopeData = {
  rashi: personalInfo.rashi,

  dob: personalInfo.dateOfBirth,

  tob: "02:45 AM midnight",

  pob: "Akluj, Maharashtra, India",

  kundaliPdf: null as string | null,

  summary:
    "Born under Dhanu Rashi with reverence for Kolhapur Jotiba as the family deity, the Greater Coucal (Bharadwaj Pakshi) daivak, and the Durvasa Rushi gotra—reflecting a grounded, spiritually rooted, and family-oriented nature.",
  familyDeity: personalInfo.familyDeity,
  daivak: personalInfo.daivak,
  gotra: personalInfo.gotra,
};

export const media = {
  groomPhotos: [{ src: personalInfo.photo }],

  dayInLifePhotos: [personalInfo.photo],

  pdfImages: {
    kundli: "/images/kundli-placeholder.jpg",
  },
} as const;

export const en = {
  nav: {
    home: "Home",

    about: "About",

    family: "Family",

    education: "Education",

    career: "Career",

    gallery: "Gallery",

    relative: "Relatives",

    contact: "Contact",
  },

  splash: {
    welcome: "Welcome to",

    title: "My Story",

    subtitle: "Chaitanya Sujit Sawant",

    selectLang: "Select Your Language",

    selectPrompt: "Choose your preferred language to continue",

    btnEnglish: "English",

    btnMarathi: "मराठी",
  },

  hero: {
    badge: "Marriage Biodata",

    greeting: "Hello, I'm",

    tagline: "Software Engineer · Lifelong Learner",

    cta1: "Explore My Profile",

    cta2: "Get In Touch",

    statAge: `${personalInfo.age} yrs`,

    statCity: "Pune",

    statCareer: "3+ yrs",

    labelAge: "Age",

    labelCity: "City",

    labelCareer: "Career",
  },

  intro3d: {
    badge: "Interactive 3D",

    title: "Meet The",

    titleAccent: "Architect",

    hint: "Drag to interact · Scroll to explore",
  },

  personal: {
    badge: "About Me",

    title: "Personal",

    titleAccent: "Information",

    profession: "Software Engineer · DevOps Architect",

    quickFacts: "Quick Facts",

    aboutMe: "About Me",

    interests: "Interests",

    horoscopeSnap: "Horoscope Snapshot",

    viewHoroscope: "View Full Horoscope",

    facts: {
      height: "Height",

      blood: "Blood Group",

      bloodSub: "Universal Donor",

      native: "Native",

      nativeSub: "Maharashtra",

      current: "Current",

      currentSub: "Maharashtra",

      rashi: "Rashi",

      religion: "Religion / Caste",
    },

    story: [
      {
        emoji: "🧑‍💻",

        title: "Who Am I?",

        body: "I build scalable web applications, cloud systems and solve complex engineering problems. SDE 2 at Encardio Rite, Pune.",
      },

      {
        emoji: "🚀",

        title: "What Drives Me?",

        body: "Continuous learning, deep curiosity about technology, and the belief that every hard problem has an elegant solution.",
      },

      {
        emoji: "👨‍👩‍👧",

        title: "Family & Values",

        body: "Grounded in family, responsibility, and traditional values, while maintaining a modern and open-minded outlook. Believes in mutual respect, understanding, and growing together.",
      },

      {
        emoji: "🌅",

        title: "Outside Work",

        body: "Morning exercise sessions, evening reads and late-night learning. Life is best lived fully.",
      },
    ],

    interestPills: ["Technology", "Learning", "Fitness", "Reading"],
  },

  familyTree: {
    badge: "Roots",

    title: "Family",

    titleAccent: "Tree",

    grandparents: "Grandparents",

    parents: "Parents",

    groomSiblings: "Groom & Siblings",

    roles: {
      paternalGrandfather: "Paternal Grandfather",

      paternalGrandmother: "Paternal Grandmother",

      maternalGrandfather: "Maternal Grandfather",

      maternalGrandmother: "Maternal Grandmother",

      father: "Father",

      mother: "Mother",

      groom: "Groom",

      sister: "Sister",
      paternalUncle: "Paternal Uncle",
      paternalAunt: "Paternal Aunt",
    },
  },

  education: {
    badge: "Academic Path",

    title: "Education",

    titleAccent: "Journey",
  },

  career: {
    badge: "Professional Life",

    title: "Career",

    titleAccent: "Journey",

    counters: [
      "Years of Experience",

      "Projects Completed",

      "Certifications Earned",

      "Open Source Contributions",
    ],

    typeInternship: "Internship",

    typeFulltime: "Full-time",

    jobs: [
      {
        role: "Software Engineer Intern",

        description: "Worked on NFT project.",

        duration: "6 months",
      },

      {
        role: "Software Engineer",

        description:
          "Built CI/CD pipelines and containerised legacy apps with Docker & Kubernetes.",

        duration: "2 years",
      },

      {
        role: "Senior Software Engineer",

        description:
          "Worked as SDE 2 on cloud-native architecture and observability platform.",

        duration: "9 months",
      },

      {
        role: "Senior Software Engineer",

        description:
          "Working as SDE 2 on cloud-native architecture and observability platform.",

        duration: "2+ years",
      },
    ],
  },

  personality: {
    badge: "Who I Am",

    title: "Personality &",

    titleAccent: "Interests",

    lifestyle: personalityData.lifestyle,

    values: personalityData.values,

    hobbies: personalityData.hobbies,
  },

  gallery: {
    badge: "The Groom",

    title: "Photo",

    titleAccent: "Gallery",

    description: "",

    open: "Open photo",

    close: "Close gallery",

    photoCount: "photo",

    previous: "Previous photo",

    next: "Next photo",

    photoAlt: "Groom portrait",
  },

  achievements: {
    badge: "Credentials",

    title: "Achievements &",

    titleAccent: "Certifications",

    tapHint: "Click any card to see details",

    tapReveal: "Tap to reveal",
  },

  timeline: {
    badge: "My Story",

    title: "Life",

    titleAccent: "Timeline",

    events: lifeTimelineData,
  },

  map: {
    badge: "Geographical Journey",

    title: "Maharashtra",

    titleAccent: "Map",

    nativeBadge: "Native Place",

    nativeCity: "Akluj, Maharashtra",

    nativeDesc:
      "Akluj is a small town in Solapur district, known for its agricultural heritage and cultural significance. It is the place where I was born and raised, surrounded by family and community.",

    currentBadge: "Current City",

    currentCity: "Pune, Maharashtra",

    currentDesc:
      "The Oxford of the East and India's tech hub. Home to Razorpay's engineering team and a vibrant city that balances modernity with Maharashtrian culture.",

    distance: "\~250 km",

    distanceLabel: "from roots to opportunity",
  },

  dayInLife: {
    badge: "Daily Routine",

    title: "A Day in My",

    titleAccent: "Life",

    items: dayInLifeData,
  },

  horoscope: {
    badge: "Kundali Details",

    title: "Horoscope",

    titleAccent: "Card",

    clickHint: "Click the card to reveal full details",

    birthDetails: "Birth Details",

    rashiLabel: "Rashi",

    familyDeityLabel: "Family Deity",

    daivakLabel: "Daivak",

    gotraLabel: "Gotra",

    tobLabel: "Time of Birth",

    pobLabel: "Place of Birth",

    backTitle: "Astrological Summary",

    tapReveal: "✦ Tap to see detailed summary ✦",

    rashiChip: "Dhanu Rashi",

    summary:
      "Born under Dhanu Rashi with reverence for Kolhapur Jotiba as the family deity, the Greater Coucal (Bharadwaj Pakshi) daivak, and the Durvasa Rushi gotra—reflecting a grounded, spiritually rooted, and family-oriented nature.",
  },

  partner: {
    badge: "Looking For",

    title: "Expectations From",

    titleAccent: "Life Partner",

    intro: lifePartnerExpectations.intro,

    expectations: lifePartnerExpectations.expectations,
  },

  relativeInfo: {
    badge: "Family Circle",
    title: "Relative",
    titleAccent: "Info",
    description: "A simple list of close family relationships and background.",
    items: relativeInfoData.map(
      ({ name, relation, occupation }) =>
        `${name} — ${relation}${occupation ? ` · ${occupation}` : ""}`,
    ),
  },

  contact: {
    badge: "Reach Out",

    title: "Get In",

    titleAccent: "Touch",

    thankYou: "Thank You For Visiting My Profile 🙏",

    labels: {
      phone: "Phone",

      email: "Email",

      linkedin: "LinkedIn",

      address: "Address",
    },

    lookingForward: "",

    closingPara: "",

    callNow: "Call Now",

    sendEmail: "Send Email",
  },

  qr: {
    badge: "Share Profile",

    title: "QR Code",

    titleAccent: "Share",

    scanHint: "Scan this QR code to open the biodata website",

    copyLink: "Copy Link",

    copied: "Copied!",

    whatsapp: "Share on WhatsApp",
  },

  pdf: {
    badge: "Traditional Format",

    title: "Download",

    titleAccent: "PDF Biodata",

    cardTitle: "Complete Biodata PDF",

    cardDesc:
      "A professionally formatted PDF with personal details, family background, education, career, and contact information — perfect for traditional families.",

    btnDownload: "Download Biodata PDF",

    btnDownloaded: "✓ Downloaded!",

    privacy: "PDF is generated in your browser — no data is sent to any server",

    sections: {
      personalInfo: "Personal Information",

      familyDetails: "Family Details",

      education: "Education",

      career: "Career",

      contact: "Contact",

      relativeDetails: "Family Circle",

      achievements: "Achievements",

      horoscope: "Horoscope",

      timeOfBirth: "Time of Birth",

      familyDeity: "Family Deity",

      daivak: "Daivak",

      gotra: "Gotra",

      placeOfBirth: "Place of Birth",

      photos: "Photos",

      marriageBiodata: "Marriage Biodata",

      footer:
        "Designed with \u2764 for a new beginning \u00b7 Maharashtra, India",

      fullName: "Full Name",
      dateOfBirth: "Date of Birth",
      age: "Age",
      height: "Height",
      bloodGroup: "Blood Group",
      nativePlace: "Native Place",
      currentCity: "Current City",
      religion: "Religion / Caste",
      rashi: "Rashi",
      father: "Father",
      mother: "Mother",
      sibling: "Sibling",
      phone: "Phone",
      email: "Email",
      website: "Website",
      linkedin: "LinkedIn",
      address: "Address",
      groomPhoto: "Groom",
      kundli: "Kundli",
    },
  },

  footer: {
    tagline: "Software Engineer · Lifelong Learner",

    credit: "Designed with  for a new beginning · Maharashtra, India · 2026",
  },
};

export type Translations = typeof en;

export const mr: Translations = {
  nav: {
    home: "घर",

    about: "माझ्याबद्दल",

    family: "कुटुंब",

    education: "शिक्षण",

    career: "करिअर",

    gallery: "छायाचित्रे",

    relative: "नातेवाईक",

    contact: "संपर्क",
  },

  splash: {
    welcome: "स्वागत आहे",
    title: "माझी कहाणी",
    subtitle: "चैतन्य सुजित सावंत",
    selectLang: "भाषा निवडा",
    selectPrompt: "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा",
    btnEnglish: "English",
    btnMarathi: "मराठी",
  },

  hero: {
    badge: "विवाह बायोडाटा",
    greeting: "नमस्कार, मी आहे",
    tagline: "सॉफ्टवेअर अभियंता · आयुष्यभर शिकणारा",
    cta1: "माझी माहिती पहा",
    cta2: "संपर्क साधा",
    statAge: `${personalInfo.age} वर्षे`,
    statCity: "पुणे",
    statCareer: "३+ वर्षे",
    labelAge: "वय",
    labelCity: "शहर",
    labelCareer: "करिअर",
  },

  intro3d: {
    badge: "इंटरॅक्टिव्ह ३D",
    title: "भेटा",
    titleAccent: "आर्किटेक्टला",
    hint: "परस्परसंवादासाठी ड्रॅग करा · अन्वेषण करण्यासाठी स्क्रोल करा",
  },

  personal: {
    badge: "माझ्याबद्दल",
    title: "वैयक्तिक",
    titleAccent: "माहिती",
    profession: "सॉफ्टवेअर अभियंता · DevOps आर्किटेक्ट",
    quickFacts: "थोडक्यात माहिती",
    aboutMe: "माझ्याबद्दल",
    interests: "आवडी-निवडी",
    horoscopeSnap: "कुंडलीचा संक्षिप्त आढावा",
    viewHoroscope: "संपूर्ण कुंडली पहा",
    facts: {
      height: "उंची",
      blood: "रक्तगट",
      bloodSub: "युनिव्हर्सल डोनर",
      native: "मूळगाव",
      nativeSub: "महाराष्ट्र",
      current: "सध्याचे शहर",
      currentSub: "महाराष्ट्र",
      rashi: "राशी",
      religion: "धर्म / जात",
    },
    story: [
      {
        emoji: "🧑‍💻",
        title: "मी कोण आहे?",
        body: "मी स्केलेबल वेब अॅप्लिकेशन्स आणि क्लाउड सिस्टिम्स तयार करतो व जटिल अभियांत्रिकी समस्या सोडवतो. पुण्यात Encardio Rite येथे SDE 2 म्हणून काम करतो.",
      },
      {
        emoji: "🚀",
        title: "मला काय प्रेरित करते?",
        body: "सतत शिकणे, तंत्रज्ञानाबद्दलची सखोल उत्सुकता आणि प्रत्येक कठीण समस्येचे सुंदर समाधान असते हा विश्वास.",
      },
      {
        emoji: "👨‍👩‍👧",
        title: "कुटुंब आणि मूल्ये",
        body: "कुटुंब, जबाबदारी आणि पारंपरिक मूल्यांशी जोडलेला असूनही आधुनिक व मोकळा दृष्टिकोन ठेवतो. परस्पर आदर, समजूतदारपणा आणि एकत्र वाढण्यावर विश्वास आहे.",
      },
      {
        emoji: "🌅",
        title: "कामाबाहेरचे जीवन",
        body: "सकाळचा व्यायाम, संध्याकाळचे वाचन आणि रात्री नवीन गोष्टी शिकणे. आयुष्याचा प्रत्येक क्षण मनापासून जगण्यावर विश्वास आहे.",
      },
    ],
    interestPills: ["तंत्रज्ञान", "शिकणे", "फिटनेस", "वाचन"],
  },

  familyTree: {
    badge: "मुळे",
    title: "कौटुंबिक",
    titleAccent: "वृक्ष",
    grandparents: "आजी-आजोबा",
    parents: "आई-वडील",
    groomSiblings: "वर व भावंडे",
    roles: {
      paternalGrandfather: "वडिलांकडील आजोबा",
      paternalGrandmother: "वडिलांकडील आजी",
      maternalGrandfather: "आईकडील आजोबा",
      maternalGrandmother: "आईकडील आजी",
      father: "वडील",
      mother: "आई",
      groom: "वर",
      sister: "बहीण",
      paternalUncle: "चुलते",
      paternalAunt: "चुलती",
    },
  },

  education: {
    badge: "शैक्षणिक प्रवास",
    title: "शिक्षण",
    titleAccent: "प्रवास",
  },

  career: {
    badge: "व्यावसायिक जीवन",
    title: "करिअर",
    titleAccent: "प्रवास",
    counters: [
      "अनुभवाची वर्षे",
      "पूर्ण केलेले प्रकल्प",
      "मिळवलेली प्रमाणपत्रे",
      "ओपन सोर्स योगदान",
    ],
    typeInternship: "इंटर्नशिप",
    typeFulltime: "पूर्णवेळ",
    jobs: [
      {
        role: "सॉफ्टवेअर अभियंता इंटर्न",
        description: "NFT प्रकल्पावर काम केले.",
        duration: "६ महिने",
      },
      {
        role: "सॉफ्टवेअर अभियंता",
        description:
          "CI/CD पाइपलाइन तयार केल्या आणि Docker व Kubernetes वापरून जुन्या अॅप्सचे कंटेनरायझेशन केले.",
        duration: "२ वर्षे",
      },
      {
        role: "वरिष्ठ सॉफ्टवेअर अभियंता",
        description:
          "क्लाउड-नेटिव्ह आर्किटेक्चर आणि ऑब्झर्व्हेबिलिटी प्लॅटफॉर्मवर SDE 2 म्हणून काम केले.",
        duration: "९ महिने",
      },
      {
        role: "वरिष्ठ सॉफ्टवेअर अभियंता",
        description:
          "क्लाउड-नेटिव्ह आर्किटेक्चर आणि ऑब्झर्व्हेबिलिटी प्लॅटफॉर्मवर SDE 2 म्हणून काम करत आहे.",
        duration: "२+ वर्षे",
      },
    ],
  },

  personality: {
    badge: "मी कोण आहे",
    title: "व्यक्तिमत्त्व आणि",
    titleAccent: "आवडी",
    lifestyle: personalityData.lifestyle,
    values: personalityData.values,
    hobbies: personalityData.hobbies,
  },

  gallery: {
    badge: "वराचे",
    title: "छायाचित्र",
    titleAccent: "दालन",
    description: "",
    open: "छायाचित्र उघडा",
    close: "दालन बंद करा",
    photoCount: "छायाचित्र",
    previous: "मागील छायाचित्र",
    next: "पुढील छायाचित्र",
    photoAlt: "वराचे छायाचित्र",
  },

  achievements: {
    badge: "प्रमाणपत्रे",

    title: "उपलब्धी आणि",

    titleAccent: "प्रमाणपत्रे",

    tapHint: "तपशील पाहण्यासाठी कोणतेही कार्ड क्लिक करा",

    tapReveal: "उघडण्यासाठी टॅप करा",
  },

  timeline: {
    badge: "माझी कहाणी",
    title: "जीवन",
    titleAccent: "टाइमलाइन",
    events: lifeTimelineData,
  },

  map: {
    badge: "भौगोलिक प्रवास",
    title: "महाराष्ट्राचा",
    titleAccent: "नकाशा",
    nativeBadge: "मूळगाव",
    nativeCity: "अकलूज, महाराष्ट्र",
    nativeDesc:
      "अकलूज हे सोलापूर जिल्ह्यातील एक छोटे शहर असून कृषी वारसा आणि सांस्कृतिक महत्त्वासाठी ओळखले जाते. कुटुंब आणि समाजाच्या सहवासात माझे बालपण आणि संगोपन येथे झाले.",
    currentBadge: "सध्याचे शहर",
    currentCity: "पुणे, महाराष्ट्र",
    currentDesc:
      "पूर्वेचे ऑक्सफर्ड आणि भारताचे टेक हब. Encardio Rite च्या टीमसोबत काम करण्याचे ठिकाण आणि आधुनिकता व महाराष्ट्रीय संस्कृतीचा सुंदर समतोल साधणारे शहर.",
    distance: "~२५० किमी",
    distanceLabel: "मुळांपासून संधींपर्यंत",
  },

  dayInLife: {
    badge: "दैनंदिन दिनचर्या",
    title: "माझ्या दिवसाची",
    titleAccent: "झलक",
    items: dayInLifeData,
  },

  horoscope: {
    badge: "कुंडली तपशील",
    title: "कुंडली",
    titleAccent: "कार्ड",
    clickHint: "संपूर्ण तपशील पाहण्यासाठी कार्डवर क्लिक करा",
    birthDetails: "जन्म तपशील",
    rashiLabel: "राशी",
    familyDeityLabel: "कुलदैवत",
    daivakLabel: "दैवक",
    gotraLabel: "गोत्र",
    tobLabel: "जन्म वेळ",
    pobLabel: "जन्मस्थान",
    backTitle: "ज्योतिषशास्त्रीय सारांश",
    tapReveal: "✦ सविस्तर सारांश पाहण्यासाठी टॅप करा ✦",
    rashiChip: "धनु राशी",
    summary:
      "धनु राशीत जन्म, कोल्हापूर ज्योतिबा या कुलदैवतांचा आदर, महापक्षी (भरद्वाज पक्षी) दैवक आणि दुर्वासा ऋषी गोत्र — यावर आधारित संतुलित, आध्यात्मिक आणि कुटुंबाभिमुख स्वभाव.",
  },

  partner: {
    badge: "शोधत आहे",
    title: "जीवनसाथीकडून",
    titleAccent: "अपेक्षा",
    intro: lifePartnerExpectations.intro,
    expectations: lifePartnerExpectations.expectations,
  },

  relativeInfo: {
    badge: "कौटुंबिक परिवार",
    title: "नातेवाईक",
    titleAccent: "माहिती",
    description: "जवळच्या कौटुंबिक नातेसंबंधांची आणि पार्श्वभूमीची साधी यादी.",
    items: [
      "सुजित बापूसाहेब सावंत — वडील · शेतकरी",
      "सुमित्रा सुजित सावंत — आई · गृहिणी",
      "सई सुजित  सुजित सावंत — बहीण · सॉफ्टवेअर अभियंता",
      "बापूसाहेब गणेश सावंत — वडिलांकडील आजोबा",
      "रंजना बापूसाहेब सावंत — वडिलांकडील आजी",
      "रामचंद्र रनवरे — आईकडील आजोबा",
      "वसुधा रनवरे — आईकडील आजी",
    ],
  },

  contact: {
    badge: "संपर्क साधा",
    title: "संपर्क",
    titleAccent: "साधा",
    thankYou: "माझी माहिती पाहिल्याबद्दल धन्यवाद 🙏",
    labels: {
      phone: "दूरध्वनी",
      email: "ईमेल",
      linkedin: "लिंक्डइन",
      address: "पत्ता",
    },
    lookingForward: "",
    closingPara: "",
    callNow: "आता कॉल करा",
    sendEmail: "ईमेल पाठवा",
  },

  qr: {
    badge: "प्रोफाइल शेअर करा",
    title: "QR कोड",
    titleAccent: "शेअर",
    scanHint: "बायोडाटा वेबसाइट उघडण्यासाठी हा QR कोड स्कॅन करा",
    copyLink: "लिंक कॉपी करा",
    copied: "कॉपी झाले!",
    whatsapp: "WhatsApp वर शेअर करा",
  },

  pdf: {
    badge: "पारंपरिक स्वरूप",
    title: "डाउनलोड",
    titleAccent: "PDF बायोडाटा",
    cardTitle: "संपूर्ण बायोडाटा PDF",
    cardDesc:
      "वैयक्तिक माहिती, कौटुंबिक पार्श्वभूमी, शिक्षण, करिअर आणि संपर्क तपशीलांसह व्यावसायिक PDF — पारंपरिक स्वरूपासाठी योग्य.",
    btnDownload: "बायोडाटा PDF डाउनलोड करा",
    btnDownloaded: "✓ डाउनलोड झाले!",
    privacy:
      "PDF तुमच्या ब्राउझरमध्येच तयार होते — कोणताही डेटा सर्व्हरला पाठवला जात नाही",
    sections: {
      personalInfo: "वैयक्तिक माहिती",
      familyDetails: "कौटुंबिक तपशील",
      education: "शिक्षण",
      career: "करिअर",
      contact: "संपर्क",
      relativeDetails: "कौटुंबिक परिवार",
      achievements: "उपलब्धी",
      horoscope: "कुंडली",
      timeOfBirth: "जन्मवेळ",
      familyDeity: "कुलदैवत",
      daivak: "दैवक",
      gotra: "गोत्र",
      placeOfBirth: "जन्मस्थळ",
      photos: "छायाचित्रे",
      marriageBiodata: "विवाह बायोडाटा",
      footer: "महाराष्ट्र, भारत · नव्या सुरुवातीसाठी  ने बनवले",
      fullName: "पूर्ण नाव",
      dateOfBirth: "जन्मतारीख",
      age: "वय",
      height: "उंची",
      bloodGroup: "रक्तगट",
      nativePlace: "मूळगाव",
      currentCity: "सध्याचे शहर",
      religion: "धर्म / जात",
      rashi: "राशी",
      father: "वडील",
      mother: "आई",
      sibling: "भावंड",
      phone: "दूरध्वनी",
      email: "ईमेल",
      website: "वेबसाइट",
      linkedin: "लिंक्डइन",
      address: "पत्ता",
      groomPhoto: "वर",
      kundli: "कुंडली",
    },
  },

  footer: {
    tagline: "सॉफ्टवेअर अभियंता · आयुष्यभर शिकणारा",
    credit: "नव्या सुरुवातीसाठी  ने बनवले · महाराष्ट्र, भारत · २०२६",
  },
};

export type Lang = "en" | "mr";

export const translations: Record<Lang, Translations> = { en, mr };
