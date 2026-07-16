import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import toast from "react-hot-toast";
import api from "@/services/api";
import {
  Search,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Award,
  Play,
} from "lucide-react";

function StudentHomework() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [homeworkList, setHomeworkList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedHomework = async () => {
    try {
      setLoading(true);
      const res = await api.get("/homework/assigned");
      setHomeworkList(res.data.data?.data || res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load assigned homeworks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedHomework();
  }, []);

  const getDaysRemaining = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredHomework = homeworkList.filter((hw) => {
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isCompleted = hw.status === "Completed" || hw.submissionsCount > 0;
    const isOverdue = !isCompleted && new Date(hw.dueDate) < new Date();
    const isPending = !isCompleted && !isOverdue;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "Pending" && isPending) ||
      (selectedStatus === "Completed" && isCompleted) ||
      (selectedStatus === "Overdue" && isOverdue);

    return matchesSearch && matchesStatus;
  });

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
                <p className="text-sm text-slate-400">Pending</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homeworkList.filter((hw) => !hw.submissionsCount && new Date(hw.dueDate) >= new Date()).length}
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
                  {homeworkList.filter((hw) => hw.submissionsCount > 0).length}
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
                <p className="text-sm text-slate-400">Overdue</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {homeworkList.filter((hw) => !hw.submissionsCount && new Date(hw.dueDate) < new Date()).length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                <Award className="h-6 w-6 text-red-400" />
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
        {loading ? (
          <p className="text-slate-400">Loading homeworks...</p>
        ) : filteredHomework.length === 0 ? (
          <p className="text-slate-500">No homework assignments found.</p>
        ) : (
          filteredHomework.map((hw) => {
            const isCompleted = hw.submissionsCount > 0;
            const isOverdue = !isCompleted && new Date(hw.dueDate) < new Date();
            const daysRemaining = getDaysRemaining(hw.dueDate);
            const difficulty = hw.difficulty || "medium";

            return (
              <Card
                key={hw.id}
                className={`transition ${
                  isOverdue ? "border-red-500/30" : "hover:border-emerald-500/50"
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
                            difficulty === "easy"
                              ? "success"
                              : difficulty === "medium"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {difficulty.toUpperCase()}
                        </Badge>
                        <Badge
                          variant={
                            isCompleted ? "success" : isOverdue ? "destructive" : "warning"
                          }
                        >
                          {isCompleted ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-4">
                        {hw.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span>Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                        </div>
                        {!isCompleted && !isOverdue && (
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

                    {isCompleted ? (
                      <div className="text-right">
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                          <p className="text-sm text-emerald-400 font-semibold">Done</p>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={`/student/workspace/${hw.id}`}
                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
                      >
                        <Play className="h-4 w-4" />
                        {isOverdue ? "Submit Now" : "Start Homework"}
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default StudentHomework;
