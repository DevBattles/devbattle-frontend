import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  Search,
  Clock,
  BookOpen,
  Play,
  CheckCircle,
  Lock,
} from "lucide-react";

function StudentQuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node",
    "Express",
    "MongoDB",
    "NextJS",
    "Tailwind",
    "REST API",
    "MERN",
    "Authentication",
    "Responsive Design",
    "Portfolio",
    "Landing Page",
    "Dashboard",
    "Netflix Clone",
    "Todo App",
    "Bug Fixing",
    "Code Review",
    "Figma to React",
  ];

  const questions = [
    {
      id: 1,
      title: "Build a Responsive Portfolio Website",
      description: "Create a modern portfolio website with responsive design using HTML, CSS, and JavaScript.",
      category: "Portfolio",
      difficulty: "Medium",
      techStack: ["HTML", "CSS", "JavaScript"],
      estimatedTime: "4 hours",
      completed: true,
      score: 92,
    },
    {
      id: 2,
      title: "Netflix Clone with React",
      description: "Build a Netflix-like streaming interface using React, fetching data from an API.",
      category: "Netflix Clone",
      difficulty: "Hard",
      techStack: ["React", "API", "CSS"],
      estimatedTime: "8 hours",
      completed: false,
      locked: false,
    },
    {
      id: 3,
      title: "Todo App with MERN Stack",
      description: "Create a full-stack todo application using MongoDB, Express, React, and Node.js.",
      category: "MERN",
      difficulty: "Hard",
      techStack: ["MongoDB", "Express", "React", "Node"],
      estimatedTime: "10 hours",
      completed: false,
      locked: false,
    },
    {
      id: 4,
      title: "Landing Page with Tailwind CSS",
      description: "Design and build a beautiful landing page using Tailwind CSS and modern design principles.",
      category: "Landing Page",
      difficulty: "Easy",
      techStack: ["HTML", "Tailwind", "JavaScript"],
      estimatedTime: "3 hours",
      completed: true,
      score: 88,
    },
    {
      id: 5,
      title: "Authentication System",
      description: "Implement a complete authentication system with JWT, login, register, and password reset.",
      category: "Authentication",
      difficulty: "Medium",
      techStack: ["React", "Node", "JWT", "MongoDB"],
      estimatedTime: "6 hours",
      completed: false,
      locked: false,
    },
    {
      id: 6,
      title: "REST API with Express",
      description: "Build a RESTful API using Express.js with proper routing, middleware, and error handling.",
      category: "REST API",
      difficulty: "Medium",
      techStack: ["Node", "Express", "MongoDB"],
      estimatedTime: "5 hours",
      completed: false,
      locked: true,
    },
  ];

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || question.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      question.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Question Bank</h1>
        <p className="text-slate-400">
          Practice and improve your web development skills
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Completed</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {questions.filter((q) => q.completed).length}
              </p>
              <p className="text-xs text-slate-400">out of {questions.length} questions</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Average Score</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">90%</p>
              <p className="text-xs text-slate-400">Across completed questions</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">In Progress</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">2</p>
              <p className="text-xs text-slate-400">Questions currently active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="min-w-[150px]">
              <Select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <Card
            key={question.id}
            className={`transition ${
              question.locked
                ? "opacity-60"
                : "hover:border-emerald-500/50"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge
                  variant={
                    question.difficulty === "Easy"
                      ? "success"
                      : question.difficulty === "Medium"
                      ? "warning"
                      : "destructive"
                  }
                  className="mb-2"
                >
                  {question.difficulty}
                </Badge>
                {question.completed ? (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                ) : question.locked ? (
                  <Lock className="h-5 w-5 text-slate-400" />
                ) : null}
              </div>
              <CardTitle className="text-lg">{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                {question.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>{question.category}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>{question.estimatedTime}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {question.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {question.completed && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-400">Completed</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {question.score}%
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4">
                {question.locked ? (
                  <button
                    disabled
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-400"
                  >
                    <Lock className="mr-2 inline h-4 w-4" />
                    Locked
                  </button>
                ) : question.completed ? (
                  <Link
                    to={`/student/workspace/${question.id}`}
                    className="flex w-full items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                  >
                    Review Solution
                  </Link>
                ) : (
                  <Link
                    to={`/student/workspace/${question.id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Practice
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentQuestionBank;
