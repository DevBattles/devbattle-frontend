import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Clock,
  BookOpen,
  Filter,
  Tag,
} from "lucide-react";

function TeacherQuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      tags: ["Responsive", "Modern", "Portfolio"],
      published: true,
    },
    {
      id: 2,
      title: "Netflix Clone with React",
      description: "Build a Netflix-like streaming interface using React, fetching data from an API.",
      category: "Netflix Clone",
      difficulty: "Hard",
      techStack: ["React", "API", "CSS"],
      estimatedTime: "8 hours",
      tags: ["React", "API", "UI"],
      published: true,
    },
    {
      id: 3,
      title: "Todo App with MERN Stack",
      description: "Create a full-stack todo application using MongoDB, Express, React, and Node.js.",
      category: "MERN",
      difficulty: "Hard",
      techStack: ["MongoDB", "Express", "React", "Node"],
      estimatedTime: "10 hours",
      tags: ["Full Stack", "MERN", "CRUD"],
      published: true,
    },
    {
      id: 4,
      title: "Landing Page with Tailwind CSS",
      description: "Design and build a beautiful landing page using Tailwind CSS and modern design principles.",
      category: "Landing Page",
      difficulty: "Easy",
      techStack: ["HTML", "Tailwind", "JavaScript"],
      estimatedTime: "3 hours",
      tags: ["Tailwind", "Design", "Responsive"],
      published: false,
    },
    {
      id: 5,
      title: "Authentication System",
      description: "Implement a complete authentication system with JWT, login, register, and password reset.",
      category: "Authentication",
      difficulty: "Medium",
      techStack: ["React", "Node", "JWT", "MongoDB"],
      estimatedTime: "6 hours",
      tags: ["Auth", "Security", "JWT"],
      published: true,
    },
    {
      id: 6,
      title: "REST API with Express",
      description: "Build a RESTful API using Express.js with proper routing, middleware, and error handling.",
      category: "REST API",
      difficulty: "Medium",
      techStack: ["Node", "Express", "MongoDB"],
      estimatedTime: "5 hours",
      tags: ["API", "Express", "Backend"],
      published: true,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Question Bank</h1>
          <p className="text-slate-400">
            Manage your questions for homework and contests
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          Create Question
        </Button>
      </div>

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
            className="transition hover:border-emerald-500/50"
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
                <div className="flex gap-2">
                  <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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

                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs text-slate-400"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge variant={question.published ? "success" : "secondary"}>
                  {question.published ? "Published" : "Draft"}
                </Badge>
                <Link
                  to={`/teacher/question-bank/${question.id}`}
                  className="text-sm text-emerald-400 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Question Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Question"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Question Title
            </label>
            <Input placeholder="Enter question title" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              placeholder="Enter question description"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Category
              </label>
              <Select>
                <SelectItem value="">Select category</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Difficulty
              </label>
              <Select>
                <SelectItem value="">Select difficulty</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Tech Stack
              </label>
              <Input placeholder="e.g., React, Node, MongoDB" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Estimated Time
              </label>
              <Input placeholder="e.g., 4 hours" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Tags</label>
            <Input placeholder="e.g., Responsive, Modern, Portfolio" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="publish" className="rounded" />
            <label htmlFor="publish" className="text-sm text-slate-300">
              Publish to Question Bank
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
              Create Question
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherQuestionBank;
