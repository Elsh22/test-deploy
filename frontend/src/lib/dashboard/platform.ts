export type MemberProfile = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  major: string | null;
  second_major: string | null;
  minor: string | null;
  classification: string | null;
  graduation_year: number | null;
  career_interest: string | null;
  career_end_goal: string | null;
  track: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  avatar_url: string | null;
  role: string | null;
};

export type DashboardEvent = {
  title: string;
  date: string;
  status: "completed" | "rsvp";
};

export const careerTrackOptions = [
  "Business",
  "Accounting",
  "Finance",
  "Marketing",
  "Management",
  "Technology",
  "Software Engineering",
  "Cybersecurity",
  "Data Analytics",
  "AI / Automation",
  "Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Computer Engineering",
  "Health",
  "Pre-Med",
  "Nursing",
  "Pharmacy",
  "Dentistry",
  "Public Health",
  "Law / Policy",
  "Education",
  "Public Service",
  "Entrepreneurship",
  "Creative / Media",
  "Undecided",
];

export const fallbackProfile: MemberProfile = {
  first_name: "Member",
  last_name: "Name",
  email: "member@vcu.edu",
  major: "Computer Science",
  second_major: "",
  minor: "",
  classification: "Junior",
  graduation_year: 2027,
  career_interest: "Technology",
  career_end_goal: "",
  track: "Technology",
  linkedin_url: "",
  portfolio_url: "",
  resume_url: "",
  avatar_url: "",
  role: "member",
};

export const memberEvents: DashboardEvent[] = [
  { title: "General Body Meeting", date: "April 15, 2026", status: "completed" },
  { title: "Jacob's Chance Kickball", date: "April 19, 2026", status: "completed" },
  { title: "9th Annual DMC Mixer", date: "September 13, 2026", status: "rsvp" },
  { title: "First General Body Meeting", date: "September 23, 2026", status: "rsvp" },
  { title: "Professional Academy Workshop", date: "Coming soon", status: "rsvp" },
  { title: "Resume Review Night", date: "Coming soon", status: "rsvp" },
];

export const dashboardBadges = [
  { name: "Professional Academy", status: "Earned" },
  { name: "Community Builder", status: "Earned" },
  { name: "Mentorship Ready", status: "In progress" },
];

export const dashboardCertificates = [
  { name: "Resume Ready Certificate", status: "Earned" },
  { name: "Leadership Development Certificate", status: "In progress" },
  { name: "Service Excellence Certificate", status: "Locked" },
];

export const learningModules = [
  { title: "Resume Foundations", progress: 100 },
  { title: "LinkedIn Profile", progress: 65 },
  { title: "Interview Prep", progress: 35 },
];

export const savedResources = [
  { title: "VCU Career Services", category: "Career" },
  { title: "Resume Checklist", category: "Professional Academy" },
  { title: "LinkedIn Alumni Search", category: "Networking" },
];

export const memberInterests = [
  "Basketball",
  "Finance",
  "Software Engineering",
  "Mentorship",
  "Community Service",
  "Public Speaking",
  "Fitness",
  "Entrepreneurship",
];

export const goals = [
  { title: "Upload updated resume", status: "active" },
  { title: "Attend one networking event", status: "active" },
  { title: "Complete LinkedIn refresh", status: "completed" },
];

export function getDisplayName(profile: MemberProfile | null | undefined, email?: string | null) {
  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
  return name || email || "DMC Member";
}

export function getInitials(profile: MemberProfile | null | undefined) {
  return (
    [profile?.first_name?.[0], profile?.last_name?.[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() || "DM"
  );
}

export function getProfileCompletion(profile: MemberProfile) {
  const fields = [
    profile.first_name,
    profile.last_name,
    profile.email,
    profile.major,
    profile.classification,
    profile.graduation_year,
    profile.career_interest || profile.track,
    profile.career_end_goal,
    profile.linkedin_url,
    profile.portfolio_url,
    profile.resume_url,
  ];

  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

export function getCareerReadinessScore(profile: MemberProfile) {
  const checks = [
    getProfileCompletion(profile) >= 80,
    Boolean(profile.resume_url),
    Boolean(profile.linkedin_url),
    Boolean(profile.portfolio_url),
    memberEvents.some((event) => event.status === "completed"),
    true,
    false,
    dashboardBadges.some((badge) => badge.status === "Earned"),
    learningModules.some((module) => module.progress === 100),
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function getServiceHours() {
  return 0;
}

export const serviceYear = {
  label: "2026-2027 Academic Year",
  startsAt: "August 1, 2026",
  endsAt: "May 1, 2027",
};

export function getServiceHourGoal(hours: number) {
  if (hours <= 5) {
    return 5;
  }

  return Math.ceil(hours / 5) * 5;
}

export function getServiceHourProgress(hours: number) {
  const goal = getServiceHourGoal(hours);
  const progress = Math.min(Math.round((hours / goal) * 100), 100);

  return {
    goal,
    progress,
    remaining: Math.max(goal - hours, 0),
  };
}
