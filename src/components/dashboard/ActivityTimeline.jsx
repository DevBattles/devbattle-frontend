import { CheckCircle2 } from "lucide-react";

const activities = [
  {
    title: "Logged into DevBattles",
    time: "5 min ago",
  },
  {
    title: "Solved Two Sum",
    time: "25 min ago",
  },
  {
    title: "Earned 50 XP",
    time: "1 hour ago",
  },
  {
    title: "Completed React Quiz",
    time: "Yesterday",
  },
];

function ActivityTimeline() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <h2 className="text-2xl font-bold">
        Recent Activity
      </h2>

      <div className="mt-8 space-y-6">

        {activities.map((activity) => (

          <div
            key={activity.title}
            className="flex gap-4"
          >

            <CheckCircle2
              className="mt-1 text-emerald-400"
              size={20}
            />

            <div>

              <h3 className="font-medium">
                {activity.title}
              </h3>

              <p className="text-sm text-slate-400">
                {activity.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ActivityTimeline;