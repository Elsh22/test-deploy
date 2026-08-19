import DashboardSectionPage from "../../../components/Dashboard/DashboardSectionPage";

const cards = [
  { title: "Resume", description: "Upload, preview, and improve your resume with DMC support.", meta: "Career" },
  { title: "LinkedIn", description: "Track profile readiness and strengthen your professional presence.", meta: "Career" },
  { title: "Portfolio", description: "Showcase projects, leadership, service, and professional work.", meta: "Career" },
  { title: "GitHub", description: "Connect technical projects and build proof of skill.", meta: "Career" },
  { title: "Mock Interviews", description: "Prepare for interviews with practice and feedback.", meta: "Career" },
  { title: "Career Fair Tracker", description: "Plan companies to visit and follow up after events.", meta: "Career" },
  { title: "Applications", description: "Track internships, jobs, programs, and opportunity deadlines.", meta: "Career" },
  { title: "Dream Companies", description: "Save target employers and build a strategy around them.", meta: "Career" },
  { title: "Career Readiness Score", description: "A simple snapshot of your professional readiness progress.", meta: "Career" },
];

export default function CareerPage() {
  return (
    <DashboardSectionPage
      cards={cards}
      description="Everything career-related: resume, LinkedIn, portfolio, GitHub, interviews, applications, and career readiness."
      eyebrow="Professional Growth"
      title="Career"
    />
  );
}
