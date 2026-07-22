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
  Clock,
  Plus,
  ArrowRight,
  Zap,
} from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import toast from "react-hot-toast";

function TeacherDashboard() {
  const queryClient = useQueryClient();

  const { data: dashboardResponse, isLoading: loading } = useQuery({
    queryKey: ["dashboard", "teacher"],
    queryFn: async () => {
      const res = await api.get("/dashboard/teacher");
      return res.data;
    },
  });

  const { data: joinRequestsRes } = useQuery({
    queryKey: ["batches", "join-requests"],
    queryFn: async () => {
      const res = await api.get("/batches/join-requests");
      return res.data.data || [];
    }
  });

  const joinRequests = joinRequestsRes || [];

  const acceptRequestMutation = useMutation({
    mutationFn: async (requestId) => {
      await api.post(`/batches/join-requests/${requestId}/accept`);
    },
    onSuccess: () => {
      toast.success("Student join request accepted!");
      queryClient.invalidateQueries(["batches", "join-requests"]);
      queryClient.invalidateQueries(["dashboard", "teacher"]);
    },
    onError: () => {
      toast.error("Failed to accept join request.");
    }
  });

  const rejectRequestMutation = useMutation({
    mutationFn: async (requestId) => {
      await api.post(`/batches/join-requests/${requestId}/reject`);
    },
    onSuccess: () => {
      toast.success("Student join request rejected.");
      queryClient.invalidateQueries(["batches", "join-requests"]);
    },
    onError: () => {
      toast.error("Failed to reject join request.");
    }
  });

  const data = dashboardResponse?.data;

  const stats = [
    { label: "Total Students", value: data?.totalStudents || 0, icon: Users, color: "emerald" },
    { label: "Active Students", value: data?.totalStudents || 0, icon: UserCheck, color: "blue" },
    { label: "Homework Created", value: data?.homeworkCreated || 0, icon: FileText, color: "purple" },
    { label: "Contests Created", value: data?.contestsCreated || 0, icon: Trophy, color: "yellow" },
  ];

  const pendingReviewsCount = data?.pendingReviews || 0;
  const recentActivity = data?.recentActivity || [];

  const topPerformers = (data?.leaderboard || []).map((item, index) => ({
    rank: index + 1,
    name: item.user?.username || "Unknown",
    xp: item.score * 10 || 0,
    submissions: item.attempts || 0
  }));

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8">
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome back, Teacher! 👨‍🏫
          </h1>
          <p className="text-slate-300">
            You have {pendingReviewsCount} submissions pending review and {joinRequests.length} pending batch join requests.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/teacher/homework/new"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Create Homework
            </Link>
            <Link
              to="/teacher/contests/new"
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Create Contest
            </Link>
          </div>
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

      {/* Pending Join Requests Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
              <Users className="h-5 w-5 text-emerald-400" />
              Batch Join Requests
            </CardTitle>
            <Badge variant="warning">{joinRequests.length} Pending</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {joinRequests.length === 0 ? (
            <p className="text-sm text-slate-400 py-2">No pending student join requests for your batches.</p>
          ) : (
            <div className="space-y-3">
              {joinRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div>
                    <h4 className="font-semibold text-white">{req.studentName}</h4>
                    <p className="text-xs text-slate-400">{req.studentEmail}</p>
                    <p className="text-xs text-emerald-400 mt-1 font-mono">
                      Batch: {req.batchName} ({req.collegeName})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptRequestMutation.mutate(req.id)}
                      disabled={acceptRequestMutation.isPending}
                      className="rounded-lg bg-emerald-500/20 px-3 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/30 cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectRequestMutation.mutate(req.id)}
                      disabled={rejectRequestMutation.isPending}
                      className="rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/30 cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
              {pendingReviewsCount > 0 ? (
                <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Pending submissions</h4>
                    <p className="text-sm text-slate-400">{pendingReviewsCount} items await review</p>
                  </div>
                  <Link
                    to="/teacher/submissions"
                    className="rounded-lg bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500/30"
                  >
                    Review All
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-slate-400">No pending reviews</p>
              )}
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
              {recentActivity.length > 0 ? recentActivity.map((activity) => (
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
                    <p className="text-xs text-slate-400">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-400">No recent activity</p>
              )}
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


    </div>
  );
}

export default TeacherDashboard;
