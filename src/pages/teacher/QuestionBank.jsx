import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/services/api";
import { getDefaultStarterFiles } from "@/utils/boilerplate";
import {
  Search,
  Plus,
  Clock,

  Tag,
  Loader2,
  Edit,
  Trash2,
} from "lucide-react";

function TeacherQuestionBank() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form Fields
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("algorithms");
  const [difficulty, setDifficulty] = useState("easy");
  const [techStack, setTechStack] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("30 mins");
  const [tags, setTags] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [workspaceType, setWorkspaceType] = useState("javascript");
  const [starterFiles, setStarterFiles] = useState({});
  const [expectedOutput, setExpectedOutput] = useState("");
  const [publishImmediately, setPublishImmediately] = useState(true);
  
  // Metadata fields
  const [timeLimit, setTimeLimit] = useState("");
  const [memoryLimit, setMemoryLimit] = useState("");
  const [hints, setHints] = useState("");
  const [companies, setCompanies] = useState("");

  const handleProgrammingLanguageChange = (lang) => {
    setProgrammingLanguage(lang);
    setWorkspaceType(lang);
    setStarterFiles(getDefaultStarterFiles(lang));
  };

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

  const { data: questionsData, isLoading: loading } = useQuery({
    queryKey: ["questions", "teacher"],
    queryFn: async () => {
      const res = await api.get("/questions");
      return res.data.data?.data || [];
    }
  });

  const questionsList = questionsData || [];

  const handleOpenCreate = () => {
    setCurrentQuestionId(null);
    setTitle("");
    setDescription("");
    setCategory("algorithms");
    setDifficulty("easy");
    setTechStack("JavaScript, Algorithms");
    setEstimatedTime("30 mins");
    setTags("Arrays, Loops");
    handleProgrammingLanguageChange("javascript");
    setExpectedOutput("");
    setTimeLimit("2000");
    setMemoryLimit("256");
    setHints("");
    setCompanies("");
    setPublishImmediately(true);
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setCurrentQuestionId(q.id);
    setTitle(q.title);
    setDescription(q.description);
    setCategory(q.category || "algorithms");
    setDifficulty(q.difficulty);
    setTechStack(Array.isArray(q.techStack) ? q.techStack.join(", ") : "");
    setEstimatedTime(q.estimatedTime || "30 mins");
    setTags(Array.isArray(q.tags) ? q.tags.join(", ") : "");
    
    const meta = q.metadata || {};
    setProgrammingLanguage(meta.programmingLanguage || q.workspaceType || "javascript");
    setWorkspaceType(q.workspaceType || "javascript");
    setStarterFiles(q.starterFiles || {});
    
    setTimeLimit(meta.timeLimit || "");
    setMemoryLimit(meta.memoryLimit || "");
    setHints(Array.isArray(meta.hints) ? meta.hints.join(", ") : meta.hints || "");
    setCompanies(Array.isArray(meta.companies) ? meta.companies.join(", ") : meta.companies || "");
    
    setExpectedOutput(q.expectedOutput || "");
    setPublishImmediately(q.published);
    setIsEditModalOpen(true);
  };

  const saveQuestionMutation = useMutation({
    mutationFn: async ({ isEdit, payload }) => {
      if (isEdit) {
        await api.put(`/questions/${currentQuestionId}`, payload);
      } else {
        const createRes = await api.post("/questions", payload);
        const newId = createRes.data.data.id;
        if (publishImmediately) {
          await api.post(`/questions/${newId}/publish`);
        }
      }
    },
    onSuccess: (_, { isEdit }) => {
      queryClient.invalidateQueries(["questions", "teacher"]);
      toast.success(isEdit ? "Question updated successfully!" : "Question created successfully!");
      if (isEdit) {
        setIsEditModalOpen(false);
      } else {
        setIsCreateModalOpen(false);
      }
    },
    onError: () => {
      toast.error("Failed to save question.");
    }
  });

  const handleSaveQuestion = (isEdit = false) => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in the title and description.");
      return;
    }

    const payload = {
      title,
      description,
      category,
      workspaceType,
      difficulty,
      estimatedTime,
      techStack: techStack.split(",").map(t => t.trim()).filter(Boolean),
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      requirements: ["Must pass basic tests"],
      starterFiles,
      expectedOutput,
      published: publishImmediately,
      metadata: {
        programmingLanguage,
        timeLimit,
        memoryLimit,
        hints: hints.split(",").map(h => h.trim()).filter(Boolean),
        companies: companies.split(",").map(c => c.trim()).filter(Boolean)
      }
    };

    saveQuestionMutation.mutate({ isEdit, payload });
  };

  const deleteQuestionMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/questions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions", "teacher"]);
      toast.success("Question deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete question.");
    }
  });

  const handleDeleteQuestion = (id) => {
    if (confirm("Are you sure you want to delete this question from bank?")) {
      deleteQuestionMutation.mutate(id);
    }
  };

  const togglePublishMutation = useMutation({
    mutationFn: async (q) => {
      if (q.published) {
        await api.post(`/questions/${q.id}/unpublish`);
        return false;
      } else {
        await api.post(`/questions/${q.id}/publish`);
        return true;
      }
    },
    onSuccess: (isPublished) => {
      queryClient.invalidateQueries(["questions", "teacher"]);
      toast.success(isPublished ? "Question published to bank." : "Question unpublished.");
    },
    onError: () => {
      toast.error("Failed to change visibility status.");
    }
  });

  const handleTogglePublish = (q) => {
    togglePublishMutation.mutate(q);
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
          <div className="col-span-full flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
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
                    disabled={togglePublishMutation.isPending && togglePublishMutation.variables?.id === question.id}
                    className={`text-xs px-2.5 py-1 rounded font-semibold cursor-pointer ${
                      question.published
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-700/50 text-slate-300 border border-slate-600/30"
                    }`}
                  >
                    {togglePublishMutation.isPending && togglePublishMutation.variables?.id === question.id ? <Loader2 className="h-3 w-3 inline animate-spin mr-1" /> : null}
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
          <label className="mb-2 block text-sm text-slate-300">Programming Language (Workspace Type)</label>
          <Select
            value={programmingLanguage}
            onChange={(e) => handleProgrammingLanguageChange(e.target.value)}
          >
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="sql">SQL</SelectItem>
            <SelectItem value="html_css">HTML/CSS</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="mcq">Multiple Choice</SelectItem>
            <SelectItem value="theory">Theory</SelectItem>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Time Limit (ms)</label>
            <Input
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              placeholder="e.g., 2000"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Memory Limit (MB)</label>
            <Input
              value={memoryLimit}
              onChange={(e) => setMemoryLimit(e.target.value)}
              placeholder="e.g., 256"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Hints (comma separated)</label>
            <Input
              value={hints}
              onChange={(e) => setHints(e.target.value)}
              placeholder="e.g., Use a Hash Map"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Companies (comma separated)</label>
            <Input
              value={companies}
              onChange={(e) => setCompanies(e.target.value)}
              placeholder="e.g., Google, Meta"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Starter Files JSON</span>
            <span className="text-xs text-slate-500">(Auto-generated based on language)</span>
          </label>
          <textarea
            value={JSON.stringify(starterFiles, null, 2)}
            onChange={(e) => {
              try {
                setStarterFiles(JSON.parse(e.target.value));
              } catch (err) {
      console.error(err);

                // Ignore parse errors while typing
    }
            }}
            placeholder="{}"
            className="w-full font-mono rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[150px] text-xs"
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
            disabled={saveQuestionMutation.isPending}
            className="bg-emerald-500 text-black hover:bg-emerald-400"
          >
            {saveQuestionMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {saveQuestionMutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Question"}
          </Button>
        </div>
      </div>
    );
  }
}

export default TeacherQuestionBank;
