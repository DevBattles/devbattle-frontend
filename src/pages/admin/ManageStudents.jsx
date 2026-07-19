import { useEffect, useState } from "react";
import api from "@/services/api";
import { Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/admin/students");
        if (res.data && res.data.success) {
          setStudents(res.data.data);
        }
      } catch (err) {
      console.error(err);

        toast.error("Failed to load students list.");
    } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Students</h2>
          <p className="text-sm text-slate-400 mt-1">Review all active college student accounts.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400 transition"
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400">
          No students registered on the platform yet.
        </div>
      ) : (
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/40 text-slate-400 font-semibold">
                  <th className="p-4">Username</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">College</th>
                  <th className="p-4">Department</th>
                  <th className="p-4 text-center">XP Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-semibold text-white">{s.username}</td>
                    <td className="p-4">{s.email}</td>
                    <td className="p-4 text-slate-400">{s.collegeName || "Stanford College"}</td>
                    <td className="p-4 text-slate-400">{s.departmentName || "Computer Science"}</td>
                    <td className="p-4 text-center font-bold text-yellow-400">{s.xp || 0} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageStudents;
