import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/services/api";
import {
  Search,
  Clock,
  Play,
  CheckCircle,
  Calendar,
  Loader2,
} from "lucide-react";

function StudentContests() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading: loading } = useQuery({
    queryKey: ["contests", "student"],
    queryFn: async () => {
      const [res, subRes] = await Promise.all([
        api.get("/contests"),
        api.get("/contests/submissions").catch(() => ({ data: { data: [] } }))
      ]);
      const list = res.data.data?.data || res.data.data || [];
      const userSubmissions = subRes.data?.data || [];
      const attemptedContestIds = new Set(userSubmissions.map(s => s.contestId));

      // Check registration for each contest
      const regMap = {};
      await Promise.all(
        list.map(async (c) => {
          try {
            await api.get(`/contests/${c.id}/questions`);
            regMap[c.id] = true;
          } catch {
            regMap[c.id] = false;
          }
        })
      );
      
      return { contestsList: list, registrations: regMap, attemptedContestIds };
    },
  });

  const contestsList = data?.contestsList || [];
  const registrations = data?.registrations || {};
  const attemptedContestIds = data?.attemptedContestIds || new Set();

  const registerMutation = useMutation({
    mutationFn: async (contestId) => {
      await api.post(`/contests/${contestId}/join`);
      return contestId;
    },
    onSuccess: (contestId) => {
      toast.success("Successfully registered for contest!");
      queryClient.setQueryData(["contests", "student"], (old) => {
        if (!old) return old;
        return {
          ...old,
          registrations: { ...old.registrations, [contestId]: true }
        };
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to register for contest.");
    }
  });

  const handleRegister = (contestId) => {
    registerMutation.mutate(contestId);
  };

  const startContestMutation = useMutation({
    mutationFn: async (contestId) => {
      await api.post(`/contests/${contestId}/start`);
      const qRes = await api.get(`/contests/${contestId}/questions`);
      return { contestId, questions: qRes.data.data || [] };
    },
    onSuccess: ({ contestId, questions }) => {
      if (questions.length === 0) {
        toast.error("No questions in this contest yet.");
        return;
      }
      const firstQuestionId = questions[0].questionId || questions[0].id;
      navigate(`/student/workspace/${firstQuestionId}?contestId=${contestId}`);
    },
    onError: () => {
      toast.error("Failed to start contest.");
    }
  });

  const handleStartContest = (contestId) => {
    startContestMutation.mutate(contestId);
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
      <div>
        <h1 className="text-2xl font-bold text-white">Contests</h1>
        <p className="text-slate-400">
          Join active live coding contests, compete with others, and view leaderboard ranks
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
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : filteredContests.length === 0 ? (
          <p className="text-slate-500">No contests available.</p>
        ) : (
          filteredContests.map((contest) => {
            const isRegistered = !!registrations[contest.id];
            const startTimeDate = new Date(contest.startTime);
            const endTimeDate = new Date(contest.endTime);
            const now = new Date();

            const isUpcoming = startTimeDate > now;
            const isActive = startTimeDate <= now && endTimeDate >= now;
            const isEnded = endTimeDate < now;
            const hasAttempted = attemptedContestIds.has(contest.id);

            const statusText = isUpcoming
              ? "Upcoming"
              : isActive
              ? "Live"
              : hasAttempted
              ? "Completed"
              : "Ended";

            return (
              <Card
                key={contest.id}
                className={`transition ${
                  isActive ? "border-emerald-500/50 bg-emerald-500/5" : "hover:border-emerald-500/50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {contest.title || contest.name}
                        </h3>
                        <Badge
                          variant={
                            isUpcoming ? "info" : isActive ? "warning" : "secondary"
                          }
                        >
                          {statusText}
                        </Badge>
                        {isRegistered && <Badge variant="success">Registered</Badge>}
                      </div>
                      <p className="text-sm text-slate-400 mb-4">
                        {contest.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span>Start: {startTimeDate.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span>End: {endTimeDate.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      {isEnded ? (
                        <span className="text-sm text-slate-500 font-semibold">{hasAttempted ? "Completed" : "Ended"}</span>
                      ) : isUpcoming ? (
                        isRegistered ? (
                          <div className="flex items-center gap-2 text-sm text-emerald-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>Registered</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRegister(contest.id)}
                            disabled={registerMutation.isPending}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 font-semibold text-white transition cursor-pointer"
                          >
                            {registerMutation.isPending && registerMutation.variables === contest.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                            Register Now
                          </button>
                        )
                      ) : isActive ? (
                        isRegistered ? (
                          <button
                            onClick={() => handleStartContest(contest.id)}
                            disabled={startContestMutation.isPending}
                            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 font-semibold text-black transition cursor-pointer"
                          >
                            {startContestMutation.isPending && startContestMutation.variables === contest.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4" />}
                            Start Contest
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRegister(contest.id)}
                            disabled={registerMutation.isPending}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 font-semibold text-white transition cursor-pointer"
                          >
                            {registerMutation.isPending && registerMutation.variables === contest.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                            Register & Join
                          </button>
                        )
                      ) : null}
                    </div>
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

export default StudentContests;
