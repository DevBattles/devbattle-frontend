import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Bell, Check, CheckSquare, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Notifications() {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications");
      if (res.data && res.data.success) {
        return res.data.data;
      }
      return [];
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id) => {
      await api.put(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      toast.success("Notification marked as read");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update notification.");
    }
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      await api.put("/notifications/read-all");
    },
    onSuccess: () => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update notifications.");
    }
  });

  const markAsRead = (id) => markAsReadMutation.mutate(id);
  const markAllAsRead = () => markAllAsReadMutation.mutate();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-bold text-white">Notifications Hub</h2>
          <p className="text-sm text-slate-400 mt-1">Stay updated with classroom contests, assignments, and AI reports.</p>
        </div>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2.5 rounded-xl transition text-sm"
          >
            <CheckSquare className="h-4 w-4" />
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center space-y-4">
          <Bell className="h-16 w-16 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">All Caught Up!</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            You don't have any notifications at the moment. We'll alert you here when new contests start or homework is graded.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start justify-between gap-4 p-5 rounded-2xl border transition ${
                n.isRead
                  ? "bg-[#111827]/20 border-slate-800 text-slate-400"
                  : "bg-[#111827]/70 border-slate-700 text-white shadow-md shadow-emerald-500/2"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.isRead ? "bg-slate-800 text-slate-500" : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className={`text-sm leading-relaxed ${n.isRead ? "text-slate-400" : "text-slate-200"}`}>{n.message}</p>
                  <span className="text-xs text-slate-500 mt-2 block">{n.createdAt ? new Date(n.createdAt).toLocaleString() : "Recently"}</span>
                </div>
              </div>

              {!n.isRead && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition shrink-0"
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
