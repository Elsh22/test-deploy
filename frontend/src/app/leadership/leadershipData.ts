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

export const leaders: Leader[] = [
  {
    slug: "dr-carlton-goode",
    name: "Dr. Carlton Goode",
    role: "Faculty Advisor",
    image: "/images/leadership/goode.jpg",
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
      "Dr. Carlton Goode serves as the Faculty Advisor for Developing Men of Color at VCU, helping the organization stay connected to campus resources, student success work, and long-term leadership development.",
      "His role matters because DMC is more than a student organization. It is a support system where men of color can grow academically, professionally, socially, and personally with guidance from someone who understands student development and institutional impact.",
      "Dr. Goode brings experience in intercultural success, education leadership, and mentorship, helping DMC build a stronger bridge between student leadership and the university.",
    ],
  },
  {
    slug: "kaleb-brown",
    name: "Kaleb Brown",
    role: "President",
    image: "/images/leadership/kaleb.jpg",
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
    slug: "xavier-lewis",
    name: "Xavier Lewis",
    role: "Vice President",
    image: "/images/leadership/xavier.jpg",
    group: "Executive Officers",
    focus: "Board coordination, strategic support, and member accountability.",
    linkedin: "https://www.linkedin.com/in/xaviermlewis/",
    organizations: [
      "President, Eta Xi Chapter of Kappa Alpha Psi Fraternity, Inc.",
      "Pre-Dental Ambassador",
      "Black Men in Medicine",
    ],
    biography: [
      "Xavier Lewis serves as Vice President, supporting the executive team and helping turn DMC's mission into organized action.",
      "His work helps keep board initiatives moving and supports the member experience through planning, communication, and accountability.",
    ],
  },
  {
    slug: "kabir-munjwani",
    name: "Kabir Munjwani",
    role: "Secretary",
    image: "/images/leadership/kabir.jpg",
    group: "Operations",
    focus: "Records, meeting flow, and internal communication.",
    linkedin: "https://www.linkedin.com/in/kabir-munjwani-2389bb319/",
    organizations: ["President, Katie's Art Project Chapter at VCU"],
    biography: [
      "Kabir Munjwani serves as Secretary, helping DMC stay organized through records, communication, and meeting structure.",
      "His role supports the operational foundation that allows programs, events, and leadership work to run smoothly.",
    ],
  },
  {
    slug: "sean-goffigan",
    name: "Sean Goffigan",
    role: "Treasurer",
    image: "/images/leadership/sean.jpg",
    group: "Operations",
    focus: "Budgeting, financial planning, and responsible stewardship.",
    linkedin: "https://www.linkedin.com/in/sean-goffigan-9734b7316/",
    organizations: ["Member, Student Managed Investment Portfolio"],
    biography: [
      "Sean Goffigan serves as Treasurer, supporting DMC's financial planning and responsible use of resources.",
      "His work helps the organization fund events, programs, and opportunities that directly support members.",
    ],
  },
  {
    slug: "kwame-mensah",
    name: "Kwame Mensah",
    role: "Parliamentarian",
    image: "/images/leadership/kwame.jpg",
    group: "Operations",
    focus: "Governance, procedure, and board accountability.",
    linkedin: "https://www.linkedin.com/in/mensahko/",
    organizations: ["President, Phi Delta Chapter of Omega Psi Phi Fraternity, Incorporated"],
    biography: [
      "Kwame Mensah serves as Parliamentarian, helping DMC maintain structure, process, and accountability.",
      "His role supports clear decision-making and helps the organization operate with professionalism and consistency.",
    ],
  },
  {
    slug: "naod-daniel",
    name: "Naod Daniel",
    role: "Director of Membership",
    image: "/images/leadership/naod.jpg",
    group: "Member Experience",
    focus: "Recruitment, retention, and helping members get connected.",
    linkedin: "https://www.linkedin.com/in/naod-daniel",
    organizations: ["Developing Men of Color", "Coding Club"],
    biography: [
      "Naod Daniel serves as Director of Membership, helping students find their place in DMC and stay connected to the brotherhood.",
      "His work supports recruitment, retention, and the first steps new members take when joining the organization.",
    ],
  },
  {
    slug: "samuel-brannen",
    name: "Samuel Brannen",
    role: "Director of Wellness",
    image: "/images/leadership/sam.jpg",
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
    slug: "thurman-smith-jr",
    name: "Thurman Smith Jr.",
    role: "Director of Mentorship",
    image: "/images/leadership/thurman.jpg",
    group: "Program Leads",
    focus: "Mentorship structure, guidance, and member development.",
    linkedin: "https://www.linkedin.com/in/thurmansmithjr/",
    organizations: [
      "Vice President, National Society of Black Engineers at VCU",
      "Vice President, Black Student Union at VCU",
    ],
    biography: [
      "Thurman Smith Jr. serves as Director of Mentorship, helping organize DMC's mentorship work and member development efforts.",
      "His role supports mentorship for younger students and helps DMC members grow as positive role models.",
    ],
  },
  {
    slug: "clyde-clark-iii",
    name: "Clyde Clark III",
    role: "Event Coordinator",
    image: "/images/leadership/clyde.jpg",
    group: "Program Leads",
    focus: "Event planning, member engagement, and campus experiences.",
    linkedin: "https://www.linkedin.com/in/clyde-clark-iii-9072b6202/",
    organizations: ["Developing Men of Color", "Student Government Association"],
    biography: [
      "Clyde Clark III serves as Event Coordinator, helping plan the programs and experiences that bring DMC members together.",
      "His leadership supports campus engagement, signature events, and moments that strengthen the brotherhood.",
    ],
  },
  {
    slug: "mohamed-turay",
    name: "Mohamed Turay",
    role: "Director of Committees",
    image: "/images/leadership/mo.jpg",
    group: "Program Leads",
    focus: "Committee coordination, leadership pipelines, and member action.",
    linkedin: "https://www.linkedin.com/in/mohamed-turay/",
    organizations: ["Developing Men of Color", "VCU Professional Selling Team"],
    biography: [
      "Mohamed Turay serves as Director of Committees, helping coordinate the groups where members serve, lead, and build.",
      "His work supports committee chairs, member involvement, and practical leadership opportunities across DMC.",
    ],
  },
  {
    slug: "jason-gallardo-gonzalez",
    name: "Jason Gallardo Gonzalez",
    role: "Public Relations Director",
    image: "/images/leadership/jason.jpg",
    group: "Communications",
    focus: "External messaging, partnerships, and DMC's public voice.",
    linkedin: "https://www.linkedin.com/in/jason-gallardo-gonzalez/",
    organizations: ["Visualize Collective Media", "Instagram: @flacovangogh"],
    biography: [
      "Jason Gallardo Gonzalez serves as Public Relations Director, shaping how DMC communicates with campus partners and the broader community.",
      "His role helps the organization present its mission, programs, and impact with clarity and professionalism.",
    ],
  },
  {
    slug: "paul-adelugba",
    name: "Paul Adelugba",
    role: "Social Media Director",
    image: "/images/leadership/paul.jpg",
    group: "Communications",
    focus: "Social storytelling, event coverage, and digital engagement.",
    linkedin: "https://www.linkedin.com/in/paul-adeugba/",
    organizations: ["ASU", "NSU", "NSBE member"],
    biography: [
      "Paul Adelugba serves as Social Media Director, helping tell DMC's story through digital platforms and event coverage.",
      "His work gives members, alumni, and campus partners a window into the organization’s energy and impact.",
    ],
  },
  {
    slug: "shawn-watson",
    name: "Shawn Watson",
    role: "Director of Information Technology",
    image: "/images/leadership/shawn.jpg",
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
];

export const executiveLeaders = leaders.filter((leader) => leader.group !== "Advisor");

export function getLeaderBySlug(slug: string) {
  return leaders.find((leader) => leader.slug === slug);
}
