import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  Trophy,
  Medal,
  TrendingUp,
  Search,
  Award,
  Star,
  Crown,
} from "lucide-react";

function StudentLeaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("global");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");

  const leaderboardData = [
    {
      rank: 1,
      name: "Alice Johnson",
      xp: 3450,
      submissions: 28,
      contestsWon: 5,
      streak: 12,
      avatar: "AJ",
      batch: "Batch A",
    },
    {
      rank: 2,
      name: "Bob Smith",
      xp: 3120,
      submissions: 25,
      contestsWon: 4,
      streak: 8,
      avatar: "BS",
      batch: "Batch B",
    },
    {
      rank: 3,
      name: "Charlie Brown",
      xp: 2890,
      submissions: 23,
      contestsWon: 3,
      streak: 5,
      avatar: "CB",
      batch: "Batch A",
    },
    {
      rank: 4,
      name: "Diana Ross",
      xp: 2750,
      submissions: 22,
      contestsWon: 3,
      streak: 15,
      avatar: "DR",
      batch: "Batch C",
    },
    {
      rank: 5,
      name: "Edward King",
      xp: 2680,
      submissions: 21,
      contestsWon: 2,
      streak: 3,
      avatar: "EK",
      batch: "Batch B",
    },
    {
      rank: 6,
      name: "Fiona Green",
      xp: 2540,
      submissions: 20,
      contestsWon: 2,
      streak: 7,
      avatar: "FG",
      batch: "Batch A",
    },
    {
      rank: 7,
      name: "George White",
      xp: 2410,
      submissions: 19,
      contestsWon: 2,
      streak: 4,
      avatar: "GW",
      batch: "Batch C",
    },
    {
      rank: 8,
      name: "Hannah Black",
      xp: 2350,
      submissions: 18,
      contestsWon: 1,
      streak: 6,
      avatar: "HB",
      batch: "Batch B",
    },
    {
      rank: 9,
      name: "Ian Scott",
      xp: 2280,
      submissions: 17,
      contestsWon: 1,
      streak: 2,
      avatar: "IS",
      batch: "Batch A",
    },
    {
      rank: 10,
      name: "Jane Miller",
      xp: 2150,
      submissions: 16,
      contestsWon: 1,
      streak: 9,
      avatar: "JM",
      batch: "Batch C",
    },
    {
      rank: 12,
      name: "You",
      xp: 1890,
      submissions: 14,
      contestsWon: 0,
      streak: 3,
      avatar: "ME",
      batch: "Batch A",
      isCurrentUser: true,
    },
  ];

  const filteredLeaderboard = leaderboardData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "global" ||
      (selectedFilter === "batch" && student.batch === "Batch A");
    return matchesSearch && matchesFilter;
  });

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-300" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-slate-400">#{rank}</span>;
  };

  const getRankBadge = (rank) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
    if (rank === 2)
      return "bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-400/50";
    if (rank === 3)
      return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50";
    return "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-slate-400">
          See how you rank among other developers
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid gap-6 sm:grid-cols-3">
        {leaderboardData.slice(0, 3).map((student, index) => (
          <Card
            key={student.rank}
            className={`relative overflow-hidden ${
              index === 0
                ? "border-yellow-500/50 bg-gradient-to-b from-yellow-500/10 to-transparent"
                : index === 1
                ? "border-slate-400/50 bg-gradient-to-b from-slate-400/10 to-transparent"
                : "border-amber-600/50 bg-gradient-to-b from-amber-600/10 to-transparent"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                {getRankIcon(student.rank)}
              </div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-2xl font-bold text-emerald-400 mx-auto">
                {student.avatar}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {student.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4">{student.batch}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span>{student.xp} XP</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                  <Award className="h-4 w-4 text-purple-400" />
                  <span>{student.contestsWon} wins</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                  <Star className="h-4 w-4 text-emerald-400" />
                  <span>{student.streak} day streak</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <Select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <SelectItem value="global">Global Leaderboard</SelectItem>
                <SelectItem value="batch">Batch Leaderboard</SelectItem>
                <SelectItem value="contest">Contest Leaderboard</SelectItem>
                <SelectItem value="homework">Homework Leaderboard</SelectItem>
              </Select>
            </div>
            <div className="min-w-[150px]">
              <Select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLeaderboard.map((student) => (
              <div
                key={student.rank}
                className={`flex items-center justify-between rounded-xl border p-4 transition ${
                  student.isCurrentUser
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : getRankBadge(student.rank) ||
                      "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400">
                    {student.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">
                        {student.name}
                      </h4>
                      {student.isCurrentUser && (
                        <Badge variant="success" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{student.batch}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-400">
                      {student.xp}
                    </p>
                    <p className="text-xs text-slate-400">XP</p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className="text-lg font-bold text-blue-400">
                      {student.submissions}
                    </p>
                    <p className="text-xs text-slate-400">Submissions</p>
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="text-lg font-bold text-yellow-400">
                      {student.contestsWon}
                    </p>
                    <p className="text-xs text-slate-400">Wins</p>
                  </div>
                  <div className="text-center hidden lg:block">
                    <p className="text-lg font-bold text-purple-400">
                      {student.streak}
                    </p>
                    <p className="text-xs text-slate-400">Streak</p>
                  </div>
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(student.rank)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Current Rank</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">#12</p>
              <p className="mt-1 text-xs text-emerald-400">↑ 3 from last week</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Total XP</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">1,890</p>
              <p className="mt-1 text-xs text-blue-400">+250 this week</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Completion Rate</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">87%</p>
              <p className="mt-1 text-xs text-yellow-400">Above average</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Current Streak</p>
              <p className="mt-2 text-2xl font-bold text-purple-400">3 days</p>
              <p className="mt-1 text-xs text-purple-400">Keep it up!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentLeaderboard;
