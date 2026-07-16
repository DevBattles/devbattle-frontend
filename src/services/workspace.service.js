import api from "./api";

export const workspaceService = {
  // Create a new workspace project
  createProject: async (projectData) => {
    const response = await api.post("/workspace/projects", projectData);
    return response.data;
  },

  // Get project by ID
  getProjectById: async (id) => {
    const response = await api.get(`/workspace/projects/${id}`);
    return response.data;
  },

  // Get user's projects
  getUserProjects: async (params = {}) => {
    const response = await api.get("/workspace/projects", { params });
    return response.data;
  },

  // Get or create project for a specific context
  getOrCreateProject: async (contextData) => {
    const response = await api.post("/workspace/projects/get-or-create", contextData);
    return response.data;
  },

  // Update project
  updateProject: async (id, updateData) => {
    const response = await api.put(`/workspace/projects/${id}`, updateData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id) => {
    const response = await api.delete(`/workspace/projects/${id}`);
    return response.data;
  },

  // Update auto-save timestamp
  updateAutoSave: async (projectId) => {
    const response = await api.post(`/workspace/projects/${projectId}/auto-save`);
    return response.data;
  },

  // Get files for a project
  getProjectFiles: async (projectId) => {
    const response = await api.get(`/workspace/projects/${projectId}/files`);
    return response.data;
  },

  // Create a new file in a project
  createFile: async (fileData) => {
    const response = await api.post("/workspace/files", fileData);
    return response.data;
  },

  // Get file by ID
  getFileById: async (id) => {
    const response = await api.get(`/workspace/files/${id}`);
    return response.data;
  },

  // Update file
  updateFile: async (id, updateData) => {
    const response = await api.put(`/workspace/files/${id}`, updateData);
    return response.data;
  },

  // Delete file
  deleteFile: async (id) => {
    const response = await api.delete(`/workspace/files/${id}`);
    return response.data;
  },
};
