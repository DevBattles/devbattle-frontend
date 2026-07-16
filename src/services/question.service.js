import api from "./api";

export const questionService = {
  // Get all questions with filters
  getAllQuestions: async (params = {}) => {
    const response = await api.get("/questions", { params });
    return response.data;
  },

  // Get question by ID
  getQuestionById: async (id) => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  // Create question (Teacher only)
  createQuestion: async (questionData) => {
    const response = await api.post("/questions", questionData);
    return response.data;
  },

  // Update question (Teacher only)
  updateQuestion: async (id, questionData) => {
    const response = await api.put(`/questions/${id}`, questionData);
    return response.data;
  },

  // Delete question (Teacher only)
  deleteQuestion: async (id) => {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
  },

  // Publish question (Teacher only)
  publishQuestion: async (id) => {
    const response = await api.post(`/questions/${id}/publish`);
    return response.data;
  },

  // Unpublish question (Teacher only)
  unpublishQuestion: async (id) => {
    const response = await api.post(`/questions/${id}/unpublish`);
    return response.data;
  },

  // Search questions
  searchQuestions: async (searchTerm, params = {}) => {
    const response = await api.get(`/questions/search/${searchTerm}`, { params });
    return response.data;
  },

  // Get teacher's questions (Teacher only)
  getMyQuestions: async (params = {}) => {
    const response = await api.get("/questions/my-questions", { params });
    return response.data;
  },

  // Get user's progress on a question
  getQuestionProgress: async (questionId) => {
    const response = await api.get(`/questions/${questionId}/progress`);
    return response.data;
  },

  // Update user's progress on a question
  updateQuestionProgress: async (questionId, progressData) => {
    const response = await api.put(`/questions/${questionId}/progress`, progressData);
    return response.data;
  },
};
