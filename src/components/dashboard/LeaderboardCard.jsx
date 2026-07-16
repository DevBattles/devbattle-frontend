import { Trophy } from "lucide-react";

const leaders = [
  {
    rank: 1,
    name: "Alex",
    xp: 3240,
  },
  {
    rank: 2,
    name: "Sophia",
    xp: 3015,
  },
  {
    rank: 3,
    name: "Rahul",
    xp: 2890,
  },
  {
    rank: 4,
    name: "Vinay",
    xp: 1250,
  },
];

function LeaderboardCard() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <div className="flex items-center gap-3">

        <Trophy className="text-yellow-400" />

        <h2 className="text-2xl font-bold">
          Leaderboard
        </h2>

      </div>

      <div className="mt-8 space-y-4">

        {leaders.map((user) => (

          <div
            key={user.rank}
            className="flex items-center justify-between rounded-xl bg-[#0F172A] p-4"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-black">

                {user.rank}

              </div>

              <span>{user.name}</span>

            </div>

            <span className="font-semibold">
              {user.xp} XP
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LeaderboardCard;