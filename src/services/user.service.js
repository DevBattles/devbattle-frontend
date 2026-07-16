import api from "./api";

export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update current user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/users/me/profile", profileData);
    return response.data;
  },

  // Update current user settings
  updateSettings: async (settingsData) => {
    const response = await api.put("/users/me/settings", settingsData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post("/users/me/change-password", passwordData);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post("/users/me/avatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await api.delete("/users/me");
    return response.data;
  },
};
