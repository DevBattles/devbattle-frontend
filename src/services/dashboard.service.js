import api from "./api";

export const dashboardService = {
  // Get student dashboard stats
  getStudentDashboardStats: async () => {
    const response = await api.get("/dashboard/student");
    return response.data;
  },

  // Get teacher dashboard stats
  getTeacherDashboardStats: async () => {
    const response = await api.get("/dashboard/teacher");
    return response.data;
  },

  // Get admin dashboard stats
  getAdminDashboardStats: async () => {
    const response = await api.get("/dashboard/admin");
    return response.data;
  },

  // Get recent activity
  getRecentActivity: async (params = {}) => {
    const response = await api.get("/dashboard/activity", { params });
    return response.data;
  },

  // Get performance metrics
  getPerformanceMetrics: async (params = {}) => {
    const response = await api.get("/dashboard/performance", { params });
    return response.data;
  },
};
