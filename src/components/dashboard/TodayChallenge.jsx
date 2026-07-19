import { PlayCircle, Clock, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TodayChallenge() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm uppercase tracking-wider text-emerald-400">
            Today's Challenge
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Binary Search Master
          </h2>

          <p className="mt-3 max-w-xl text-slate-400">
            Solve today's coding challenge and earn bonus XP.
          </p>
        </div>

        <PlayCircle
          size={54}
          className="text-emerald-400"
        />

      </div>

      <div className="mt-8 flex flex-wrap gap-6">

        <div className="flex items-center gap-2 rounded-lg bg-[#0F172A] px-4 py-3">

          <Clock
            size={18}
            className="text-emerald-400"
          />

          <span>30 Minutes</span>

        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#0F172A] px-4 py-3">

          <Trophy
            size={18}
            className="text-yellow-400"
          />

          <span>200 XP Reward</span>

        </div>

        <div className="rounded-lg bg-[#0F172A] px-4 py-3">
          Easy
        </div>

      </div>

      <button
        onClick={() => navigate("/editor")}
        className="mt-8 rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-black hover:bg-emerald-400"
      >
        Start Challenge
      </button>

    </div>
  );
}

export default TodayChallenge;