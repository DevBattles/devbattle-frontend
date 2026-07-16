import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  UserCheck,
  FileText,
  Trophy,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  Zap,
} from "lucide-react";

import { useState, useEffect } from "react";
import api from "@/services/api";

function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard/teacher");
        setData(res.data.data);
      } catch (err) {
        console.error("Error loading teacher dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { label: "Total Students", value: data?.totalStudents || 0, icon: Users, color: "emerald" },
    { label: "Active Students", value: data?.totalStudents || 0, icon: UserCheck, color: "blue" },
    { label: "Homework Created", value: data?.homeworkCreated || 0, icon: FileText, color: "purple" },
    { label: "Contests Created", value: data?.contestsCreated || 0, icon: Trophy, color: "yellow" },
  ];

  const pendingReviews = [
    { id: 1, student: "Pending submissions", assignment: `${data?.pendingReviews || 0} items await review`, submittedAt: "Review now" },
  ];

  const recentActivity = [];

  const topPerformers = (data?.leaderboard || []).map((item, index) => ({
    rank: index + 1,
    name: item.user.username,
    xp: item.score * 10 || 0,
    submissions: item.attempts || 0
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 p-8">
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome back, Teacher! 👋
          </h1>
          <p className="text-slate-300">
            You have 3 pending reviews and 156 active students in your classes.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/teacher/homework"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Create Homework
              <Plus className="h-4 w-4" />
            </Link>
            <Link
              to="/teacher/contests"
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Create Contest
              <Plus className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <BarChart3 className="h-full w-full text-emerald-400" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}-500/20`}
                >
                  <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-yellow-400" />
                Pending Reviews
              </CardTitle>
              <Badge variant="warning">3 Pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{review.student}</h4>
                    <p className="text-sm text-slate-400">{review.assignment}</p>
                    <p className="mt-1 text-xs text-slate-500">{review.submittedAt}</p>
                  </div>
                  <Link
                    to={`/teacher/submissions/${review.id}`}
                    className="rounded-lg bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500/30"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      <span className="font-semibold">{activity.action}</span>:{" "}
                      {activity.details}
                    </p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Performers */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Top Performers
              </CardTitle>
              <Link
                to="/teacher/leaderboard"
                className="text-sm text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student) => (
                <div
                  key={student.rank}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        student.rank === 1
                          ? "bg-yellow-500/20 text-yellow-400"
                          : student.rank === 2
                          ? "bg-slate-400/20 text-slate-400"
                          : "bg-amber-700/20 text-amber-700"
                      }`}
                    >
                      #{student.rank}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{student.name}</h4>
                      <p className="text-sm text-slate-400">{student.submissions} submissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">{student.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link
                to="/teacher/question-bank"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <FileText className="h-5 w-5 text-emerald-400" />
                <span className="font-medium text-white">Question Bank</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
              <Link
                to="/teacher/homework"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="font-medium text-white">Manage Homework</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
              <Link
                to="/teacher/contests"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="font-medium text-white">Manage Contests</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
              <Link
                to="/teacher/analytics"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-white">View Analytics</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Analytics Overview
            </CardTitle>
            <Link
              to="/teacher/analytics"
              className="text-sm text-emerald-400 hover:underline"
            >
              View Details
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Average Score</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">87%</p>
              <p className="mt-1 text-xs text-emerald-400">+5% from last month</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Submission Rate</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">92%</p>
              <p className="mt-1 text-xs text-blue-400">+3% from last month</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">On-time Completion</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">78%</p>
              <p className="mt-1 text-xs text-yellow-400">+2% from last month</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">AI Usage</p>
              <p className="mt-2 text-2xl font-bold text-purple-400">1,234</p>
              <p className="mt-1 text-xs text-purple-400">reviews this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherDashboard;
