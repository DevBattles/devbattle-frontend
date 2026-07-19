import { Crown, TrendingUp } from "lucide-react";
import Section from "@/components/layout/Section";

const leaders = [
  {
    rank: 1,
    name: "Alex Johnson",
    xp: "24,850 XP",
    badge: "Grandmaster",
  },
  {
    rank: 2,
    name: "Sophia Lee",
    xp: "22,300 XP",
    badge: "Master",
  },
  {
    rank: 3,
    name: "Rahul Sharma",
    xp: "20,120 XP",
    badge: "Diamond",
  },
  {
    rank: 4,
    name: "Emma Wilson",
    xp: "18,600 XP",
    badge: "Platinum",
  },
  {
    rank: 5,
    name: "Vinay",
    xp: "17,950 XP",
    badge: "Gold",
  },
];

function LeaderboardPreview() {
  return (
    <Section className="bg-[#050816] py-32">

      <div className="mx-auto max-w-3xl text-center">

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          LEADERBOARD
        </span>

        <h2 className="mt-6 text-5xl font-bold text-white">
          Compete With The
          <span className="text-emerald-400"> Best Developers</span>
        </h2>

        <p className="mt-6 text-lg text-slate-400">
          Climb the rankings, earn XP and become one of the top developers on
          DevBattles.
        </p>

      </div>

      <div className="mx-auto mt-20 max-w-5xl rounded-3xl border border-slate-800 bg-[#0f172a] overflow-hidden">

        <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

          <div className="flex items-center gap-3">

            <Crown className="text-yellow-400" />

            <h3 className="text-xl font-semibold text-white">
              Weekly Rankings
            </h3>

          </div>

          <div className="flex items-center gap-2 text-emerald-400">

            <TrendingUp size={18} />

            Live Updates

          </div>

        </div>

        {leaders.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between border-b border-slate-800 px-8 py-6 transition hover:bg-slate-800/40"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-400">
                #{user.rank}
              </div>

              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"></div>

              <div>

                <h4 className="font-semibold text-white">
                  {user.name}
                </h4>

                <p className="text-sm text-slate-400">
                  {user.badge}
                </p>

              </div>

            </div>

            <div className="font-semibold text-emerald-400">
              {user.xp}
            </div>

          </div>
        ))}

      </div>

    </Section>
  );
}

export default LeaderboardPreview;