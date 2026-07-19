import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
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
  Loader2,
} from "lucide-react";

function StudentLeaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("global");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");

  const { data: leaderboardData, isLoading: loading } = useQuery({
    queryKey: ["leaderboard", selectedFilter],
    queryFn: async () => {
      const res = await api.get(`/leaderboards?type=${selectedFilter}`);
      return res.data;
    }
  });

  const rawLeaderboard = leaderboardData?.data || [];
  
  const mappedLeaderboard = rawLeaderboard.map((item) => ({
    rank: item.rank,
    name: item.user?.username || "Unknown",
    xp: item.score || 0,
    submissions: 0,
    contestsWon: 0,
    streak: 0,
    avatar: (item.user?.username || "U").substring(0, 2).toUpperCase(),
    batch: "Global",
    isCurrentUser: false, // This could be checked against AuthContext if needed
  }));

  const filteredLeaderboard = mappedLeaderboard.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
        {loading ? (
          <div className="col-span-full flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        ) : filteredLeaderboard.slice(0, 3).map((student, index) => (
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
            {loading ? (
               <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-emerald-500" /></div>
            ) : filteredLeaderboard.length === 0 ? (
               <div className="text-center p-8 text-slate-500">No students found</div>
            ) : (
              filteredLeaderboard.map((student) => (
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
              ))
            )}
          </div>
        </CardContent>
      </Card>


    </div>
  );
}

export default StudentLeaderboard;
