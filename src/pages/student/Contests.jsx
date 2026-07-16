import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import toast from "react-hot-toast";
import api from "@/services/api";
import {
  Search,
  Trophy,
  Users,
  Clock,
  Play,
  CheckCircle,
  Calendar,
  Award,
} from "lucide-react";

function StudentContests() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [contestsList, setContestsList] = useState([]);
  const [registrations, setRegistrations] = useState({}); // { [contestId]: boolean }
  const [loading, setLoading] = useState(true);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contests");
      const list = res.data.data?.data || res.data.data || [];
      setContestsList(list);

      // Check registration for each contest
      const regMap = {};
      await Promise.all(
        list.map(async (c) => {
          try {
            await api.get(`/contests/${c.id}/questions`);
            regMap[c.id] = true;
          } catch (e) {
            regMap[c.id] = false;
          }
        })
      );
      setRegistrations(regMap);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleRegister = async (contestId) => {
    try {
      await api.post(`/contests/${contestId}/join`);
      toast.success("Successfully registered for contest!");
      setRegistrations((prev) => ({ ...prev, [contestId]: true }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to register for contest.");
    }
  };

  const handleStartContest = async (contestId) => {
    try {
      // Call start timer
      await api.post(`/contests/${contestId}/start`);
      // Fetch questions to find the first question ID
      const qRes = await api.get(`/contests/${contestId}/questions`);
      const questions = qRes.data.data || [];
      
      if (questions.length === 0) {
        toast.error("No questions in this contest yet.");
        return;
      }
      
      const firstQuestionId = questions[0].questionId || questions[0].id;
      // Navigate to solve workspace passing questionId and contestId as query parameter
      navigate(`/student/workspace/${firstQuestionId}?contestId=${contestId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to start contest.");
    }
  };

  const getDaysRemaining = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const diffTime = start - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
          <p className="text-slate-400">Loading contests...</p>
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
            const isCompleted = endTimeDate < now;

            const statusText = isUpcoming ? "Upcoming" : isActive ? "Active" : "Completed";

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
                      {isCompleted ? (
                        <span className="text-sm text-slate-500 font-semibold">Ended</span>
                      ) : isUpcoming ? (
                        isRegistered ? (
                          <div className="flex items-center gap-2 text-sm text-emerald-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>Registered</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRegister(contest.id)}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 font-semibold text-white transition cursor-pointer"
                          >
                            Register Now
                          </button>
                        )
                      ) : isActive ? (
                        isRegistered ? (
                          <button
                            onClick={() => handleStartContest(contest.id)}
                            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 font-semibold text-black transition cursor-pointer"
                          >
                            <Play className="h-4 w-4" />
                            Start Contest
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRegister(contest.id)}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 font-semibold text-white transition cursor-pointer"
                          >
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
