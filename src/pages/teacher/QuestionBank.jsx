import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import toast from "react-hot-toast";
import api from "@/services/api";
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("html");
  const [difficulty, setDifficulty] = useState("easy");
  const [techStack, setTechStack] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("30 mins");
  const [tags, setTags] = useState("");
  const [starterCode, setStarterCode] = useState("<!-- starter code -->");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [publishImmediately, setPublishImmediately] = useState(true);

  const categories = [
    "html",
    "css",
    "javascript",
    "react",
    "tailwind",
    "nextjs",
    "node",
    "express",
    "mongodb",
    "rest_api",
    "authentication",
    "responsive_design",
    "portfolio",
    "landing_page",
    "dashboard",
    "netflix_clone",
    "todo_app",
    "bug_fixing",
    "code_review",
    "figma_to_react"
  ];

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/questions");
      setQuestionsList(res.data.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load question bank.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOpenCreate = () => {
    setCurrentQuestionId(null);
    setTitle("");
    setDescription("");
    setCategory("react");
    setDifficulty("easy");
    setTechStack("React, HTML, CSS");
    setEstimatedTime("30 mins");
    setTags("React, State, Hook");
    setStarterCode("<!-- starter code -->");
    setExpectedOutput("");
    setPublishImmediately(true);
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setCurrentQuestionId(q.id);
    setTitle(q.title);
    setDescription(q.description);
    setCategory(q.category || "react");
    setDifficulty(q.difficulty);
    setTechStack(Array.isArray(q.techStack) ? q.techStack.join(", ") : "");
    setEstimatedTime(q.estimatedTime || "30 mins");
    setTags(Array.isArray(q.tags) ? q.tags.join(", ") : "");
    setStarterCode(q.starterFiles?.["index.html"]?.content || "");
    setExpectedOutput(q.expectedOutput || "");
    setPublishImmediately(q.published);
    setIsEditModalOpen(true);
  };

  const handleSaveQuestion = async (isEdit = false) => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in the title and description.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title,
        description,
        difficulty,
        estimatedTime,
        techStack: techStack.split(",").map(t => t.trim()).filter(Boolean),
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        requirements: ["Must pass basic tests"],
        starterFiles: { "index.html": { content: starterCode } },
        expectedOutput,
        published: publishImmediately
      };

      if (isEdit) {
        await api.put(`/questions/${currentQuestionId}`, payload);
        toast.success("Question updated successfully!");
        setIsEditModalOpen(false);
      } else {
        const createRes = await api.post("/questions", payload);
        const newId = createRes.data.data.id;
        if (publishImmediately) {
          await api.post(`/questions/${newId}/publish`);
        }
        toast.success("Question created successfully!");
        setIsCreateModalOpen(false);
      }

      fetchQuestions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save question.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!confirm("Are you sure you want to delete this question from bank?")) return;
    try {
      await api.delete(`/questions/${id}`);
      toast.success("Question deleted successfully.");
      fetchQuestions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete question.");
    }
  };

  const handleTogglePublish = async (q) => {
    try {
      if (q.published) {
        await api.post(`/questions/${q.id}/unpublish`);
        toast.success("Question unpublished.");
      } else {
        await api.post(`/questions/${q.id}/publish`);
        toast.success("Question published to bank.");
      }
      fetchQuestions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to change visibility status.");
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Question Bank</h1>
          <p className="text-slate-400">
            Manage your questions for homework and contests
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(question)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400 cursor-pointer"
                    >
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

                  <div className="flex flex-wrap gap-2">
                    {(question.tags || []).map((tag) => (
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
                  <button
                    onClick={() => handleTogglePublish(question)}
                    className={`text-xs px-2.5 py-1 rounded font-semibold cursor-pointer ${
                      question.published
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-700/50 text-slate-300 border border-slate-600/30"
                    }`}
                  >
                    {question.published ? "Published" : "Draft"}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Question"
        size="lg"
      >
        {renderModalContent(false)}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Question"
        size="lg"
      >
        {renderModalContent(true)}
      </Modal>
    </div>
  );

  function renderModalContent(isEdit = false) {
    return (
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Question Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
            className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Category</label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.toUpperCase()}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Difficulty</label>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Tech Stack (comma separated)</label>
            <Input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g., React, Node, MongoDB"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Estimated Time</label>
            <Input
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g., 4 hours"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Tags (comma separated)</label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., Responsive, Modern, Portfolio"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Starter Code (index.html)</label>
          <textarea
            value={starterCode}
            onChange={(e) => setStarterCode(e.target.value)}
            placeholder="Enter starter code..."
            className="w-full font-mono rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px] text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Expected Output Keyword</label>
          <Input
            value={expectedOutput}
            onChange={(e) => setExpectedOutput(e.target.value)}
            placeholder="Keyword for testing"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="modalPublish"
            checked={publishImmediately}
            onChange={(e) => setPublishImmediately(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="modalPublish" className="text-sm text-slate-300 cursor-pointer">
            Publish to Question Bank immediately
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            onClick={() => (isEdit ? setIsEditModalOpen(false) : setIsCreateModalOpen(false))}
            variant="outline"
            className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSaveQuestion(isEdit)}
            disabled={isSaving}
            className="bg-emerald-500 text-black hover:bg-emerald-400"
          >
            {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Question"}
          </Button>
        </div>
      </div>
    );
  }
}

export default TeacherQuestionBank;
