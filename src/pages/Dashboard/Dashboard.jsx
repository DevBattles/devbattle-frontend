import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0F172A]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-emerald-400">Dev</span>Battles
            </h1>
            <p className="text-sm text-slate-400">
              Developer Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-5 py-2 font-medium transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-8 py-10">

        {/* Welcome Card */}
        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-lg">
          <h2 className="text-3xl font-bold">
            Welcome,
            <span className="ml-2 text-emerald-400">
              {user?.username || "Developer"} 👋
            </span>
          </h2>

          <p className="mt-3 text-slate-400">
            Authentication completed successfully. You are now connected to
            DevBattles.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <p className="text-sm text-slate-400">Username</p>

            <h3 className="mt-3 text-xl font-semibold">
              {user?.username}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <p className="text-sm text-slate-400">Email</p>

            <h3 className="mt-3 break-all text-lg font-semibold">
              {user?.email}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <p className="text-sm text-slate-400">Role</p>

            <h3 className="mt-3 text-xl font-semibold capitalize">
              {user?.role}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <p className="text-sm text-slate-400">
              Authentication
            </p>

            <h3 className="mt-3 text-xl font-semibold text-emerald-400">
              Connected ✅
            </h3>
          </div>

        </div>

        {/* Feature Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* AI Agent */}
          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-lg">
            <h2 className="text-2xl font-bold">
              AI Agent
            </h2>

            <p className="mt-3 text-slate-400">
              Test the AI workflow and interact with the coding assistant.
            </p>

            <button
              onClick={() => navigate("/agent")}
              className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Open AI Agent
            </button>
          </div>

          {/* Profile */}
          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-lg">
            <h2 className="text-2xl font-bold">
              My Profile
            </h2>

            <p className="mt-3 text-slate-400">
              View your account information and profile details.
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="mt-6 rounded-xl border border-slate-600 px-6 py-3 transition hover:bg-slate-800"
            >
              View Profile
            </button>
          </div>

        </div>

        {/* Evaluation Status */}
        <div className="mt-10 rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-lg">

          <h2 className="text-2xl font-bold">
            Project Status
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div className="rounded-lg bg-[#0F172A] p-4">
              <p className="font-semibold text-emerald-400">
                ✅ Authentication
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Login, Register, JWT and Protected Routes are working.
              </p>
            </div>

            <div className="rounded-lg bg-[#0F172A] p-4">
              <p className="font-semibold text-yellow-400">
                🚧 AI Workflow
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Frontend is ready. AI backend integration is in progress.
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;