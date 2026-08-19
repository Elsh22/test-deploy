import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { getMemberDashboardContext } from "../../lib/dashboard/getMember";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getMemberDashboardContext();

  return (
    <main className="min-h-screen bg-black text-white">
      <DashboardHeader profile={profile} />
      {children}
    </main>
  );
}
