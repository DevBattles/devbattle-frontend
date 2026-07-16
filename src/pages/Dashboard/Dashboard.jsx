import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";

import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsCards from "@/components/dashboard/StatsCards";
import TodayChallenge from "@/components/dashboard/TodayChallenge";
import RecentBattles from "@/components/dashboard/RecentBattles";
import AIStatusCard from "@/components/dashboard/AIStatusCard";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import LeaderboardCard from "@/components/dashboard/LeaderboardCard";
import QuickActions from "@/components/dashboard/QuickActions";
import DashboardLoading from "@/components/dashboard/DashboardLoading";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-3xl font-bold">
                DevBattles Dashboard
              </h1>

              <p className="mt-1 text-slate-400">
                Loading dashboard...
              </p>
            </div>
          </div>
        </header>

        <DashboardLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-3xl font-bold">
              DevBattles Dashboard
            </h1>

            <p className="mt-1 text-slate-400">
              Welcome back,&nbsp;
              <span className="font-semibold text-emerald-400">
                {user?.username || "Developer"}
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-3 font-medium transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* Welcome */}
        <WelcomeBanner />

        {/* Stats */}
        <StatsCards />

        {/* Today's Challenge */}
        <TodayChallenge />

        {/* Recent Battles + AI Status */}
        <div className="grid gap-8 lg:grid-cols-2">

          <RecentBattles />

          <AIStatusCard />

        </div>

        {/* Activity + Leaderboard */}
        <div className="grid gap-8 lg:grid-cols-2">

          <ActivityTimeline />

          <LeaderboardCard />

        </div>

        {/* Quick Actions */}
        <QuickActions />

      </main>

    </div>
  );
}

export default Dashboard;