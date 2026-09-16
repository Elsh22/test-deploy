export type Leader = {
  slug: string;
  name: string;
  role: string;
  image: string;
  group: string;
  focus: string;
  biography: string[];
  details?: { label: string; value: string }[];
  linkedin?: string;
  linkedinPosts?: { date: string; excerpt: string; url: string }[];
  organizations?: string[];
};

function createBiography(name: string, role: string) {
  return [
    `${name} serves as ${role} for Developing Men of Color, helping advance the organization's mission through leadership, service, and member support.`,
    "This role strengthens DMC's work across brotherhood, professional development, mentorship, campus engagement, and community impact.",
  ];
}

export const leaders: Leader[] = [
  {
    slug: "ethan-jemmont",
    name: "Ethan Jemmont",
    role: "Director of Membership",
    image: "/images/leadership/ethan-jemmont.jpg",
    group: "Member Experience",
    focus: "Recruitment, retention, and helping members get connected.",
    biography: createBiography("Ethan Jemmont", "Director of Membership"),
  },
  {
    slug: "andre-carter",
    name: "Andre Carter",
    role: "Director of Mentorship",
    image: "/images/leadership/andre-carter.jpg",
    group: "Program Leads",
    focus: "Mentorship structure, guidance, and member development.",
    biography: createBiography("Andre Carter", "Director of Mentorship"),
  },
  {
    slug: "shawn-watson",
    name: "Shawn Watson",
    role: "Director of Information Technology",
    image: "/images/leadership/shawn-watson.jpg",
    group: "Communications",
    focus: "Website, technology, and digital infrastructure.",
    linkedin: "https://www.linkedin.com/in/shawn-watson-3a16292b0",
    organizations: [
      "President, Delta Upsilon Chapter of Phi Beta Sigma Fraternity, Inc.",
      "Student Director, Emerging Leaders Program",
      "NSBE member",
    ],
    biography: [
      "Shawn Watson serves as Director of Information Technology, leading DMC's website, digital systems, and technology direction.",
      "His work helps DMC operate like a modern organization while building real experience in software engineering, web development, and digital strategy.",
    ],
  },
  {
    slug: "tyrese-perkins",
    name: "Tyrese Perkins",
    role: "Director of Public Relations",
    image: "/images/leadership/tyrese-perkins.jpg",
    group: "Communications",
    focus: "External messaging, partnerships, and DMC's public voice.",
    biography: createBiography("Tyrese Perkins", "Director of Public Relations"),
  },
  {
    slug: "jayden-nshimye",
    name: "Jayden Nshimye",
    role: "Director of Social Media",
    image: "/images/leadership/jayden-nshimye.jpg",
    group: "Communications",
    focus: "Social storytelling, event coverage, and digital engagement.",
    biography: createBiography("Jayden Nshimye", "Director of Social Media"),
  },
  {
    slug: "surafel-muluneh",
    name: "Surafel Muluneh",
    role: "Event Coordinator",
    image: "/images/leadership/surafel-muluneh.jpg",
    group: "Program Leads",
    focus: "Event planning, member engagement, and campus experiences.",
    biography: createBiography("Surafel Muluneh", "Event Coordinator"),
  },
  {
    slug: "naod-daniel",
    name: "Naod Daniel",
    role: "Vice President",
    image: "/images/leadership/naod-daniel.jpg",
    group: "Executive Officers",
    focus: "Board coordination, strategic support, and member accountability.",
    linkedin: "https://www.linkedin.com/in/naod-daniel",
    organizations: ["Developing Men of Color", "Coding Club"],
    biography: createBiography("Naod Daniel", "Vice President"),
  },
  {
    slug: "samuel-brannen",
    name: "Samuel Brannen",
    role: "Director of Wellness",
    image: "/images/leadership/samuel-brannen.jpg",
    group: "Member Experience",
    focus: "Wellness, support, and healthy community culture.",
    linkedin: "https://www.linkedin.com/in/samuel-brannen-ba47b82b4/",
    organizations: ["NSBA member"],
    biography: [
      "Samuel Brannen serves as Director of Wellness, supporting the health, balance, and community culture of DMC members.",
      "His leadership helps create spaces where members can reset, connect, and build sustainable habits.",
    ],
  },
  {
    slug: "atticus-kamara",
    name: "Atticus Kamara",
    role: "Parliamentarian",
    image: "/images/leadership/atticus-kamara.jpg",
    group: "Operations",
    focus: "Governance, procedure, and board accountability.",
    biography: createBiography("Atticus Kamara", "Parliamentarian"),
  },
  {
    slug: "ayo-orenuga",
    name: "Ayo Orenuga",
    role: "Secretary",
    image: "/images/leadership/ayo-orenuga.jpg",
    group: "Operations",
    focus: "Records, meeting flow, and internal communication.",
    biography: createBiography("Ayo Orenuga", "Secretary"),
  },
  {
    slug: "dr-carlton-goode",
    name: "Dr. Carlton Goode",
    role: "Advisor",
    image: "/images/leadership/dr-carlton-goode.jpg",
    group: "Advisor",
    focus: "Institutional guidance, mentorship, and VCU connection.",
    linkedin: "https://www.linkedin.com/in/carlton-goode-ed-d-69172815/",
    organizations: ["Director of Intercultural Success & Initiatives"],
    details: [
      { label: "Campus Role", value: "Director of Intercultural Success & Initiatives" },
      { label: "Education", value: "B.A. Psychology, Shaw University" },
      { label: "Graduate Study", value: "M.S. Student Development, University of Iowa" },
      { label: "Doctorate", value: "Ed.D. Education Leadership, Virginia Commonwealth University" },
    ],
    biography: [
      "Dr. Carlton Goode serves as Advisor for Developing Men of Color at VCU, helping the organization stay connected to campus resources, student success work, and long-term leadership development.",
      "His role matters because DMC is more than a student organization. It is a support system where men of color can grow academically, professionally, socially, and personally with guidance from someone who understands student development and institutional impact.",
      "Dr. Goode brings experience in intercultural success, education leadership, and mentorship, helping DMC build a stronger bridge between student leadership and the university.",
    ],
  },
  {
    slug: "kaleb-brown",
    name: "Kaleb Brown",
    role: "President",
    image: "/images/leadership/kaleb-brown.jpg",
    group: "Executive Officers",
    focus: "Vision, campus representation, and organizational leadership.",
    linkedin: "https://www.linkedin.com/in/kaleb--brown/",
    organizations: ["Students Providing Aid (SPAid), Vice President", "NSBE member"],
    biography: [
      "Kaleb Brown serves as President of Developing Men of Color, helping set the vision for the organization and represent DMC across campus.",
      "His leadership focuses on brotherhood, accountability, and building a structure where members can grow through mentorship, professional development, service, and leadership.",
    ],
  },
  {
    slug: "noah-mcgirt",
    name: "Noah McGirt",
    role: "Director of Finance",
    image: "/images/leadership/noah-mcgirt.jpg",
    group: "Operations",
    focus: "Budgeting, financial planning, and responsible stewardship.",
    biography: createBiography("Noah McGirt", "Director of Finance"),
  },
  {
    slug: "derrick-bryant",
    name: "Derrick Bryant",
    role: "Director of Committees",
    image: "/images/leadership/derrick-bryant.jpg",
    group: "Program Leads",
    focus: "Committee coordination, leadership pipelines, and member action.",
    biography: createBiography("Derrick Bryant", "Director of Committees"),
  },
];

export const executiveLeaders = leaders.filter((leader) => leader.group !== "Advisor");

export function getLeaderBySlug(slug: string) {
  return leaders.find((leader) => leader.slug === slug);
}
