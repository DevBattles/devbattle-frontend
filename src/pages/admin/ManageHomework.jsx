import { useEffect, useState } from "react";
import api from "@/services/api";
import { FileCode, Calendar, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function ManageHomework() {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const res = await api.get("/homework");
        if (res.data && res.data.success) {
          const list = res.data.data?.data || res.data.data || [];
          setHomeworks(list);
        }
      } catch (err) {
      console.error(err);

        toast.error("Failed to load homework database records.");
    } finally {
        setLoading(false);
      }
    };
    fetchHomeworks();
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
        <h2 className="text-xl font-bold text-white mb-2">Platform Homework</h2>
        <p className="text-sm text-slate-400">Overview of all assignments created by teachers across departments.</p>
      </div>

      {homeworks.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400">
          No homework records found on the system.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeworks.map((hw) => (
            <div
              key={hw.id}
              className="bg-[#111827]/50 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-md capitalize">
                    {hw.difficulty || "medium"}
                  </span>
                </div>
                
                <h3 className="text-white font-bold text-lg truncate">{hw.title}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-3">{hw.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Due: {hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : "No Deadline"}
                </span>
                <span>Max: {hw.maxScore || 100} Points</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageHomework;
