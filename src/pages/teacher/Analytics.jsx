import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Trophy, Loader2, Users, ClipboardList } from "lucide-react";

function Analytics() {
  const { data: dashboardData, isLoading: loading } = useQuery({
    queryKey: ["dashboard", "teacher"],
    queryFn: async () => {
      const res = await api.get("/dashboard/teacher");
      return res.data;
    }
  });

  const stats = dashboardData?.data;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Homeworks Created",
      value: stats?.homeworkCreated || 0,
      icon: BookOpen,
      color: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Contests Organized",
      value: stats?.contestsCreated || 0,
      icon: Trophy,
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "Pending Reviews",
      value: stats?.pendingReviews || 0,
      icon: ClipboardList,
      color: "bg-purple-500/20 text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Class Performance Analytics</h2>
        <p className="text-sm text-slate-400">Review homework success indices, active student ratios, and question stats.</p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>
                <p className="mt-2 text-3xl font-bold text-white">{card.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Analytics;
