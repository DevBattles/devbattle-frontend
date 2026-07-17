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
  const [loading, setLoading] = useState(true);

  // Loaded database lists
  const [contestsList, setContestsList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [batchesList, setBatchesList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Contest Form fields
  const [contestName, setContestName] = useState("");
  const [contestDescription, setContestDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [contestBatch, setContestBatch] = useState("");
  const [publishImmediately, setPublishImmediately] = useState(true);

  // Selected questions mapping: { [questionId]: { points: 100, order: 1 } }
  const [selectedQuestions, setSelectedQuestions] = useState({});

  // Inline custom question toggles and fields
  const [isCreatingCustomQuestion, setIsCreatingCustomQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("easy");
  const [questionTech, setQuestionTech] = useState("HTML");
  const [questionTags, setQuestionTags] = useState("");
  const [questionRequirements, setQuestionRequirements] = useState("");
  const [questionStarterCode, setQuestionStarterCode] = useState("<!-- Starter HTML Code -->");
  const [questionExpectedOutput, setQuestionExpectedOutput] = useState("");

  const fetchContestsAndQuestions = async () => {
    try {
      setLoading(true);
      const [contestsRes, qRes, batchesRes] = await Promise.all([
        api.get("/contests"),
        api.get("/questions"),
        api.get("/batches")
      ]);
      setContestsList(contestsRes.data.data?.data || contestsRes.data.data || []);
      setQuestionsList(qRes.data.data?.data || []);
      setBatchesList(batchesRes.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contests, question bank or batches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContestsAndQuestions();
  }, []);

  const handleToggleQuestionSelection = (questionId) => {
    setSelectedQuestions((prev) => {
      const next = { ...prev };
      if (next[questionId]) {
        delete next[questionId];
      } else {
        const order = Object.keys(next).length + 1;
        next[questionId] = { points: 100, order };
      }
      return next;
    });
  };

  const handleUpdateQuestionMeta = (questionId, field, val) => {
    setSelectedQuestions((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: parseInt(val) || 0
      }
    }));
  };

  const handleAddCustomQuestionInline = async () => {
    if (!questionTitle.trim() || !questionDescription.trim()) {
      toast.error("Please fill in the custom question details.");
      return;
    }

    try {
      setIsSaving(true);
      const questionPayload = {
        title: questionTitle,
        description: questionDescription,
        difficulty: questionDifficulty,
        estimatedTime: "30 mins",
        techStack: [questionTech],
        tags: questionTags.split(",").map(t => t.trim()).filter(Boolean),
        requirements: questionRequirements.split("\n").map(r => r.trim()).filter(Boolean),
        starterFiles: { "index.html": { content: questionStarterCode } },
        expectedOutput: questionExpectedOutput,
        published: true
      };

      const qRes = await api.post("/questions", questionPayload);
      const newQuestion = qRes.data.data;
      
      // Auto-publish it
      await api.post(`/questions/${newQuestion.id}/publish`);

      toast.success("Question created and published to bank!");
      
      // Select it immediately
      setSelectedQuestions((prev) => {
        const order = Object.keys(prev).length + 1;
        return {
          ...prev,
          [newQuestion.id]: { points: 100, order }
        };
      });

      // Clear question form
      setQuestionTitle("");
      setQuestionDescription("");
      setQuestionStarterCode("<!-- Starter HTML Code -->");
      setQuestionExpectedOutput("");
      setIsCreatingCustomQuestion(false);

      // Refetch questions list
      const qListRes = await api.get("/questions");
      setQuestionsList(qListRes.data.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create inline question.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateContest = async () => {
    if (!contestName.trim() || !startTime || !endTime) {
      toast.error("Please fill in the contest name, start time, and end time.");
      return;
    }

    const questionIds = Object.keys(selectedQuestions);
    if (questionIds.length === 0) {
      toast.error("Please select or create at least one question for the contest.");
      return;
    }

    setIsSaving(true);
    try {
      const questionsPayload = questionIds.map((qId) => ({
        questionId: qId,
        order: selectedQuestions[qId].order,
        points: selectedQuestions[qId].points
      }));

      const contestPayload = {
        title: contestName,
        description: contestDescription,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        published: publishImmediately,
        questions: questionsPayload,
        batch: contestBatch || null
      };

      await api.post("/contests", contestPayload);
      toast.success("Contest created successfully!");
      setIsCreateModalOpen(false);

      // Reset fields
      setContestName("");
      setContestDescription("");
      setStartTime("");
      setEndTime("");
      setContestBatch("");
      setSelectedQuestions({});

      fetchContestsAndQuestions();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create contest.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteContest = async (id) => {
    if (!confirm("Are you sure you want to delete this contest?")) return;
    try {
      await api.delete(`/contests/${id}`);
      toast.success("Contest deleted successfully.");
      fetchContestsAndQuestions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contest.");
    }
  };

  const filteredContests = contestsList.filter((contest) => {
    const name = contest.title || contest.name || "";
    const desc = contest.description || "";
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
                <p className="mt-2 text-3xl font-bold text-white">{contestsList.length}</p>
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
                <p className="text-sm text-slate-400">Published Contests</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {contestsList.filter((c) => c.published).length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <Clock className="h-6 w-6 text-blue-400" />
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
          </div>
        </CardContent>
      </Card>

      {/* Contests List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-400">Loading contests...</p>
        ) : filteredContests.length === 0 ? (
          <p className="text-slate-500">No contests found.</p>
        ) : (
          filteredContests.map((contest) => (
            <Card key={contest.id} className="transition hover:border-emerald-500/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {contest.title || contest.name}
                      </h3>
                      <Badge variant={contest.published ? "success" : "secondary"}>
                        {contest.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{contest.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-400" />
                        <span>Start: {new Date(contest.startTime).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span>End: {new Date(contest.endTime).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteContest(contest.id)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Contest Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Contest"
        size="lg"
      >
        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Contest Name</label>
            <Input
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              placeholder="Enter contest name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Description</label>
            <textarea
              value={contestDescription}
              onChange={(e) => setContestDescription(e.target.value)}
              placeholder="Enter contest description"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Start Time</label>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">End Time</label>
              <Input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Assign to Batch (Optional)</label>
            <Select
              value={contestBatch}
              onChange={(e) => setContestBatch(e.target.value)}
            >
              <SelectItem value="">All Batches (Public)</SelectItem>
              {batchesList.map((batch) => (
                <SelectItem key={batch.id} value={batch.name}>
                  {batch.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <hr className="border-slate-700" />

          {/* Question Selector List */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-slate-300 font-semibold">Select Questions for Contest</label>
              <Button
                onClick={() => setIsCreatingCustomQuestion(!isCreatingCustomQuestion)}
                className="bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs px-3 py-1.5 hover:bg-blue-600/50"
              >
                {isCreatingCustomQuestion ? "Cancel custom question" : "Create custom question inline"}
              </Button>
            </div>

            {isCreatingCustomQuestion ? (
              <div className="space-y-4 border border-slate-700/50 bg-slate-800/30 p-4 rounded-xl mb-4">
                <h3 className="text-sm font-semibold text-white">Custom Question Details</h3>
                
                <div>
                  <label className="mb-2 block text-xs text-slate-300">Question Title</label>
                  <Input
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    placeholder="e.g. Find Max Subarray Sum"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-300">Question Description</label>
                  <textarea
                    value={questionDescription}
                    onChange={(e) => setQuestionDescription(e.target.value)}
                    placeholder="Detail the instructions..."
                    className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[80px] text-sm"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs text-slate-300">Difficulty</label>
                    <Select
                      value={questionDifficulty}
                      onChange={(e) => setQuestionDifficulty(e.target.value)}
                    >
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-slate-300">Technology</label>
                    <Select
                      value={questionTech}
                      onChange={(e) => setQuestionTech(e.target.value)}
                    >
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="CSS">CSS</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="React">React</SelectItem>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-300">Starter Code (index.html)</label>
                  <textarea
                    value={questionStarterCode}
                    onChange={(e) => setQuestionStarterCode(e.target.value)}
                    placeholder="Enter boilerplate code..."
                    className="w-full font-mono rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[80px] text-sm"
                  />
                </div>

                <Button
                  onClick={handleAddCustomQuestionInline}
                  disabled={isSaving}
                  className="bg-blue-500 text-black hover:bg-blue-400 text-xs px-4 py-2"
                >
                  Save Question & Add to Selection
                </Button>
              </div>
            ) : null}

            <div className="space-y-2 max-h-48 overflow-y-auto rounded-xl border border-slate-700 bg-[#0F172A] p-4">
              {questionsList.length === 0 ? (
                <p className="text-xs text-slate-500">No questions available in bank.</p>
              ) : (
                questionsList.map((q) => {
                  const isChecked = !!selectedQuestions[q.id];
                  return (
                    <div key={q.id} className="flex flex-col gap-2 p-2 border-b border-slate-800 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleQuestionSelection(q.id)}
                            className="rounded"
                          />
                          <span>{q.title} ({q.difficulty})</span>
                        </label>
                      </div>
                      
                      {isChecked && (
                        <div className="grid gap-2 sm:grid-cols-2 pl-6 mt-1">
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-slate-400">Points:</label>
                            <input
                              type="number"
                              value={selectedQuestions[q.id].points}
                              onChange={(e) => handleUpdateQuestionMeta(q.id, "points", e.target.value)}
                              className="w-16 rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-white"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-slate-400">Order:</label>
                            <input
                              type="number"
                              value={selectedQuestions[q.id].order}
                              onChange={(e) => handleUpdateQuestionMeta(q.id, "order", e.target.value)}
                              className="w-16 rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publishContest"
              checked={publishImmediately}
              onChange={(e) => setPublishImmediately(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="publishContest" className="text-sm text-slate-300 cursor-pointer">
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
            <Button
              onClick={handleCreateContest}
              disabled={isSaving}
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              {isSaving ? "Saving..." : "Create Contest"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherContests;
