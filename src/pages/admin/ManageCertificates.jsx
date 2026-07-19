import { useState } from "react";
import api from "@/services/api";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

function ManageCertificates() {
  const [formData, setFormData] = useState({
    studentId: "",
    questionId: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/certificates", formData);
      if (res.data && res.data.success) {
        toast.success("Certificate issued successfully!");
        setFormData({ studentId: "", questionId: "", title: "", description: "" });
      }
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to generate certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Issue Certificates</h2>
        <p className="text-sm text-slate-400">Award certificates of excellence directly to platform students.</p>
      </div>

      <div className="max-w-2xl bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Student ID (UUID)</label>
            <input
              type="text"
              name="studentId"
              required
              placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Challenge Question ID (UUID - Optional)</label>
            <input
              type="text"
              name="questionId"
              placeholder="e.g. 123e4567-e89b-12d3-a456-426614174001"
              value={formData.questionId}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Certificate Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Master of React Component Sprints"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Detailed Description</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the student achievements and scoring details..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition disabled:opacity-60 text-sm"
          >
            {loading ? "Issuing..." : "Issue Certificate"}
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageCertificates;
