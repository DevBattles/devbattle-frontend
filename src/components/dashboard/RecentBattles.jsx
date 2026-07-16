import { CheckCircle2, Clock3 } from "lucide-react";

const battles = [
  {
    title: "Two Sum",
    status: "Solved",
  },
  {
    title: "Portfolio Landing Page",
    status: "Pending",
  },
  {
    title: "React Hooks Quiz",
    status: "Solved",
  },
  {
    title: "JWT Authentication",
    status: "Solved",
  },
];

function RecentBattles() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <h2 className="text-2xl font-bold">
        Recent Battles
      </h2>

      <div className="mt-6 space-y-4">

        {battles.map((battle) => (

          <div
            key={battle.title}
            className="flex items-center justify-between rounded-xl bg-[#0F172A] p-4"
          >

            <span>{battle.title}</span>

            {battle.status === "Solved" ? (
              <div className="flex items-center gap-2 text-emerald-400">

                <CheckCircle2 size={18} />

                Solved

              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-400">

                <Clock3 size={18} />

                Pending

              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentBattles;