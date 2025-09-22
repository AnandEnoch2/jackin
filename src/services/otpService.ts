import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const otpService = {
  async sendOTP(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${API_URL}/otp/send`, { phoneNumber });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  },

  async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${API_URL}/otp/verify`, { phoneNumber, otp });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
  }
};