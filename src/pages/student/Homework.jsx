import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  Search,
  Calendar,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
  FileText,
  Award,
} from "lucide-react";

function StudentHomework() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const homework = [
    {
      id: 1,
      title: "React Portfolio",
      description: "Build a professional portfolio website using React with modern design principles",
      dueDate: "2024-01-20",
      difficulty: "Medium",
      teacher: "Dr. Sarah Wilson",
      status: "Pending",
      submittedAt: null,
      score: null,
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "E-commerce API",
      description: "Create a RESTful API for an e-commerce platform using Node.js and Express",
      dueDate: "2024-01-22",
      difficulty: "Hard",
      teacher: "Prof. John Davis",
      status: "Pending",
      submittedAt: null,
      score: null,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      title: "Netflix Clone",
      description: "Build a Netflix-like streaming interface with React and API integration",
      dueDate: "2024-01-15",
      difficulty: "Hard",
      teacher: "Dr. Emily Brown",
      status: "Completed",
      submittedAt: "2024-01-14",
      score: 92,
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      title: "Responsive Landing Page",
      description: "Design and build a beautiful landing page with responsive design",
      dueDate: "2024-01-25",
      difficulty: "Easy",
      teacher: "Dr. Sarah Wilson",
      status: "Pending",
      submittedAt: null,
      score: null,
      createdAt: "2024-01-14",
    },
    {
      id: 5,
      title: "Todo App with MERN",
      description: "Create a full-stack todo application using MongoDB, Express, React, and Node.js",
      dueDate: "2024-01-18",
      difficulty: "Medium",
      teacher: "Prof. John Davis",
      status: "Overdue",
      submittedAt: null,
      score: null,
      createdAt: "2024-01-08",
    },
  ];

  const filteredHomework = homework.filter((hw) => {
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || hw.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getDaysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Homework</h1>
        <p className="text-slate-400">
          View and submit your homework assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Homework</p>
                <p className="mt-2 text-3xl font-bold text-white">{homework.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                <FileText className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homework.filter((hw) => hw.status === "Pending").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Clock className="h-6 w-6 text-yellow-400" />
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
                  {homework.filter((hw) => hw.status === "Completed").length}
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
                <p className="text-sm text-slate-400">Average Score</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {Math.round(
                    homework
                      .filter((hw) => hw.score)
                      .reduce((acc, hw) => acc + hw.score, 0) /
                      homework.filter((hw) => hw.score).length
                  ) || 0}
                  %
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                <Award className="h-6 w-6 text-purple-400" />
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
                  placeholder="Search homework..."
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.map((hw) => {
          const daysRemaining = getDaysRemaining(hw.dueDate);
          return (
            <Card
              key={hw.id}
              className={`transition ${
                hw.status === "Overdue"
                  ? "border-red-500/30"
                  : "hover:border-emerald-500/50"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {hw.title}
                      </h3>
                      <Badge
                        variant={
                          hw.difficulty === "Easy"
                            ? "success"
                            : hw.difficulty === "Medium"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {hw.difficulty}
                      </Badge>
                      <Badge
                        variant={
                          hw.status === "Completed"
                            ? "success"
                            : hw.status === "Overdue"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {hw.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                      {hw.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-400" />
                        <span>Due: {hw.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span>{hw.teacher}</span>
                      </div>
                      {hw.status === "Pending" && (
                        <div
                          className={`flex items-center gap-2 ${
                            daysRemaining <= 2 ? "text-red-400" : "text-yellow-400"
                          }`}
                        >
                          <Clock className="h-4 w-4" />
                          <span>
                            {daysRemaining > 0
                              ? `${daysRemaining} days remaining`
                              : "Due today"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {hw.status === "Completed" ? (
                    <div className="text-right">
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                        <p className="text-sm text-emerald-400">Score</p>
                        <p className="text-3xl font-bold text-emerald-400">
                          {hw.score}%
                        </p>
                      </div>
                      <Link
                        to={`/student/homework/${hw.id}/feedback`}
                        className="mt-2 block text-sm text-emerald-400 hover:underline"
                      >
                        View AI Feedback
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={`/student/workspace/${hw.id}`}
                      className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
                    >
                      <Play className="h-4 w-4" />
                      {hw.status === "Overdue" ? "Submit Now" : "Start Homework"}
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default StudentHomework;
