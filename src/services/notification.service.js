import api from "./api";

export const notificationService = {
  // Get all notifications for current user
  getNotifications: async (params = {}) => {
    const response = await api.get("/notifications", { params });
    return response.data;
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    const response = await api.get("/notifications/unread");
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // Get notification count
  getNotificationCount: async () => {
    const response = await api.get("/notifications/count");
    return response.data;
  },
};
