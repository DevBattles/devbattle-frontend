import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Users, GraduationCap, Building, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function JoinBatch() {
  const queryClient = useQueryClient();
  const [joinCode, setJoinCode] = useState("");

  // Get user profile details to see current batch assignment
  const { data: userResponse, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data;
    },
  });

  const userData = userResponse?.data || {};

  // Get student's pending join requests
  const { data: pendingRequestsRes } = useQuery({
    queryKey: ["batches", "my-join-requests"],
    queryFn: async () => {
      const res = await api.get("/batches/my-join-requests");
      return res.data.data || [];
    }
  });

  const pendingRequests = pendingRequestsRes || [];

  const joinBatchMutation = useMutation({
    mutationFn: async (code) => {
      const res = await api.post("/batches/join", { joinCode: code });
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Join request submitted! Awaiting teacher approval.");
      setJoinCode("");
      queryClient.invalidateQueries(["profile"]);
      queryClient.invalidateQueries(["batches", "my-join-requests"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit join request. Please check your join code.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      toast.error("Please enter a join code");
      return;
    }
    joinBatchMutation.mutate(joinCode.trim());
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Join Batch</h1>
        <p className="text-slate-400">
          Request to enroll in your classroom or course batch using a join code provided by your teacher.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Batch details & Pending Requests */}
        <Card className="border-slate-700/50 bg-[#111827]/30">
          <CardHeader>
            <CardTitle className="text-lg text-white font-bold flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
              Current Batch Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.studentProfile?.batch ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Enrolled Batch</p>
                  <p className="text-lg font-bold text-white mt-0.5">{userData.studentProfile.batch}</p>
                </div>
                {userData.studentProfile.college?.name && (
                  <div className="flex items-center gap-2 text-sm text-slate-300 border-t border-slate-700/50 pt-3">
                    <Building className="h-4 w-4 text-emerald-400" />
                    <span>{userData.studentProfile.college.name}</span>
                  </div>
                )}
                {userData.studentProfile.department?.name && (
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <GraduationCap className="h-4 w-4 text-purple-400" />
                    <span>{userData.studentProfile.department.name}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center text-slate-400 space-y-2">
                <Users className="h-10 w-10 mx-auto text-slate-600" />
                <p className="font-semibold text-white">Not enrolled in any batch</p>
                <p className="text-xs">Enter a join code on the right to send a join request to your teacher.</p>
              </div>
            )}

            {/* Display pending requests if any */}
            {pendingRequests.length > 0 && (
              <div className="space-y-2 border-t border-slate-800 pt-4">
                <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Pending Approval Requests</p>
                {pendingRequests.map(req => (
                  <div key={req.id} className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{req.batchName}</p>
                      <p className="text-slate-400">Requested: {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Recently'}</p>
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase">
                      Pending Teacher
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Join Code Input Form */}
        <Card className="border-slate-700/50 bg-[#111827]/30">
          <CardHeader>
            <CardTitle className="text-lg text-white font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-400" />
              Enter Join Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Batch Code</label>
                <Input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. DEV123AB"
                  className="text-center font-mono text-lg uppercase tracking-widest placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
                  maxLength={12}
                />
              </div>

              <Button
                type="submit"
                disabled={joinBatchMutation.isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold flex items-center justify-center gap-2 py-3 rounded-xl transition cursor-pointer"
              >
                {joinBatchMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Submit Join Request
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default JoinBatch;
