import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Building2, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Departments() {
  const queryClient = useQueryClient();
  const [collegeName, setCollegeName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [selectedCollegeId, setSelectedCollegeId] = useState("");

  const { data: collegesData, isLoading } = useQuery({
    queryKey: ["adminCollegesDepartments"],
    queryFn: async () => {
      const res = await api.get("/admin/colleges-departments");
      if (res.data && res.data.success) {
        return res.data.data;
      }
      return { colleges: [], departments: [] };
    }
  });

  const addCollegeMutation = useMutation({
    mutationFn: async (name) => {
      await api.post("/admin/colleges", { name });
    },
    onSuccess: () => {
      toast.success("College onboarded successfully!");
      setCollegeName("");
      queryClient.invalidateQueries(["adminCollegesDepartments"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to onboard college.");
    }
  });

  const addDeptMutation = useMutation({
    mutationFn: async (data) => {
      await api.post("/admin/departments", data);
    },
    onSuccess: () => {
      toast.success("Department onboarded successfully!");
      setDeptName("");
      queryClient.invalidateQueries(["adminCollegesDepartments"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to onboard department.");
    }
  });

  const handleAddCollege = (e) => {
    e.preventDefault();
    if (!collegeName.trim()) return;
    addCollegeMutation.mutate(collegeName);
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!deptName.trim() || !selectedCollegeId) return;
    addDeptMutation.mutate({ name: deptName, collegeId: selectedCollegeId });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  const colleges = collegesData?.colleges || [];
  const departments = collegesData?.departments || [];

  const collegesWithDepts = colleges.map((college) => ({
    ...college,
    departments: departments.filter((dept) => dept.collegeId === college.id)
  }));

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
                disabled={addCollegeMutation.isPending}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2.5 rounded-xl transition text-sm flex items-center gap-1 shrink-0 disabled:opacity-50"
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
                  {colleges.map((c) => (
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
                  disabled={addDeptMutation.isPending}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-2.5 rounded-xl transition text-sm flex items-center gap-1 shrink-0 disabled:opacity-50"
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
          {collegesWithDepts.length === 0 ? (
            <p className="text-sm text-slate-400">No records configured yet.</p>
          ) : (
            <div className="space-y-4">
              {collegesWithDepts.map((college) => (
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
