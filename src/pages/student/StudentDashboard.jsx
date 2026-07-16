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

function StudentDashboard() {
  const upcomingHomework = [
    { id: 1, title: "React Portfolio", dueDate: "2024-01-20", difficulty: "Medium" },
    { id: 2, title: "E-commerce API", dueDate: "2024-01-22", difficulty: "Hard" },
    { id: 3, title: "Responsive Landing Page", dueDate: "2024-01-25", difficulty: "Easy" },
  ];

  const upcomingContests = [
    { id: 1, name: "React Challenge", startTime: "2024-01-18 10:00", participants: 234 },
    { id: 2, name: "Full Stack Sprint", startTime: "2024-01-21 14:00", participants: 156 },
  ];

  const recentSubmissions = [
    { id: 1, title: "Todo App", score: 92, status: "Completed" },
    { id: 2, title: "Weather Dashboard", score: 88, status: "Completed" },
    { id: 3, title: "Netflix Clone", score: 95, status: "Completed" },
  ];

  const notifications = [
    { id: 1, message: "New homework assigned: React Portfolio", time: "2 hours ago" },
    { id: 2, message: "Your submission was reviewed", time: "5 hours ago" },
    { id: 3, message: "Contest starting soon: React Challenge", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8">
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome back, Student! 👋
          </h1>
          <p className="text-slate-300">
            You have 3 pending homework and 2 upcoming contests this week.
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
                <p className="mt-2 text-3xl font-bold text-white">68%</p>
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
                <p className="mt-2 text-3xl font-bold text-white">#12</p>
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
                <p className="mt-2 text-3xl font-bold text-white">5</p>
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
                <p className="mt-2 text-3xl font-bold text-white">2,450</p>
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
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                >
                  <p className="text-sm text-white">{notification.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Feedback Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-400" />
            AI Feedback Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Code Quality</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">Excellent</p>
              <div className="mt-2 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[90%] rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Best Practices</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">Good</p>
              <div className="mt-2 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[75%] rounded-full bg-blue-400" />
              </div>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Optimization</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">Needs Work</p>
              <div className="mt-2 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[60%] rounded-full bg-yellow-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
