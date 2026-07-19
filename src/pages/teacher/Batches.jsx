import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import {
  Users,
  Plus,
  Trash2,
  GraduationCap,
  Building,
  Loader2,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

function TeacherBatches() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [selectedCollegeId, setSelectedCollegeId] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [enrollSelections, setEnrollSelections] = useState({});

  const { data = {}, isLoading } = useQuery({
    queryKey: ["teacherBatchesData"],
    queryFn: async () => {
      const [batchesRes, pendingRes, metaRes] = await Promise.all([
        api.get("/batches"),
        api.get("/batches/students/pending"),
        api.get("/batches/colleges-departments"),
      ]);
      return {
        batches: batchesRes.data.data || [],
        pendingStudents: pendingRes.data.data || [],
        colleges: metaRes.data.data?.colleges || [],
        departments: metaRes.data.data?.departments || [],
      };
    },
  });

  const { batches = [], pendingStudents = [], colleges = [], departments = [] } = data;

  const availableDepartments = useMemo(() => {
    if (!selectedCollegeId) return [];
    return departments.filter((d) => d.collegeId === selectedCollegeId);
  }, [selectedCollegeId, departments]);

  const createBatchMutation = useMutation({
    mutationFn: async () => {
      await api.post("/batches", {
        name: batchName,
        collegeId: selectedCollegeId,
        departmentId: selectedDeptId,
      });
    },
    onSuccess: () => {
      toast.success("Batch created successfully!");
      setBatchName("");
      setSelectedCollegeId("");
      setSelectedDeptId("");
      setIsCreateModalOpen(false);
      queryClient.invalidateQueries(["teacherBatchesData"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create batch.");
    }
  });

  const handleCreateBatch = () => {
    if (!batchName.trim() || !selectedCollegeId || !selectedDeptId) {
      toast.error("Please fill in all the batch creation details.");
      return;
    }
    createBatchMutation.mutate();
  };

  const deleteBatchMutation = useMutation({
    mutationFn: async (batchId) => {
      await api.delete(`/batches/${batchId}`);
    },
    onSuccess: () => {
      toast.success("Batch deleted successfully.");
      queryClient.invalidateQueries(["teacherBatchesData"]);
    },
    onError: () => {
      toast.error("Failed to delete batch.");
    }
  });

  const handleDeleteBatch = (batchId) => {
    if (!confirm("Are you sure you want to delete this batch? All enrolled students will be unassigned.")) return;
    deleteBatchMutation.mutate(batchId);
  };

  const enrollStudentMutation = useMutation({
    mutationFn: async ({ batchId, studentId }) => {
      await api.post(`/batches/${batchId}/enroll`, { studentId });
    },
    onSuccess: (_, { studentId }) => {
      toast.success("Student successfully enrolled!");
      setEnrollSelections((prev) => {
        const next = { ...prev };
        delete next[studentId];
        return next;
      });
      queryClient.invalidateQueries(["teacherBatchesData"]);
    },
    onError: () => {
      toast.error("Failed to enroll student.");
    }
  });

  const handleEnrollStudent = (studentId) => {
    const batchId = enrollSelections[studentId];
    if (!batchId) {
      toast.error("Please select a target batch to enroll the student.");
      return;
    }
    enrollStudentMutation.mutate({ batchId, studentId });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-bold text-white">Batch Management</h2>
          <p className="text-sm text-slate-400 mt-1">Configure student batches and manage enrollments.</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          Create Batch
        </Button>
      </div>

      <div className="flex gap-4 border-b border-slate-700 pb-px">
        <button
          onClick={() => setActiveTab("list")}
          className={`pb-3 text-sm font-semibold transition border-b-2 ${
            activeTab === "list" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Active Batches ({batches.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 text-sm font-semibold transition border-b-2 ${
            activeTab === "pending" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Pending Assignments ({pendingStudents.length})
        </button>
      </div>

      {activeTab === "list" ? (
        batches.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400">
            No active student batches found. Create one to get started.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {batches.map((batch) => (
              <Card key={batch.id} className="border-slate-700/50 hover:border-emerald-500/50 transition">
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <Badge variant="success" className="mb-2">{batch.name}</Badge>
                    <CardTitle className="text-lg text-white font-bold">{batch.name}</CardTitle>
                  </div>
                  <button onClick={() => handleDeleteBatch(batch.id)} className="text-slate-500 hover:text-red-400 transition">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-emerald-400" />
                      <span>{batch.collegeName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                      <span>{batch.departmentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="font-semibold text-white">{batch.studentCount} Students Enrolled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : pendingStudents.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400">
          All registered students have been assigned to active batches!
        </div>
      ) : (
        <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/40 text-slate-400 font-semibold">
                  <th className="p-4">Username</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Registered At</th>
                  <th className="p-4">Enroll in Batch</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {pendingStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-semibold text-white">{student.username}</td>
                    <td className="p-4">{student.email}</td>
                    <td className="p-4 text-slate-400">{new Date(student.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      {batches.length === 0 ? (
                        <span className="text-red-400 text-xs">Create a batch first</span>
                      ) : (
                        <Select
                          value={enrollSelections[student.id] || ""}
                          onChange={(e) => setEnrollSelections((prev) => ({ ...prev, [student.id]: e.target.value }))}
                          className="max-w-[200px]"
                        >
                          <SelectItem value="">Select Batch...</SelectItem>
                          {batches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                        </Select>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        onClick={() => handleEnrollStudent(student.id)}
                        disabled={!enrollSelections[student.id]}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 mx-auto"
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        Enroll Student
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Student Batch"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Batch Name</label>
            <Input
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              placeholder="e.g. Batch-2026"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">College</label>
            <Select
              value={selectedCollegeId}
              onChange={(e) => {
                setSelectedCollegeId(e.target.value);
                setSelectedDeptId("");
              }}
            >
              <SelectItem value="">Select College...</SelectItem>
              {colleges.map((college) => <SelectItem key={college.id} value={college.id}>{college.name}</SelectItem>)}
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Department</label>
            <Select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              disabled={!selectedCollegeId}
            >
              <SelectItem value="">Select Department...</SelectItem>
              {availableDepartments.map((dept) => <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>)}
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <Button
              onClick={() => setIsCreateModalOpen(false)}
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateBatch}
              disabled={createBatchMutation.isPending}
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              {createBatchMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Batch"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherBatches;
