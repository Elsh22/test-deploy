import DashboardSectionPage from "../../../components/Dashboard/DashboardSectionPage";

const cards = [
  { title: "Resume Templates", description: "Download resume templates and examples for different industries.", meta: "Resources" },
  { title: "Interview Guides", description: "Prepare for behavioral, technical, and professional interviews.", meta: "Resources" },
  { title: "Financial Literacy", description: "Learn budgeting, credit, banking, investing basics, and money habits.", meta: "Resources" },
  { title: "Business Resources", description: "Tools for networking, finance, consulting, marketing, and entrepreneurship.", meta: "Resources" },
  { title: "Tech Resources", description: "Guides for software, cybersecurity, cloud, data, and AI learning.", meta: "Resources" },
  { title: "Mental Health", description: "Support resources for wellness, balance, and personal growth.", meta: "Resources" },
  { title: "Professional Dress", description: "Guides for interviews, networking events, headshots, and formal programs.", meta: "Resources" },
];

export default function ResourcesPage() {
  return (
    <DashboardSectionPage
      cards={cards}
      description="Everything downloadable: templates, guides, financial literacy, business, tech, mental health, and professional dress."
      eyebrow="Member Tools"
      title="Resources"
    />
  );
}
