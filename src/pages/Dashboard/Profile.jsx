import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  Trophy,
  Swords,
  Flame,
  Pencil,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import ProfileLoading from "@/components/dashboard/ProfileLoading";

function Profile() {
  const navigate = useNavigate();
  const { user, getDashboardPath } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <ProfileLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>

            <p className="text-slate-400">
              Manage your DevBattles account
            </p>
          </div>

          <button
            onClick={() => navigate(getDashboardPath())}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>
        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        {/* Profile Card */}

        <div className="rounded-3xl border border-slate-700 bg-[#111827] p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-black">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <h2 className="text-4xl font-bold">
                {user?.username}
              </h2>

              <p className="mt-2 text-slate-400">
                Full Stack Developer
              </p>

              <button className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500 px-5 py-3 text-emerald-400 transition hover:bg-emerald-500 hover:text-black">
                <Pencil size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Account Information */}

        <div className="rounded-3xl border border-slate-700 bg-[#111827] p-8">
          <h2 className="mb-6 text-2xl font-bold">
            Account Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-[#0F172A] p-5">
              <div className="flex items-center gap-3">
                <User className="text-emerald-400" />
                <span className="text-slate-400">Username</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold">
                {user?.username}
              </h3>
            </div>

            <div className="rounded-xl bg-[#0F172A] p-5">
              <div className="flex items-center gap-3">
                <Mail className="text-cyan-400" />
                <span className="text-slate-400">Email</span>
              </div>

              <h3 className="mt-3 break-all text-xl font-semibold">
                {user?.email}
              </h3>
            </div>

            <div className="rounded-xl bg-[#0F172A] p-5">
              <div className="flex items-center gap-3">
                <Shield className="text-yellow-400" />
                <span className="text-slate-400">Role</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold capitalize">
                {user?.role}
              </h3>
            </div>

            <div className="rounded-xl bg-[#0F172A] p-5">
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-400" />
                <span className="text-slate-400">Account Status</span>
              </div>

              <h3 className="mt-3 font-semibold text-emerald-400">
                Verified ✅
              </h3>
            </div>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <Trophy className="mb-4 text-yellow-400" size={34} />

            <h2 className="text-3xl font-bold">
              1250
            </h2>

            <p className="mt-2 text-slate-400">
              Total XP
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <Swords className="mb-4 text-emerald-400" size={34} />

            <h2 className="text-3xl font-bold">
              37
            </h2>

            <p className="mt-2 text-slate-400">
              Battles Completed
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">
            <Flame className="mb-4 text-orange-400" size={34} />

            <h2 className="text-3xl font-bold">
              8 Days
            </h2>

            <p className="mt-2 text-slate-400">
              Current Streak
            </p>
          </div>
        </div>

        {/* Achievements */}

        <div className="rounded-3xl border border-slate-700 bg-[#111827] p-8">
          <h2 className="mb-6 text-2xl font-bold">
            Achievements
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-[#0F172A] p-5 text-center">
              🥇

              <h3 className="mt-3 font-semibold">
                First Victory
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Won your first coding battle.
              </p>
            </div>

            <div className="rounded-xl bg-[#0F172A] p-5 text-center">
              🔥

              <h3 className="mt-3 font-semibold">
                7 Day Streak
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Solved challenges continuously.
              </p>
            </div>

            <div className="rounded-xl bg-[#0F172A] p-5 text-center">
              🚀

              <h3 className="mt-3 font-semibold">
                Rising Developer
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Earned 1000+ XP.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;