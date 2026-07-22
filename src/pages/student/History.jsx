import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Trophy,
  BookOpen,
  FileText,
  Award,
  CheckCircle2,
  Clock,
  Loader2,
  BarChart2,
  Calendar,
} from "lucide-react";

function StudentHistory() {
  const [activeTab, setActiveTab] = useState("contests");

  const { data: historyRes, isLoading: loading } = useQuery({
    queryKey: ["student-history"],
    queryFn: async () => {
      const res = await api.get("/users/history");
      return res.data?.data || {};
    },
  });

  const stats = historyRes?.stats || {};
  const contests = historyRes?.contests || [];
  const homeworks = historyRes?.homeworks || [];
  const questionProgress = historyRes?.questionProgress || [];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My History & Progress</h1>
        <p className="text-slate-400">
          Track your past contest performances, homework submissions, and overall problem-solving metrics.
        </p>
      </div>

      {/* Aggregate Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-700/50 bg-[#111827]/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Contests Participated</p>
                <p className="mt-2 text-3xl font-extrabold text-white">{stats.totalContests || 0}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-400">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-[#111827]/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Homeworks Submitted</p>
                <p className="mt-2 text-3xl font-extrabold text-white">{stats.totalHomeworks || 0}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-[#111827]/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Average Score</p>
                <p className="mt-2 text-3xl font-extrabold text-emerald-400">{stats.averageScore || 0}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <BarChart2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-[#111827]/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Highest Score</p>
                <p className="mt-2 text-3xl font-extrabold text-blue-400">{stats.highestScore || 0}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Selection */}
      <div className="flex border-b border-slate-700/50 gap-4">
        <button
          onClick={() => setActiveTab("contests")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer border-b-2 ${
            activeTab === "contests"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Contests History ({contests.length})
        </button>
        <button
          onClick={() => setActiveTab("homeworks")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer border-b-2 ${
            activeTab === "homeworks"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Homework History ({homeworks.length})
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer border-b-2 ${
            activeTab === "questions"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Question Bank Activity ({questionProgress.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "contests" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            {contests.length === 0 ? (
              <p className="text-slate-400 text-sm">No contest submissions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50 text-slate-400 font-semibold">
                      <th className="pb-3">Contest Title</th>
                      <th className="pb-3 text-center">Score</th>
                      <th className="pb-3 text-center">Grade</th>
                      <th className="pb-3">Submitted At</th>
                      <th className="pb-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {contests.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-4 font-semibold text-white">{c.contestTitle || "Contest"}</td>
                        <td className="py-4 text-center font-bold text-emerald-400">{c.score}%</td>
                        <td className="py-4 text-center">
                          <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                            {c.grade || "A"}
                          </span>
                        </td>
                        <td className="py-4 text-xs text-slate-400">
                          {c.submittedAt ? new Date(c.submittedAt).toLocaleString() : "Recently"}
                        </td>
                        <td className="py-4 text-center">
                          <Badge variant="success" className="capitalize">{c.status || "Graded"}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "homeworks" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            {homeworks.length === 0 ? (
              <p className="text-slate-400 text-sm">No homework submissions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50 text-slate-400 font-semibold">
                      <th className="pb-3">Homework Title</th>
                      <th className="pb-3 text-center">Score</th>
                      <th className="pb-3 text-center">Grade</th>
                      <th className="pb-3">Submitted At</th>
                      <th className="pb-3">Teacher Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {homeworks.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-4 font-semibold text-white">{h.homeworkTitle || "Homework"}</td>
                        <td className="py-4 text-center font-bold text-emerald-400">{h.score}%</td>
                        <td className="py-4 text-center">
                          <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                            {h.grade || "A"}
                          </span>
                        </td>
                        <td className="py-4 text-xs text-slate-400">
                          {h.submittedAt ? new Date(h.submittedAt).toLocaleString() : "Recently"}
                        </td>
                        <td className="py-4 text-xs text-slate-300 italic max-w-xs truncate">
                          "{typeof h.feedback === 'object' ? h.feedback?.generalFeedback || 'Great work' : h.feedback || 'Good job'}"
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "questions" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            {questionProgress.length === 0 ? (
              <p className="text-slate-400 text-sm">No question bank activity logged yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50 text-slate-400 font-semibold">
                      <th className="pb-3">Question Title</th>
                      <th className="pb-3 text-center">Attempts</th>
                      <th className="pb-3 text-center">Score</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3">Completed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {questionProgress.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-4 font-semibold text-white">{q.questionTitle || "Question"}</td>
                        <td className="py-4 text-center">{q.attempts || 1}</td>
                        <td className="py-4 text-center font-bold text-emerald-400">{q.score || 100}</td>
                        <td className="py-4 text-center">
                          <Badge variant={q.status === 'completed' ? 'success' : 'warning'} className="capitalize">
                            {q.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-xs text-slate-400">
                          {q.completedAt ? new Date(q.completedAt).toLocaleString() : "Recently"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default StudentHistory;
