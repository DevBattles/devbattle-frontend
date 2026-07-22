import { useState } from "react";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Eye, FileCode, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

function Submissions() {
  const [activeTab, setActiveTab] = useState("homework");
  const [selectedSub, setSelectedSub] = useState(null);

  const { data: submissionsResponse, isLoading: loading } = useQuery({
    queryKey: ["submissions", "teacher", activeTab],
    queryFn: async () => {
      const endpoint = activeTab === "homework" ? "/homework/submissions" : "/contests/submissions";
      const res = await api.get(endpoint);
      return res.data;
    },
  });

  const submissions = submissionsResponse?.data || [];

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

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-700 pb-px">
        <button
          onClick={() => setActiveTab("homework")}
          className={`pb-3 text-sm font-semibold transition border-b-2 ${
            activeTab === "homework"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Homework Submissions
        </button>
        <button
          onClick={() => setActiveTab("contest")}
          className={`pb-3 text-sm font-semibold transition border-b-2 ${
            activeTab === "contest"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Contest Submissions
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center space-y-4">
          <FileCode className="h-16 w-16 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Submissions Found</h3>
          <p className="text-sm text-slate-400">Once students submit code modules, they will show up here.</p>
        </div>
      ) : (
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/40 text-slate-400 font-semibold">
                  <th className="p-4">Student</th>
                  <th className="p-4">{activeTab === "homework" ? "Homework Title" : "Contest Title"}</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Score</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4">Submission Time</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-semibold text-white">{sub.student?.username || "Student"}</td>
                    <td className="p-4">{activeTab === "homework" ? (sub.homework?.title || "Homework Challenge") : (sub.contest?.title || "Contest Challenge")}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        sub.status === 'graded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {sub.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-emerald-400">{sub.score !== undefined && sub.score !== null ? `${sub.score}%` : 'N/A'}</td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {sub.grade || "N/A"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      {sub.submittedAt || sub.createdAt ? new Date(sub.submittedAt || sub.createdAt).toLocaleString() : "Recently"}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 rounded-xl transition cursor-pointer"
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
                  Submitted by <span className="text-emerald-400 font-semibold">{selectedSub.student?.username || "Student"}</span> ({selectedSub.student?.email}) for <span className="text-white font-semibold">{selectedSub.homework?.title || selectedSub.contest?.title || "Assignment"}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submitted At: {selectedSub.submittedAt || selectedSub.createdAt ? new Date(selectedSub.submittedAt || selectedSub.createdAt).toLocaleString() : "Recently"}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-slate-400 hover:text-white transition cursor-pointer text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Score panel */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Final Score</p>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-1">{selectedSub.score !== undefined && selectedSub.score !== null ? `${selectedSub.score}%` : 'N/A'}</p>
                </div>
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Assigned Grade</p>
                  <p className="text-3xl font-extrabold text-blue-400 mt-1">{selectedSub.grade || "N/A"}</p>
                </div>
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Submission Status</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-2 flex items-center justify-center gap-1 capitalize">
                    <CheckCircle className="h-4 w-4" /> {selectedSub.status || 'pending'}
                  </p>
                </div>
              </div>

              {/* GitHub Repo link if present */}
              {selectedSub.githubRepo && (
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">GitHub Repository</p>
                    <a href={selectedSub.githubRepo} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline font-mono mt-1 block">
                      {selectedSub.githubRepo}
                    </a>
                  </div>
                </div>
              )}

              {/* Code Editor Preview */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Submitted Files Code</h4>
                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 overflow-auto max-h-60 font-mono text-xs text-slate-300 whitespace-pre-wrap">
                  {typeof selectedSub.files === 'object' && selectedSub.files !== null
                    ? Object.entries(selectedSub.files)
                        .map(([name, data]) => `// === ${name} ===\n${typeof data === 'string' ? data : data?.content || ''}`)
                        .join('\n\n')
                    : selectedSub.code || selectedSub.files || "// No code content submitted"}
                </div>
              </div>

              {/* AI Feedback Report details */}
              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm">AI Evaluation Feedback</h4>
                
                {selectedSub.feedback ? (
                  <div className="space-y-4">
                    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 text-sm text-slate-300 italic leading-relaxed">
                      "{typeof selectedSub.feedback === 'object' ? selectedSub.feedback.generalFeedback || JSON.stringify(selectedSub.feedback) : selectedSub.feedback}"
                    </div>

                    {typeof selectedSub.feedback === 'object' && (
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
                    )}
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
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-xl transition text-sm cursor-pointer"
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
