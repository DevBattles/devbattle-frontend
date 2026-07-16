import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Building2, Plus, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Departments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [collegeName, setCollegeName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [selectedCollegeId, setSelectedCollegeId] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/colleges-departments");
      if (res.data && res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load college list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCollege = async (e) => {
    e.preventDefault();
    if (!collegeName.trim()) return;
    try {
      await api.post("/admin/colleges", { name: collegeName });
      toast.success("College onboarded successfully!");
      setCollegeName("");
      fetchData();
    } catch (err) {
      toast.error("Failed to onboard college.");
    }
  };

  const handleAddDept = async (e) => {
    e.preventDefault();
    if (!deptName.trim() || !selectedCollegeId) return;
    try {
      await api.post("/admin/departments", { name: deptName, collegeId: selectedCollegeId });
      toast.success("Department onboarded successfully!");
      setDeptName("");
      fetchData();
    } catch (err) {
      toast.error("Failed to onboard department.");
    }
  };

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
        <h2 className="text-xl font-bold text-white mb-2">Onboard Colleges & Departments</h2>
        <p className="text-sm text-slate-400">Configure academic departments and link student streams.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Onboard Forms */}
        <div className="space-y-6">
          {/* Add College Form */}
          <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-emerald-400" />
              Onboard College
            </h3>
            <form onSubmit={handleAddCollege} className="flex gap-3">
              <input
                type="text"
                required
                placeholder="College Name (e.g. Stanford University)..."
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="flex-1 bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400 transition"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2.5 rounded-xl transition text-sm flex items-center gap-1 shrink-0"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </form>
          </div>

          {/* Add Dept Form */}
          <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-400" />
              Onboard Department
            </h3>
            <form onSubmit={handleAddDept} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Select College</label>
                <select
                  required
                  value={selectedCollegeId}
                  onChange={(e) => setSelectedCollegeId(e.target.value)}
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400 transition"
                >
                  <option value="">-- Choose College --</option>
                  {data.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  required
                  placeholder="Department Name (e.g. Computer Science)..."
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  className="flex-1 bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400 transition"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-2.5 rounded-xl transition text-sm flex items-center gap-1 shrink-0"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Existing List */}
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          <h3 className="text-lg font-bold text-white">Configured Colleges & Depts</h3>
          {data.length === 0 ? (
            <p className="text-sm text-slate-400">No records configured yet.</p>
          ) : (
            <div className="space-y-4">
              {data.map((college) => (
                <div key={college.id} className="border border-slate-800 rounded-xl p-4 bg-slate-900/30">
                  <h4 className="font-bold text-white text-sm">{college.name}</h4>
                  <ul className="mt-2 pl-4 list-disc space-y-1 text-slate-400 text-xs">
                    {college.departments && college.departments.length > 0 ? (
                      college.departments.map((dept) => <li key={dept.id}>{dept.name}</li>)
                    ) : (
                      <li className="list-none text-slate-500 italic">No departments onboarded yet.</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Departments;
