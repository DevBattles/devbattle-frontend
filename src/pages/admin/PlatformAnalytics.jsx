import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Shield, Users, Building, GraduationCap, Server, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function PlatformAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/admin");
        if (res.data && res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load platform analytics telemetry.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
      title: "Colleges Onboarded",
      value: stats?.totalColleges || 0,
      icon: Building,
      color: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Departments Configured",
      value: stats?.totalDepartments || 0,
      icon: Shield,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Total Teachers registered",
      value: stats?.totalTeachers || 0,
      icon: Users,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Total Students practicing",
      value: stats?.totalStudents || 0,
      icon: GraduationCap,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Platform Administration Analytics</h2>
        <p className="text-sm text-slate-400">Global system analytics and telemetry logs.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, idx) => (
          <div key={idx} className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{c.title}</p>
                <p className="mt-2 text-3xl font-bold text-white">{c.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${c.color}`}>
                <c.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Server className="h-5 w-5 text-emerald-400" />
          Server Lifespan & Telemetry Details
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 block text-xs">Node.js Version</span>
            <span className="text-white font-bold block mt-1">v20.11.0</span>
          </div>
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 block text-xs">AI FastAPI Engine</span>
            <span className="text-white font-bold block mt-1">Python 3.13</span>
          </div>
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 block text-xs">Database Extension</span>
            <span className="text-white font-bold block mt-1">pgvector enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformAnalytics;
