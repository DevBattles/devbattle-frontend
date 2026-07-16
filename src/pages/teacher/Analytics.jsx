import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { BarChart3, TrendingUp, Users, BookOpen, Trophy, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/dashboard/teacher");
        if (res.data && res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load analytics dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Homeworks Created",
      value: stats?.totalHomeworks || 0,
      icon: BookOpen,
      color: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Total Contests Organized",
      value: stats?.totalContests || 0,
      icon: Trophy,
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "Active Submissions",
      value: stats?.totalSubmissions || 0,
      icon: Users,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Total Questions in Bank",
      value: stats?.totalQuestions || 0,
      icon: TrendingUp,
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance Overview */}
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            Evaluation Distribution
          </h3>
          <p className="text-sm text-slate-400">Overview of grades assigned by the AI evaluator system across student batches.</p>
          
          <div className="space-y-3 pt-2 text-sm">
            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>Grade A (Excellent)</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-emerald-400 rounded-full" style={{ width: "45%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>Grade B (Good)</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-blue-400 rounded-full" style={{ width: "30%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>Grade C (Needs practice)</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "20%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>Grade D/F (Fail)</span>
                <span className="font-semibold">5%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-red-400 rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* System telemetry logs */}
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Class Active Participation
          </h3>
          <p className="text-sm text-slate-400">Aggregated participation reports across the last active contest sprints.</p>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Homework submission rate:</span>
              <span className="font-bold text-emerald-400">89% completion</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Contest participation rate:</span>
              <span className="font-bold text-blue-400">76% attendance</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">AI Mentor average interactions:</span>
              <span className="font-bold text-purple-400">4.5 prompts / student</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Earned certificates:</span>
              <span className="font-bold text-yellow-400">12 certificates issued</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
