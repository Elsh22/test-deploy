import DashboardSectionPage from "../../../components/Dashboard/DashboardSectionPage";

const cards = [
  { title: "Upcoming Events", description: "See what is coming up next for DMC members.", meta: "Events" },
  { title: "Calendar", description: "View events by month, week, and day.", meta: "Events" },
  { title: "RSVP", description: "Register for meetings, workshops, service, and signature events.", meta: "Events" },
  { title: "QR Check-In", description: "Fast check-in for attendance tracking at DMC events.", meta: "Events" },
  { title: "Attendance History", description: "Track where you showed up and how you were involved.", meta: "Events" },
  { title: "Volunteer Opportunities", description: "Find service events and community impact opportunities.", meta: "Events" },
];

export default function EventsPage() {
  return (
    <DashboardSectionPage
      cards={cards}
      description="Everything event-related: upcoming events, calendar, RSVP, QR check-in, attendance history, and volunteer opportunities."
      eyebrow="Involvement"
      title="Events"
    />
  );
}
