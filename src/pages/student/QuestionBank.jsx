import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import toast from "react-hot-toast";
import api from "@/services/api";
import {
  Search,
  Clock,
  Play,
} from "lucide-react";

function StudentQuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const { data: questionsList = [], isLoading: loading } = useQuery({
    queryKey: ["studentQuestions"],
    queryFn: async () => {
      const res = await api.get("/questions");
      return (res.data.data?.data || []).filter(q => q.published);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to load question bank.");
    }
  });

  const filteredQuestions = questionsList.filter((question) => {
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
          Practice coding questions and improve your skills with AI evaluation
        </p>
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
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="javascript">JAVASCRIPT</SelectItem>
                <SelectItem value="react">REACT</SelectItem>
                <SelectItem value="tailwind">TAILWIND</SelectItem>
                <SelectItem value="nextjs">NEXTJS</SelectItem>
                <SelectItem value="node">NODE</SelectItem>
                <SelectItem value="express">EXPRESS</SelectItem>
                <SelectItem value="mongodb">MONGODB</SelectItem>
                <SelectItem value="rest_api">REST_API</SelectItem>
                <SelectItem value="authentication">AUTHENTICATION</SelectItem>
                <SelectItem value="responsive_design">RESPONSIVE_DESIGN</SelectItem>
                <SelectItem value="portfolio">PORTFOLIO</SelectItem>
                <SelectItem value="landing_page">LANDING_PAGE</SelectItem>
                <SelectItem value="dashboard">DASHBOARD</SelectItem>
                <SelectItem value="netflix_clone">NETFLIX_CLONE</SelectItem>
                <SelectItem value="todo_app">TODO_APP</SelectItem>
                <SelectItem value="bug_fixing">BUG_FIXING</SelectItem>
                <SelectItem value="code_review">CODE_REVIEW</SelectItem>
                <SelectItem value="figma_to_react">FIGMA_TO_REACT</SelectItem>
              </Select>
            </div>
            <div className="min-w-[150px]">
              <Select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-slate-400">Loading questions...</p>
        ) : filteredQuestions.length === 0 ? (
          <p className="text-slate-500 col-span-full">No questions found.</p>
        ) : (
          filteredQuestions.map((question) => (
            <Card
              key={question.id}
              className="transition hover:border-emerald-500/50"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge
                    variant={
                      question.difficulty === "easy"
                        ? "success"
                        : question.difficulty === "medium"
                        ? "warning"
                        : "destructive"
                    }
                    className="mb-2"
                  >
                    {question.difficulty.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                  {question.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span>{question.estimatedTime || "30 mins"}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(question.techStack || []).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to={`/student/workspace/${question.id}`}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    <Play className="h-4 w-4" />
                    Start Practice
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentQuestionBank;
