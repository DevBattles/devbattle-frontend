import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  Search,
  Trophy,
  Users,
  Clock,
  Play,
  CheckCircle,
  Calendar,
  Award,
  Lock,
} from "lucide-react";

function StudentContests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const contests = [
    {
      id: 1,
      name: "React Challenge 2024",
      description: "Test your React skills with this exciting challenge featuring real-world scenarios",
      startTime: "2024-01-18 10:00",
      endTime: "2024-01-18 14:00",
      duration: "4 hours",
      questions: 5,
      participants: 234,
      status: "Upcoming",
      registered: true,
      myRank: null,
      myScore: null,
    },
    {
      id: 2,
      name: "Full Stack Sprint",
      description: "Build a complete full-stack application in this intensive sprint contest",
      startTime: "2024-01-21 14:00",
      endTime: "2024-01-21 20:00",
      duration: "6 hours",
      questions: 8,
      participants: 156,
      status: "Upcoming",
      registered: false,
      myRank: null,
      myScore: null,
    },
    {
      id: 3,
      name: "JavaScript Mastery",
      description: "Prove your JavaScript expertise with advanced coding challenges",
      startTime: "2024-01-15 09:00",
      endTime: "2024-01-15 13:00",
      duration: "4 hours",
      questions: 6,
      participants: 189,
      status: "Completed",
      registered: true,
      myRank: 15,
      myScore: 85,
    },
    {
      id: 4,
      name: "CSS Art Battle",
      description: "Create stunning visual art using only CSS in this creative contest",
      startTime: "2024-01-25 11:00",
      endTime: "2024-01-25 15:00",
      duration: "4 hours",
      questions: 3,
      participants: 98,
      status: "Upcoming",
      registered: false,
      myRank: null,
      myScore: null,
    },
  ];

  const filteredContests = contests.filter((contest) => {
    const matchesSearch =
      contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || contest.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getTimeRemaining = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const diffTime = start - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffDays > 0) return `${diffDays} days`;
    if (diffHours > 0) return `${diffHours} hours`;
    return "Starting soon";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Contests</h1>
        <p className="text-slate-400">
          Join live coding contests and compete with other students
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Contests</p>
                <p className="mt-2 text-3xl font-bold text-white">{contests.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                <Trophy className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Registered</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {contests.filter((c) => c.registered).length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <CheckCircle className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Best Rank</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  #{contests.filter((c) => c.myRank).sort((a, b) => a.myRank - b.myRank)[0]?.myRank || "-"}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Average Score</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {Math.round(
                    contests
                      .filter((c) => c.myScore)
                      .reduce((acc, c) => acc + c.myScore, 0) /
                      contests.filter((c) => c.myScore).length
                  ) || 0}%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                <Trophy className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search contests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contests List */}
      <div className="space-y-4">
        {filteredContests.map((contest) => (
          <Card
            key={contest.id}
            className={`transition ${
              contest.status === "Active"
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "hover:border-emerald-500/50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {contest.name}
                    </h3>
                    <Badge
                      variant={
                        contest.status === "Upcoming"
                          ? "success"
                          : contest.status === "Active"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {contest.status}
                    </Badge>
                    {contest.registered && (
                      <Badge variant="info">Registered</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    {contest.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      <span>{contest.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>{contest.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-purple-400" />
                      <span>{contest.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-yellow-400" />
                      <span>{contest.participants} participants</span>
                    </div>
                  </div>
                </div>

                {contest.status === "Completed" && contest.myRank ? (
                  <div className="text-right">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                      <p className="text-sm text-emerald-400">Your Rank</p>
                      <p className="text-3xl font-bold text-emerald-400">
                        #{contest.myRank}
                      </p>
                      <p className="text-xs text-slate-400">
                        Score: {contest.myScore}%
                      </p>
                    </div>
                  </div>
                ) : contest.status === "Upcoming" && contest.registered ? (
                  <div className="text-right">
                    <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                      <p className="text-sm text-blue-400">Starting In</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {getTimeRemaining(contest.startTime)}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {contest.status === "Active" ? (
                  <Link
                    to={`/student/contest/${contest.id}/solve`}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
                  >
                    <Play className="h-4 w-4" />
                    Join Contest
                  </Link>
                ) : contest.status === "Upcoming" ? (
                  contest.registered ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>You're registered</span>
                    </div>
                  ) : (
                    <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400">
                      <Trophy className="h-4 w-4" />
                      Register Now
                    </button>
                  )
                ) : (
                  <Link
                    to={`/student/contest/${contest.id}/results`}
                    className="text-sm text-emerald-400 hover:underline"
                  >
                    View Results
                  </Link>
                )}
                <Link
                  to={`/student/contest/${contest.id}/leaderboard`}
                  className="text-sm text-emerald-400 hover:underline"
                >
                  View Leaderboard
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentContests;
