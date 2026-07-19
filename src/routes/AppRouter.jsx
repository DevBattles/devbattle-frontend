import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Public Pages
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import About from "@/pages/home/About";
import Contact from "@/pages/home/Contact";
import Pricing from "@/pages/home/Pricing";
import FAQ from "@/pages/home/FAQ";

// Student Pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentQuestionBank from "@/pages/student/QuestionBank";
import StudentHomework from "@/pages/student/Homework";
import StudentContests from "@/pages/student/Contests";
import StudentLeaderboard from "@/pages/student/Leaderboard";
import Workspace from "@/pages/student/Workspace";
import AIChat from "@/pages/student/AIChat";
import Certificates from "@/pages/student/Certificates";
import Notifications from "@/pages/student/Notifications";

// Teacher Pages
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import TeacherQuestionBank from "@/pages/teacher/QuestionBank";
import TeacherHomework from "@/pages/teacher/Homework";
import TeacherContests from "@/pages/teacher/Contests";
import Submissions from "@/pages/teacher/Submissions";
import Analytics from "@/pages/teacher/Analytics";
import TeacherBatches from "@/pages/teacher/Batches";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageTeachers from "@/pages/admin/ManageTeachers";
import ManageStudents from "@/pages/admin/ManageStudents";
import ApproveTeachers from "@/pages/admin/ApproveTeachers";
import ManageHomework from "@/pages/admin/ManageHomework";
import ManageContests from "@/pages/admin/ManageContests";
import ManageCertificates from "@/pages/admin/ManageCertificates";
import PlatformAnalytics from "@/pages/admin/PlatformAnalytics";
import Departments from "@/pages/admin/Departments";

// Shared Pages
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

// Others
import NotFound from "@/pages/NotFound";

const DashboardRedirect = () => {
  const { getDashboardPath } = useAuth();
  return <Navigate to={getDashboardPath()} replace />;
};

const ProfileRedirect = () => {
  const { user } = useAuth();
  const profilePath = user?.role ? `/${user.role}/profile` : "/login";
  return <Navigate to={profilePath} replace />;
};

function AppRouter() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

      </Route>

      {/* ================= STUDENT ROUTES ================= */}

      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="question-bank" element={<StudentQuestionBank />} />
        <Route path="homework" element={<StudentHomework />} />
        <Route path="contests" element={<StudentContests />} />
        <Route path="leaderboard" element={<StudentLeaderboard />} />
        <Route path="workspace/:id" element={<Workspace />} />
        <Route path="contest/:contestId/solve" element={<Workspace />} />
        <Route path="ai-chat" element={<AIChat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* ================= TEACHER ROUTES ================= */}

      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="question-bank" element={<TeacherQuestionBank />} />
        <Route path="homework" element={<TeacherHomework />} />
        <Route path="contests" element={<TeacherContests />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="batches" element={<TeacherBatches />} />
        <Route path="leaderboard" element={<StudentLeaderboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="teachers" element={<ManageTeachers />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="approve-teachers" element={<ApproveTeachers />} />
        <Route path="question-bank" element={<TeacherQuestionBank />} />
        <Route path="homework" element={<ManageHomework />} />
        <Route path="contests" element={<ManageContests />} />
        <Route path="certificates" element={<ManageCertificates />} />
        <Route path="analytics" element={<PlatformAnalytics />} />
        <Route path="departments" element={<Departments />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* ================= LEGACY ROUTES (for backward compatibility) ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileRedirect />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRouter;