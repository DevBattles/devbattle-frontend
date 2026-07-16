import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  GraduationCap,
  Shield,
  BookOpen,
  FileText,
  Trophy,
  Award,
  BarChart3,
  Building2,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

function AdminDashboard() {
  const platformStats = [
    { label: "Total Teachers", value: 45, icon: Users, color: "emerald" },
    { label: "Total Students", value: 1234, icon: GraduationCap, color: "blue" },
    { label: "Pending Approvals", value: 12, icon: Shield, color: "yellow" },
    { label: "Total Questions", value: 567, icon: BookOpen, color: "purple" },
  ];

  const pendingApprovals = [
    { id: 1, name: "Dr. Sarah Wilson", email: "sarah@university.edu", department: "Computer Science", requestedAt: "2 hours ago" },
    { id: 2, name: "Prof. John Davis", email: "john@college.edu", department: "Software Engineering", requestedAt: "5 hours ago" },
    { id: 3, name: "Dr. Emily Brown", email: "emily@institute.edu", department: "Web Development", requestedAt: "1 day ago" },
  ];

  const recentActivity = [
    { id: 1, action: "New teacher registered", details: "Dr. Sarah Wilson", time: "2 hours ago", type: "info" },
    { id: 2, action: "Question bank updated", details: "50 new questions added", time: "5 hours ago", type: "success" },
    { id: 3, action: "Contest completed", details: "React Challenge - 234 participants", time: "1 day ago", type: "success" },
    { id: 4, action: "System alert", details: "High AI usage detected", time: "2 days ago", type: "warning" },
  ];

  const departmentStats = [
    { name: "Computer Science", students: 456, teachers: 18, growth: "+12%" },
    { name: "Software Engineering", students: 378, teachers: 15, growth: "+8%" },
    { name: "Web Development", students: 234, teachers: 8, growth: "+15%" },
    { name: "Data Science", students: 166, teachers: 4, growth: "+20%" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 p-8">
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-slate-300">
            Platform is running smoothly. You have 12 pending teacher approvals.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/admin/approve-teachers"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Review Approvals
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/admin/analytics"
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              View Analytics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <Shield className="h-full w-full text-emerald-400" />
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => (
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
        {/* Pending Teacher Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Pending Teacher Approvals
              </CardTitle>
              <Badge variant="warning">12 Pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{approval.name}</h4>
                    <p className="text-sm text-slate-400">{approval.email}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{approval.department}</span>
                      <span>•</span>
                      <span>{approval.requestedAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-emerald-500/20 px-3 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/30">
                      Approve
                    </button>
                    <button className="rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/30">
                      Reject
                    </button>
                  </div>
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
                  className="flex items-start gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === "success"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : activity.type === "warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {activity.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : activity.type === "warning" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
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
        {/* Department Statistics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-400" />
                Department Statistics
              </CardTitle>
              <Link
                to="/admin/departments"
                className="text-sm text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div
                  key={dept.name}
                  className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{dept.name}</h4>
                    <div className="mt-1 flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {dept.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {dept.teachers} teachers
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-400">{dept.growth}</p>
                    <p className="text-xs text-slate-400">Growth</p>
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
                to="/admin/teachers"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <Users className="h-5 w-5 text-emerald-400" />
                <span className="font-medium text-white">Manage Teachers</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/students"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <span className="font-medium text-white">Manage Students</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/question-bank"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <BookOpen className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-white">Question Bank</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/analytics"
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:bg-slate-800/50 hover:border-emerald-500/50"
              >
                <BarChart3 className="h-5 w-5 text-yellow-400" />
                <span className="font-medium text-white">Platform Analytics</span>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Analytics Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Platform Analytics Overview
            </CardTitle>
            <Link
              to="/admin/analytics"
              className="text-sm text-emerald-400 hover:underline"
            >
              View Details
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Active Users</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">892</p>
              <p className="mt-1 text-xs text-emerald-400">+15% this week</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Total Submissions</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">5,678</p>
              <p className="mt-1 text-xs text-blue-400">+22% this month</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Contests Hosted</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">45</p>
              <p className="mt-1 text-xs text-yellow-400">+8 this month</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">AI Reviews</p>
              <p className="mt-2 text-2xl font-bold text-purple-400">12,345</p>
              <p className="mt-1 text-xs text-purple-400">+30% this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Server Status</p>
                <p className="text-sm text-emerald-400">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Database</p>
                <p className="text-sm text-emerald-400">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold text-white">AI Service</p>
                <p className="text-sm text-yellow-400">High Load</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
