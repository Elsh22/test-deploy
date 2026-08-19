import DashboardSectionPage from "../../../components/Dashboard/DashboardSectionPage";

const cards = [
  { title: "Learning Paths", description: "Structured tracks for career, professional, and life development.", meta: "Academy" },
  { title: "Courses", description: "Short lessons and modules members can complete at their own pace.", meta: "Academy" },
  { title: "Quizzes", description: "Knowledge checks to make learning measurable and useful.", meta: "Academy" },
  { title: "Hands-on Activities", description: "Practice-based assignments, reflections, and real-world tasks.", meta: "Academy" },
  { title: "Certificates", description: "Completion credentials for major learning milestones.", meta: "Academy" },
  { title: "Digital Badges", description: "Recognition for skills, involvement, leadership, and growth.", meta: "Academy" },
  { title: "Progress", description: "Track completion across learning paths and member development goals.", meta: "Academy" },
];

export default function AcademyPage() {
  return (
    <DashboardSectionPage
      cards={cards}
      description="Everything education-related: learning paths, courses, quizzes, hands-on activities, certificates, badges, and progress."
      eyebrow="Academy"
      title="Academy"
    />
  );
}
