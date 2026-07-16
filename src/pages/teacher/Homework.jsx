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
  Calendar,
  Users,
  FileText,
  Edit,
  Trash2,
  Clock,
  Filter,
} from "lucide-react";

function TeacherHomework() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const homework = [
    {
      id: 1,
      title: "React Portfolio",
      description: "Build a professional portfolio website using React with modern design principles",
      dueDate: "2024-01-20",
      difficulty: "Medium",
      assignedTo: "Batch A",
      submissions: 45,
      totalStudents: 50,
      status: "Active",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "E-commerce API",
      description: "Create a RESTful API for an e-commerce platform using Node.js and Express",
      dueDate: "2024-01-22",
      difficulty: "Hard",
      assignedTo: "Batch B",
      submissions: 32,
      totalStudents: 48,
      status: "Active",
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      title: "Netflix Clone",
      description: "Build a Netflix-like streaming interface with React and API integration",
      dueDate: "2024-01-15",
      difficulty: "Hard",
      assignedTo: "Batch A",
      submissions: 50,
      totalStudents: 50,
      status: "Completed",
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      title: "Responsive Landing Page",
      description: "Design and build a beautiful landing page with responsive design",
      dueDate: "2024-01-25",
      difficulty: "Easy",
      assignedTo: "Batch C",
      submissions: 12,
      totalStudents: 45,
      status: "Active",
      createdAt: "2024-01-14",
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

  const batches = ["Batch A", "Batch B", "Batch C", "Batch D"];

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
                <p className="text-sm text-slate-400">Active</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homework.filter((hw) => hw.status === "Active").length}
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
                <p className="text-sm text-slate-400">Total Submissions</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homework.reduce((acc, hw) => acc + hw.submissions, 0)}
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
                <p className="text-sm text-slate-400">Pending Reviews</p>
                <p className="mt-2 text-3xl font-bold text-white">23</p>
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
                <SelectItem value="Draft">Draft</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.map((hw) => (
          <Card key={hw.id} className="transition hover:border-emerald-500/50">
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
                      variant={hw.status === "Active" ? "success" : "secondary"}
                    >
                      {hw.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{hw.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      <span>Due: {hw.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span>{hw.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span>
                        {hw.submissions}/{hw.totalStudents} submissions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/teacher/homework/${hw.id}`}
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
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Submission Progress</span>
                    <span>{Math.round((hw.submissions / hw.totalStudents) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-emerald-400 transition-all"
                      style={{
                        width: `${(hw.submissions / hw.totalStudents) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <Link
                  to={`/teacher/homework/${hw.id}/submissions`}
                  className="text-sm text-emerald-400 hover:underline"
                >
                  View Submissions
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Homework Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Homework"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Title</label>
            <Input placeholder="Enter homework title" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              placeholder="Enter homework description"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Due Date
              </label>
              <Input type="date" />
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
                Assign to Batch
              </label>
              <Select>
                <SelectItem value="">Select batch</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Visibility
              </label>
              <Select>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select Question
            </label>
            <Select>
              <SelectItem value="">Select from question bank</SelectItem>
              <SelectItem value="1">React Portfolio</SelectItem>
              <SelectItem value="2">E-commerce API</SelectItem>
              <SelectItem value="3">Netflix Clone</SelectItem>
            </Select>
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
              Create Homework
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherHomework;
