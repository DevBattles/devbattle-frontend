import api from "./api";

export const certificateService = {
  // Get all certificates for current user
  getMyCertificates: async (params = {}) => {
    const response = await api.get("/certificates", { params });
    return response.data;
  },

  // Get certificate by ID
  getCertificateById: async (id) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },

  // Verify certificate by verification code
  verifyCertificate: async (verificationCode) => {
    const response = await api.post(`/certificates/verify`, { verificationCode });
    return response.data;
  },

  // Download certificate
  downloadCertificate: async (id) => {
    const response = await api.get(`/certificates/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Share certificate
  shareCertificate: async (id, shareData) => {
    const response = await api.post(`/certificates/${id}/share`, shareData);
    return response.data;
  },
};
