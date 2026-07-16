import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Eye, FileCode, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get("/homework/submissions");
        if (res.data && res.data.success) {
          setSubmissions(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load submissions list.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
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
        <h2 className="text-xl font-bold text-white mb-2">Student Submissions</h2>
        <p className="text-sm text-slate-400">Monitor academic submissions, check grade results, and inspect source files.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center space-y-4">
          <FileCode className="h-16 w-16 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Submissions Found</h3>
          <p className="text-sm text-slate-400">Once students submit homework code modules, they will show up here.</p>
        </div>
      ) : (
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/40 text-slate-400 font-semibold">
                  <th className="p-4">Student</th>
                  <th className="p-4">Homework Title</th>
                  <th className="p-4 text-center">Score</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-semibold text-white">{sub.student?.username || "Student"}</td>
                    <td className="p-4">{sub.homework?.title || "Challenge"}</td>
                    <td className="p-4 text-center font-bold text-emerald-400">{sub.score}%</td>
                    <td className="p-4 text-center">
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {sub.grade || "C"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "Recently"}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 rounded-xl transition"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-slate-700 w-full max-w-4xl rounded-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#111827]">
              <div>
                <h3 className="text-xl font-bold text-white">Review Submission</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Submitted by {selectedSub.student?.username} for {selectedSub.homework?.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Score panel */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Final Score</p>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-1">{selectedSub.score}%</p>
                </div>
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Assigned Grade</p>
                  <p className="text-3xl font-extrabold text-blue-400 mt-1">{selectedSub.grade || "C"}</p>
                </div>
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">AI Verified</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-2 flex items-center justify-center gap-1">
                    <CheckCircle className="h-4 w-4" /> Yes
                  </p>
                </div>
              </div>

              {/* Code Editor Preview */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Submitted Files Code</h4>
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 overflow-auto max-h-60 font-mono text-xs text-slate-300 whitespace-pre-wrap">
                  {selectedSub.code || "// No code content submitted"}
                </div>
              </div>

              {/* AI Feedback Report details */}
              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm">AI Evaluation Feedback</h4>
                
                {selectedSub.feedback ? (
                  <div className="space-y-4">
                    <div className="bg-[#0F172A] border border-slate-850 rounded-xl p-4 text-sm text-slate-300 italic leading-relaxed">
                      "{selectedSub.feedback.generalFeedback || "No general feedback summary available."}"
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <span className="font-bold text-emerald-400 block">Strengths</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-300 text-xs">
                          {selectedSub.feedback.strengths?.map((str, idx) => (
                            <li key={idx}>{str}</li>
                          )) || <li>None noted.</li>}
                        </ul>
                      </div>
                      
                      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-2">
                        <span className="font-bold text-red-400 block">Weaknesses & Issues</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-300 text-xs">
                          {selectedSub.feedback.weaknesses?.map((wk, idx) => (
                            <li key={idx}>{wk}</li>
                          )) || <li>None noted.</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-4 py-3 rounded-xl text-sm">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    No detailed rubrics available for this submission record.
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-[#111827] flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-xl transition text-sm"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Submissions;
