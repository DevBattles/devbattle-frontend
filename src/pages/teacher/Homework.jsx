import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import toast from "react-hot-toast";
import api from "@/services/api";
import { getDefaultStarterFiles } from "@/utils/boilerplate";
import {
  Plus,
  Search,
  Calendar,
  Users,
  FileText,
  Trash2,
  Clock,
} from "lucide-react";

function TeacherHomework() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Homework creation fields
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedBatch, setAssignedBatch] = useState("");
  
  // Question source: "existing" | "new"
  const [questionSource, setQuestionSource] = useState("existing");
  
  // Existing question selection
  const [selectedQuestionId, setSelectedQuestionId] = useState("");

  // Custom question fields
  const [questionDifficulty, setQuestionDifficulty] = useState("easy");
  const [questionTech, setQuestionTech] = useState("algorithms");
  const [questionTags, setQuestionTags] = useState("");
  const [questionRequirements, setQuestionRequirements] = useState("");
  const [questionExpectedOutput, setQuestionExpectedOutput] = useState("");
  const [addToQuestionBank, setAddToQuestionBank] = useState(true);

  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [workspaceType, setWorkspaceType] = useState("javascript");
  const [starterFiles, setStarterFiles] = useState({});
  const [timeLimit, setTimeLimit] = useState("2000");
  const [memoryLimit, setMemoryLimit] = useState("256");

  const handleProgrammingLanguageChange = (lang) => {
    setProgrammingLanguage(lang);
    setWorkspaceType(lang);
    setStarterFiles(getDefaultStarterFiles(lang));
  };

  const queryClient = useQueryClient();

  const { data: homeworkData = {}, isLoading: loading } = useQuery({
    queryKey: ["teacherHomeworkData"],
    queryFn: async () => {
      const [hwRes, qRes, batchesRes] = await Promise.all([
        api.get("/homework"),
        api.get("/questions"),
        api.get("/batches")
      ]);
      return {
        homeworkList: hwRes.data.data?.data || hwRes.data.data || [],
        questionsList: qRes.data.data?.data || [],
        batchesList: batchesRes.data.data || []
      };
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to load homework, questions or student batches.");
    }
  });

  const { homeworkList = [], questionsList = [], batchesList = [] } = homeworkData;

  const handleCreateHomework = async () => {
    if (!dueDate) {
      toast.error("Please fill in the due date.");
      return;
    }

    setIsSaving(true);
    try {
      let finalQuestionId = selectedQuestionId;
      let finalTitle = "";
      let finalDescription = "";

      if (questionSource === "existing") {
        const selectedQ = questionsList.find((q) => q.id === selectedQuestionId);
        if (!selectedQ) {
          toast.error("Please select a question.");
          setIsSaving(false);
          return;
        }
        finalQuestionId = selectedQ.id;
        finalTitle = selectedQ.title;
        finalDescription = selectedQ.description || "";
      } else {
        if (!homeworkTitle.trim()) {
          toast.error("Please fill in the question title.");
          setIsSaving(false);
          return;
        }
        finalTitle = homeworkTitle;
        finalDescription = homeworkDescription;
        const questionPayload = {
          title: finalTitle,
          description: finalDescription,
          category: questionTech,
          workspaceType: workspaceType,
          difficulty: questionDifficulty,
          estimatedTime: "30 mins",
          techStack: [questionTech],
          tags: questionTags.split(",").map(t => t.trim()).filter(Boolean),
          requirements: questionRequirements.split("\n").map(r => r.trim()).filter(Boolean),
          starterFiles: starterFiles,
          expectedOutput: questionExpectedOutput,
          published: addToQuestionBank,
          metadata: {
            programmingLanguage,
            timeLimit,
            memoryLimit,
            hints: [],
            companies: []
          }
        };

        const qRes = await api.post("/questions", questionPayload);
        finalQuestionId = qRes.data.data.id;
        
        if (addToQuestionBank) {
          await api.post(`/questions/${finalQuestionId}/publish`);
        }
      }

      if (!finalQuestionId) {
        toast.error("Please select or create a question.");
        setIsSaving(false);
        return;
      }

      const homeworkPayload = {
        title: finalTitle,
        description: finalDescription,
        dueDate: new Date(dueDate).toISOString(),
        questions: [finalQuestionId]
      };

      const hwRes = await api.post("/homework", homeworkPayload);
      const newHomework = hwRes.data.data;

      if (assignedBatch) {
        await api.post(`/homework/${newHomework.id}/assign`, {
          batch: assignedBatch
        });
      }

      toast.success("Homework assignment created successfully and assigned to " + assignedBatch + "!");
      setIsCreateModalOpen(false);
      
      // Reset form
      setHomeworkTitle("");
      setHomeworkDescription("");
      setDueDate("");
      setQuestionExpectedOutput("");
      setSelectedQuestionId("");

      queryClient.invalidateQueries(["teacherHomeworkData"]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create homework assignment.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteHomeworkMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/homework/${id}`);
    },
    onSuccess: () => {
      toast.success("Homework deleted successfully.");
      queryClient.invalidateQueries(["teacherHomeworkData"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete homework.");
    }
  });

  const handleDeleteHomework = (id) => {
    if (!confirm("Are you sure you want to delete this homework assignment?")) return;
    deleteHomeworkMutation.mutate(id);
  };

  const filteredHomework = homeworkList.filter((hw) => {
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "Active" && new Date(hw.dueDate) > new Date()) ||
      (selectedStatus === "Completed" && new Date(hw.dueDate) <= new Date());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Homework</h1>
          <p className="text-slate-400">
            Create and manage homework assignments for your students
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          Create Homework
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Homework</p>
                <p className="mt-2 text-3xl font-bold text-white">{homeworkList.length}</p>
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
                <p className="text-sm text-slate-400">Active</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homeworkList.filter((hw) => new Date(hw.dueDate) > new Date()).length}
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
                <p className="text-sm text-slate-400">Total Questions Linked</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {questionsList.length}
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
                <p className="text-sm text-slate-400">Completed Assignments</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homeworkList.filter((hw) => new Date(hw.dueDate) <= new Date()).length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Calendar className="h-6 w-6 text-yellow-400" />
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Homework List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-400">Loading homework assignments...</p>
        ) : filteredHomework.length === 0 ? (
          <p className="text-slate-500">No homework assignments found.</p>
        ) : (
          filteredHomework.map((hw) => (
            <Card key={hw.id} className="transition hover:border-emerald-500/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {hw.title}
                      </h3>
                      <Badge variant={new Date(hw.dueDate) > new Date() ? "success" : "secondary"}>
                        {new Date(hw.dueDate) > new Date() ? "Active" : "Completed"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{hw.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-400" />
                        <span>Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span>{assignedBatch}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteHomework(hw.id)}
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

      {/* Create Homework Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Homework"
        size="lg"
      >
        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">


          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Assign to Batch</label>
              <Select
                value={assignedBatch}
                onChange={(e) => setAssignedBatch(e.target.value)}
              >
                <SelectItem value="">Select Batch...</SelectItem>
                {batchesList.map((batch) => (
                  <SelectItem key={batch.id} value={batch.name}>
                    {batch.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <hr className="border-slate-700" />

          {/* Question Source Selection */}
          <div>
            <label className="mb-2 block text-sm text-slate-300 font-semibold">Question Source</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-white">
                <input
                  type="radio"
                  name="qSource"
                  checked={questionSource === "existing"}
                  onChange={() => setQuestionSource("existing")}
                />
                Choose Existing Question
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-white">
                <input
                  type="radio"
                  name="qSource"
                  checked={questionSource === "new"}
                  onChange={() => setQuestionSource("new")}
                />
                Create New Custom Question
              </label>
            </div>
          </div>

          {questionSource === "existing" ? (
            <div>
              <label className="mb-2 block text-sm text-slate-300">Select Question</label>
              <Select
                value={selectedQuestionId}
                onChange={(e) => setSelectedQuestionId(e.target.value)}
              >
                <SelectItem value="">Select from question bank</SelectItem>
                {questionsList.map((q) => (
                  <SelectItem key={q.id} value={q.id}>
                    {q.title} ({q.difficulty})
                  </SelectItem>
                ))}
              </Select>
            </div>
          ) : (
            <div className="space-y-4 border border-slate-700/50 bg-slate-800/30 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-white">Custom Question Details</h3>
              
              <div>
                <label className="mb-2 block text-xs text-slate-300">Question Title</label>
                <Input
                  value={homeworkTitle}
                  onChange={(e) => setHomeworkTitle(e.target.value)}
                  placeholder="e.g. Find Max Subarray Sum"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-300">Question Description</label>
                <textarea
                  value={homeworkDescription}
                  onChange={(e) => setHomeworkDescription(e.target.value)}
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
                  <label className="mb-2 block text-xs text-slate-300">Category</label>
                  <Select
                    value={questionTech}
                    onChange={(e) => setQuestionTech(e.target.value)}
                  >
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="html">HTML/CSS</SelectItem>
                    <SelectItem value="system_design">System Design</SelectItem>
                  </Select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-300">Programming Language (Workspace Type)</label>
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
                  <label className="mb-2 block text-xs text-slate-300">Time Limit (ms)</label>
                  <Input value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} placeholder="2000" />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-slate-300">Memory Limit (MB)</label>
                  <Input value={memoryLimit} onChange={(e) => setMemoryLimit(e.target.value)} placeholder="256" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-300">Tags (comma separated)</label>
                <Input
                  value={questionTags}
                  onChange={(e) => setQuestionTags(e.target.value)}
                  placeholder="React, Hook, Frontend"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-300">Requirements (one per line)</label>
                <textarea
                  value={questionRequirements}
                  onChange={(e) => setQuestionRequirements(e.target.value)}
                  placeholder="Should display list of items&#10;Should be responsive"
                  className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[60px] text-sm"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center justify-between text-xs text-slate-300">
                  <span>Starter Files JSON</span>
                  <span className="text-slate-500">(Auto-generated)</span>
                </label>
                <textarea
                  value={JSON.stringify(starterFiles, null, 2)}
                  onChange={(e) => {
                    try { setStarterFiles(JSON.parse(e.target.value)); } catch (err) {
      console.error(err);
}
    }}
                  className="w-full font-mono rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[150px] text-xs"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-300">Expected Output Keyword/Criteria</label>
                <Input
                  value={questionExpectedOutput}
                  onChange={(e) => setQuestionExpectedOutput(e.target.value)}
                  placeholder="Keyword to verify in evaluation"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="addBank"
                  checked={addToQuestionBank}
                  onChange={(e) => setAddToQuestionBank(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="addBank" className="text-xs text-slate-300 cursor-pointer">
                  Add this Question to Question Bank (make public)
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => setIsCreateModalOpen(false)}
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateHomework}
              disabled={isSaving}
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              {isSaving ? "Saving..." : "Create Homework"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherHomework;
