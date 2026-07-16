import api from "./api";

export const homeworkService = {
  // Get all homework (Teacher only)
  getAllHomework: async (params = {}) => {
    const response = await api.get("/homework", { params });
    return response.data;
  },

  // Get homework by ID
  getHomeworkById: async (id) => {
    const response = await api.get(`/homework/${id}`);
    return response.data;
  },

  // Create homework (Teacher only)
  createHomework: async (homeworkData) => {
    const response = await api.post("/homework", homeworkData);
    return response.data;
  },

  // Update homework (Teacher only)
  updateHomework: async (id, homeworkData) => {
    const response = await api.put(`/homework/${id}`, homeworkData);
    return response.data;
  },

  // Delete homework (Teacher only)
  deleteHomework: async (id) => {
    const response = await api.delete(`/homework/${id}`);
    return response.data;
  },

  // Assign homework to students (Teacher only)
  assignHomework: async (id, assignmentData) => {
    const response = await api.post(`/homework/${id}/assign`, assignmentData);
    return response.data;
  },

  // Get assigned homework (Student only)
  getAssignedHomework: async (params = {}) => {
    const response = await api.get("/homework/assigned", { params });
    return response.data;
  },

  // Submit homework (Student only)
  submitHomework: async (roomId, submissionData) => {
    const response = await api.post(`/homework/${roomId}/submit`, submissionData);
    return response.data;
  },

  // Get homework submissions (Teacher only)
  getHomeworkSubmissions: async (roomId, params = {}) => {
    const response = await api.get(`/homework/${roomId}/submissions`, { params });
    return response.data;
  },

  // Get student's submission for a homework (Student only)
  getMyHomeworkSubmission: async (roomId) => {
    const response = await api.get(`/homework/${roomId}/my-submission`);
    return response.data;
  },

  // Get submission by ID
  getSubmissionById: async (id) => {
    const response = await api.get(`/homework/submissions/${id}`);
    return response.data;
  },

  // Update homework submission (AI feedback)
  updateSubmission: async (id, updateData) => {
    const response = await api.put(`/homework/submissions/${id}`, updateData);
    return response.data;
  },
};
