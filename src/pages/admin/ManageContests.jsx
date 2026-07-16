import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Trophy, Users, Calendar, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function ManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await api.get("/contests");
        if (res.data && res.data.success) {
          setContests(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load contests database records.");
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Platform Contests</h2>
        <p className="text-sm text-slate-400">Track student competitive programming sprint records.</p>
      </div>

      {contests.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400">
          No contests registered on the system.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contests.map((c) => (
            <div
              key={c.id}
              className="bg-[#111827]/50 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-yellow-500/20 text-yellow-400 rounded-xl flex items-center justify-center">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                    {c.isActive ? "Live" : "Ended/Scheduled"}
                  </span>
                </div>
                
                <h3 className="text-white font-bold text-lg truncate">{c.title}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-3">{c.description || "No description provided."}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Starts: {c.startTime ? new Date(c.startTime).toLocaleDateString() : "Scheduled"}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Max: {c.participantLimit || "No Limit"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageContests;
