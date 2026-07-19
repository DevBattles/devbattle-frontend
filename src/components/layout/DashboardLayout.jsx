import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Trophy,
  Award,
  User,
  Settings,
  LogOut,
  MessageSquare,
  Users,
  BarChart3,
  ClipboardList,
  GraduationCap,
  Shield,
  Building2,
  Menu,
  X,
  Bell,
} from "lucide-react";

function DashboardLayout() {
  const { user, logout, getDashboardPath } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const studentMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
    { icon: BookOpen, label: "Question Bank", path: "/student/question-bank" },
    { icon: FileText, label: "Homework", path: "/student/homework" },
    { icon: Trophy, label: "Contests", path: "/student/contests" },
    { icon: Trophy, label: "Leaderboard", path: "/student/leaderboard" },
    { icon: Award, label: "Certificates", path: "/student/certificates" },
    { icon: User, label: "Profile", path: "/student/profile" },
    { icon: Settings, label: "Settings", path: "/student/settings" },
    { icon: MessageSquare, label: "AI Chat", path: "/student/ai-chat" },
  ];

  const teacherMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
    { icon: BookOpen, label: "Question Bank", path: "/teacher/question-bank" },
    { icon: FileText, label: "Homework", path: "/teacher/homework" },
    { icon: Trophy, label: "Contests", path: "/teacher/contests" },
    { icon: ClipboardList, label: "Submissions", path: "/teacher/submissions" },
    { icon: Users, label: "Manage Batches", path: "/teacher/batches" },
    { icon: Trophy, label: "Leaderboard", path: "/teacher/leaderboard" },
    { icon: BarChart3, label: "Analytics", path: "/teacher/analytics" },
    { icon: User, label: "Profile", path: "/teacher/profile" },
    { icon: Settings, label: "Settings", path: "/teacher/settings" },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Manage Teachers", path: "/admin/teachers" },
    { icon: GraduationCap, label: "Manage Students", path: "/admin/students" },
    { icon: Shield, label: "Approve Teachers", path: "/admin/approve-teachers" },
    { icon: BookOpen, label: "Question Bank", path: "/admin/question-bank" },
    { icon: FileText, label: "Homework", path: "/admin/homework" },
    { icon: Trophy, label: "Contests", path: "/admin/contests" },
    { icon: Award, label: "Certificates", path: "/admin/certificates" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Building2, label: "Departments", path: "/admin/departments" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const menuItems =
    user?.role === "student"
      ? studentMenuItems
      : user?.role === "teacher"
      ? teacherMenuItems
      : adminMenuItems;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050816]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#1e293b]/60 bg-[#0b0f19] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 h-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-[#1e293b]/60 p-6">
            <Link to={getDashboardPath()} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/5 border border-emerald-500/20">
                <Trophy className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">DevBattles</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6 text-slate-400 hover:text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1.5">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`relative flex items-center gap-3 rounded-xl px-4 py-3 transition duration-200 overflow-hidden ${
                        active
                          ? "bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-400 font-semibold"
                          : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-100"
                      }`}
                    >
                      {active && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-400 rounded-r" />
                      )}
                      <item.icon className={`h-5 w-5 ${active ? "text-emerald-400" : "text-slate-400"}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info */}
          <div className="border-t border-[#1e293b]/60 p-4 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 border border-slate-800/40 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/10">
                <User className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-bold text-white">
                  {user?.username}
                </p>
                <div className="mt-0.5 inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/20 capitalize">
                  {user?.role}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b border-[#1e293b]/60 bg-[#050816]/75 backdrop-blur-md px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-slate-400" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent capitalize">
              {location.pathname.split("/").pop()?.replace("-", " ") ||
                "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to={`/${user?.role}/notifications`}
              className="relative rounded-xl p-2 text-slate-400 transition hover:bg-slate-800/30 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400" />
            </Link>
            <Link
              to={`/${user?.role}/profile`}
              className="flex items-center gap-3 rounded-xl bg-slate-900/60 border border-slate-800/40 px-4 py-2 transition hover:bg-slate-800/80"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/10">
                <User className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="hidden text-sm font-semibold text-slate-200 sm:block">
                {user?.username}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
