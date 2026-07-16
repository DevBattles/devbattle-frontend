import api from "./api";

export const adminService = {
  // Get all teachers
  getTeachers: async (params = {}) => {
    const response = await api.get("/admin/teachers", { params });
    return response.data;
  },

  // Get all students
  getStudents: async (params = {}) => {
    const response = await api.get("/admin/students", { params });
    return response.data;
  },

  // Get pending teacher approvals
  getPendingApprovals: async () => {
    const response = await api.get("/admin/pending-approvals");
    return response.data;
  },

  // Approve teacher
  approveTeacher: async (id) => {
    const response = await api.post(`/admin/teachers/${id}/approve`);
    return response.data;
  },

  // Reject teacher
  rejectTeacher: async (id) => {
    const response = await api.post(`/admin/teachers/${id}/reject`);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Get all colleges
  getColleges: async (params = {}) => {
    const response = await api.get("/admin/colleges", { params });
    return response.data;
  },

  // Create college
  createCollege: async (collegeData) => {
    const response = await api.post("/admin/colleges", collegeData);
    return response.data;
  },

  // Update college
  updateCollege: async (id, collegeData) => {
    const response = await api.put(`/admin/colleges/${id}`, collegeData);
    return response.data;
  },

  // Delete college
  deleteCollege: async (id) => {
    const response = await api.delete(`/admin/colleges/${id}`);
    return response.data;
  },

  // Get all departments
  getDepartments: async (params = {}) => {
    const response = await api.get("/admin/departments", { params });
    return response.data;
  },

  // Create department
  createDepartment: async (departmentData) => {
    const response = await api.post("/admin/departments", departmentData);
    return response.data;
  },

  // Update department
  updateDepartment: async (id, departmentData) => {
    const response = await api.put(`/admin/departments/${id}`, departmentData);
    return response.data;
  },

  // Delete department
  deleteDepartment: async (id) => {
    const response = await api.delete(`/admin/departments/${id}`);
    return response.data;
  },

  // Get platform analytics
  getPlatformAnalytics: async (params = {}) => {
    const response = await api.get("/admin/analytics", { params });
    return response.data;
  },

  // Get platform settings
  getPlatformSettings: async () => {
    const response = await api.get("/admin/settings");
    return response.data;
  },

  // Update platform settings
  updatePlatformSettings: async (settingsData) => {
    const response = await api.put("/admin/settings", settingsData);
    return response.data;
  },
};
