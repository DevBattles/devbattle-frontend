import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import {
  Plus,
  Search,
  Trophy,
  Users,
  Clock,
  Play,
  Edit,
  Trash2,
  Calendar,
  Filter,
} from "lucide-react";

function TeacherContests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      createdAt: "2024-01-10",
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
      createdAt: "2024-01-12",
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
      createdAt: "2024-01-05",
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
      createdAt: "2024-01-14",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contests</h1>
          <p className="text-slate-400">
            Create and manage live coding contests for your students
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          Create Contest
        </Button>
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
                <p className="text-sm text-slate-400">Upcoming</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {contests.filter((c) => c.status === "Upcoming").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Participants</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {contests.reduce((acc, c) => acc + c.participants, 0)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {contests.filter((c) => c.status === "Completed").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Trophy className="h-6 w-6 text-yellow-400" />
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
          <Card key={contest.id} className="transition hover:border-emerald-500/50">
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

                <div className="flex gap-2">
                  <Link
                    to={`/teacher/contest/${contest.id}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                {contest.status === "Upcoming" && (
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <Clock className="h-4 w-4" />
                    <span>Starts in 2 days</span>
                  </div>
                )}
                <Link
                  to={`/teacher/contest/${contest.id}/leaderboard`}
                  className="text-sm text-emerald-400 hover:underline"
                >
                  View Leaderboard
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Contest Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Contest"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Contest Name
            </label>
            <Input placeholder="Enter contest name" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              placeholder="Enter contest description"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Start Time
              </label>
              <Input type="datetime-local" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                End Time
              </label>
              <Input type="datetime-local" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Timer Duration
            </label>
            <Select>
              <SelectItem value="1">1 hour</SelectItem>
              <SelectItem value="2">2 hours</SelectItem>
              <SelectItem value="4">4 hours</SelectItem>
              <SelectItem value="6">6 hours</SelectItem>
              <SelectItem value="8">8 hours</SelectItem>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select Questions
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto rounded-xl border border-slate-700 bg-[#0F172A] p-4">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" className="rounded" />
                <span>React Portfolio</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" className="rounded" />
                <span>E-commerce API</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" className="rounded" />
                <span>Netflix Clone</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" className="rounded" />
                <span>Todo App with MERN</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Instructions
            </label>
            <textarea
              placeholder="Enter contest instructions for participants"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="publish" className="rounded" />
            <label htmlFor="publish" className="text-sm text-slate-300">
              Publish contest immediately
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => setIsCreateModalOpen(false)}
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
              Create Contest
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherContests;
