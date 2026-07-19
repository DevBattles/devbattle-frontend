import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Clock,
  Trophy,
  BookOpen,
  FileText,
  TrendingUp,
  Award,
  Bell,
  Zap,
  ArrowRight,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Loader2 } from "lucide-react";

function StudentDashboard() {
  const { data: dashboardResponse, isLoading: loading } = useQuery({
    queryKey: ["dashboard", "student"],
    queryFn: async () => {
      const res = await api.get("/dashboard/student");
      return res.data;
    },
  });

  const data = dashboardResponse?.data;

  const upcomingHomework = data?.upcomingHomework || [];
  const upcomingContests = data?.upcomingContests || [];
  const recentSubmissions = data?.recentSubmission ? [
    { id: data.recentSubmission.id, title: "Recent Assignment", score: data.recentSubmission.score, status: data.recentSubmission.status }
  ] : [];
  const notifications = data?.recentActivity || []; // fallback if needed

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8">
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome back, Student! 👋
          </h1>
          <p className="text-slate-300">
            You have {upcomingHomework.length} pending homework and {upcomingContests.length} upcoming contests this week.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/student/homework"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              View Homework
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/student/contests"
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              View Contests
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <Trophy className="h-full w-full text-emerald-400" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Question Bank Progress</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {data?.questionBankProgress?.percentage || 0}%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                <BookOpen className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Leaderboard Position</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {data?.leaderboardPosition ? `#${data.leaderboardPosition}` : "Unranked"}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Trophy className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Certificates Earned</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {data?.certificatesCount || 0}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total XP</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {(data?.questionBankProgress?.solved || 0) * 100}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Homework */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400" />
                Upcoming Homework
              </CardTitle>
              <Link
                to="/student/homework"
                className="text-sm text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingHomework.map((homework) => (
                <div
                  key={homework.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{homework.title}</h4>
                    <div className="mt-1 flex items-center gap-3 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {homework.dueDate}
                      </span>
                      <Badge
                        variant={
                          homework.difficulty === "Easy"
                            ? "success"
                            : homework.difficulty === "Medium"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {homework.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Link
                    to={`/student/workspace/${homework.id}`}
                    className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/30"
                  >
                    Start
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Contests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Upcoming Contests
              </CardTitle>
              <Link
                to="/student/contests"
                className="text-sm text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingContests.map((contest) => (
                <div
                  key={contest.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{contest.name}</h4>
                    <div className="mt-1 flex items-center gap-3 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {contest.startTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {contest.participants} participants
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/student/contest/${contest.id}`}
                    className="rounded-lg bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500/30"
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Submissions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Recent Submissions
              </CardTitle>
              <Link
                to="/student/profile"
                className="text-sm text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{submission.title}</h4>
                    <Badge variant="success" className="mt-2">
                      {submission.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">
                      {submission.score}%
                    </p>
                    <p className="text-xs text-slate-400">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length > 0 ? notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                >
                  <p className="text-sm text-white">{notification.action} - {notification.details}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              )) : (
                <p className="text-sm text-slate-400">No new notifications</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/student/question-bank"
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
            >
              <BookOpen className="h-8 w-8 text-emerald-400" />
              <span className="font-semibold text-white">Question Bank</span>
            </Link>
            <Link
              to="/student/homework"
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
            >
              <FileText className="h-8 w-8 text-blue-400" />
              <span className="font-semibold text-white">Homework</span>
            </Link>
            <Link
              to="/student/contests"
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
            >
              <Trophy className="h-8 w-8 text-yellow-400" />
              <span className="font-semibold text-white">Contests</span>
            </Link>
            <Link
              to="/student/ai-chat"
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
            >
              <Zap className="h-8 w-8 text-purple-400" />
              <span className="font-semibold text-white">AI Chat</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentDashboard;
