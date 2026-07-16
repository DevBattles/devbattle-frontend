import { useNavigate } from "react-router-dom";
import { Trophy, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function WelcomeBanner() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-r from-[#111827] via-[#0F172A] to-[#052e16] p-8">

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        <div>

          <p className="text-sm uppercase tracking-[4px] text-emerald-400">
            Welcome Back
          </p>

          <h1 className="mt-4 text-4xl font-black text-white lg:text-5xl">
            Hi,{" "}
            <span className="text-emerald-400">
              {user?.username || "Developer"}
            </span>
            👋
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Continue solving coding challenges, improve your rank,
            earn XP and prepare for software engineering interviews.
          </p>

          <button
            onClick={() => navigate("/battles")}
            className="mt-8 flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            Continue Battles

            <ArrowRight size={20} />
          </button>

        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-black/20 p-6 backdrop-blur">

          <div className="flex items-center gap-3">

            <Trophy
              size={40}
              className="text-yellow-400"
            />

            <div>

              <p className="text-sm text-slate-400">
                Current Rank
              </p>

              <h2 className="text-4xl font-black text-white">
                #184
              </h2>

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">

              <span className="text-slate-400">
                XP
              </span>

              <span className="font-semibold">
                1250
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Battles Won
              </span>

              <span className="font-semibold">
                37
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Success Rate
              </span>

              <span className="font-semibold text-emerald-400">
                98%
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WelcomeBanner;