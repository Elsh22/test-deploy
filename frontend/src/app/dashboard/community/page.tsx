import DashboardSectionPage from "../../../components/Dashboard/DashboardSectionPage";

const cards = [
  { title: "Directory", description: "Find DMC members, leaders, mentors, and alumni.", meta: "Community" },
  { title: "Mentorship", description: "Connect mentorship work, assignments, and service involvement.", meta: "Community" },
  { title: "Brotherhood Feed", description: "A future space for updates, wins, photos, and member stories.", meta: "Community" },
  { title: "Discussion Boards", description: "Focused member conversations by topic, class, and interest.", meta: "Community" },
  { title: "Committees", description: "Explore committee involvement and student leadership opportunities.", meta: "Community" },
  { title: "Alumni Network", description: "Connect current members with DMC alumni and professional pathways.", meta: "Community" },
];

export default function CommunityPage() {
  return (
    <DashboardSectionPage
      cards={cards}
      description="Everything about DMC members: directory, mentorship, brotherhood feed, discussions, committees, and alumni."
      eyebrow="Brotherhood"
      title="Community"
    />
  );
}
