import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { ShieldCheck, CheckSquare, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function ApproveTeachers() {
  const queryClient = useQueryClient();

  const { data: pendingTeachers = [], isLoading } = useQuery({
    queryKey: ["adminTeachers"],
    queryFn: async () => {
      const res = await api.get("/admin/teachers");
      if (res.data && res.data.success) {
        return res.data.data.filter((t) => !t.isApproved);
      }
      return [];
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await api.put(`/admin/teachers/${id}/approve`, { isApproved: true });
    },
    onSuccess: () => {
      toast.success("Teacher account approved successfully!");
      queryClient.invalidateQueries(["adminTeachers"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to approve teacher account.");
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  const pending = pendingTeachers;

  return (
    <div className="space-y-6">
      <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Pending Approvals</h2>
        <p className="text-sm text-slate-400 mt-1">Review and activate new teacher account applications.</p>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center text-slate-400 space-y-3">
          <ShieldCheck className="h-12 w-12 text-emerald-400 mx-auto" />
          <h3 className="text-white font-bold text-lg">No Pending Approvals</h3>
          <p className="text-sm max-w-sm mx-auto">All registered teacher accounts are active.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {pending.map((t) => (
            <div
              key={t.id}
              className="bg-[#111827]/50 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between gap-4"
            >
              <div>
                <h3 className="text-white font-bold text-lg">{t.username}</h3>
                <p className="text-sm text-slate-400 mt-1">{t.email}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-yellow-400 font-semibold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit">
                  Requires Admin Activation
                </div>
              </div>
              
              <button
                onClick={() => approveMutation.mutate(t.id)}
                disabled={approveMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-xl transition text-sm disabled:opacity-50"
              >
                <CheckSquare className="h-4 w-4" />
                Approve & Activate Account
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApproveTeachers;
