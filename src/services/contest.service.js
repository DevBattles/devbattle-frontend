import api from "./api";

export const contestService = {
  // Get all contests
  getAllContests: async (params = {}) => {
    const response = await api.get("/contests", { params });
    return response.data;
  },

  // Get contest by ID
  getContestById: async (id) => {
    const response = await api.get(`/contests/${id}`);
    return response.data;
  },

  // Create contest (Teacher only)
  createContest: async (contestData) => {
    const response = await api.post("/contests", contestData);
    return response.data;
  },

  // Update contest (Teacher only)
  updateContest: async (id, contestData) => {
    const response = await api.put(`/contests/${id}`, contestData);
    return response.data;
  },

  // Delete contest (Teacher only)
  deleteContest: async (id) => {
    const response = await api.delete(`/contests/${id}`);
    return response.data;
  },

  // Assign questions to contest (Teacher only)
  assignQuestions: async (id, questionsData) => {
    const response = await api.post(`/contests/${id}/questions`, { questions: questionsData });
    return response.data;
  },

  // Get contest questions
  getContestQuestions: async (id) => {
    const response = await api.get(`/contests/${id}/questions`);
    return response.data;
  },

  // Join contest (Student only)
  joinContest: async (id) => {
    const response = await api.post(`/contests/${id}/join`);
    return response.data;
  },

  // Start contest (Student only)
  startContest: async (id) => {
    const response = await api.post(`/contests/${id}/start`);
    return response.data;
  },

  // Complete contest (Student only)
  completeContest: async (id) => {
    const response = await api.post(`/contests/${id}/complete`);
    return response.data;
  },

  // Get contest participants (Teacher only)
  getContestParticipants: async (id) => {
    const response = await api.get(`/contests/${id}/participants`);
    return response.data;
  },

  // Submit contest answer (Student only)
  submitContestAnswer: async (contestId, questionId, submissionData) => {
    const response = await api.post(`/contests/${contestId}/questions/${questionId}/submit`, submissionData);
    return response.data;
  },

  // Get contest submissions (Teacher only)
  getContestSubmissions: async (contestId, params = {}) => {
    const response = await api.get(`/contests/${contestId}/submissions`, { params });
    return response.data;
  },

  // Update contest submission (AI feedback)
  updateContestSubmission: async (id, updateData) => {
    const response = await api.put(`/contests/submissions/${id}`, updateData);
    return response.data;
  },
};
