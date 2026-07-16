import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/admin/teachers");
      if (res.data && res.data.success) {
        setTeachers(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load teachers list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const toggleApproval = async (id, currentStatus) => {
    try {
      await api.put(`/admin/teachers/${id}/approve`);
      toast.success(currentStatus ? "Approved status revoked" : "Teacher account approved!");
      fetchTeachers();
    } catch (err) {
      toast.error("Failed to update teacher approval status.");
    }
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-xl font-bold text-white">Manage Teachers</h2>
          <p className="text-sm text-slate-400 mt-1">Review accounts, assign permissions, and control access tags.</p>
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

      {filteredTeachers.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400">
          No teachers found.
        </div>
      ) : (
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/40 text-slate-400 font-semibold">
                  <th className="p-4">Username</th>
                  <th className="p-4">Email</th>
                  <th className="p-4 text-center">Approved Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-semibold text-white">{t.username}</td>
                    <td className="p-4">{t.email}</td>
                    <td className="p-4 text-center">
                      {t.isApproved ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                          <XCircle className="h-3.5 w-3.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleApproval(t.id, t.isApproved)}
                        className={`font-semibold px-4 py-2 rounded-xl transition text-xs ${
                          t.isApproved
                            ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                            : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
                        }`}
                      >
                        {t.isApproved ? "Revoke Access" : "Approve Account"}
                      </button>
                    </td>
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

export default ManageTeachers;
