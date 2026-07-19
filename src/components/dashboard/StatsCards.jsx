import { Trophy, Flame, Swords, Star } from "lucide-react";

const stats = [
  {
    title: "XP",
    value: "1250",
    icon: Trophy,
    color: "text-yellow-400",
  },
  {
    title: "Rank",
    value: "#184",
    icon: Star,
    color: "text-cyan-400",
  },
  {
    title: "Battles",
    value: "37",
    icon: Swords,
    color: "text-emerald-400",
  },
  {
    title: "Streak",
    value: "8 Days",
    icon: Flame,
    color: "text-orange-400",
  },
];

function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-700 bg-[#111827] p-6"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h3>
              </div>

              <Icon
                size={34}
                className={item.color}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;