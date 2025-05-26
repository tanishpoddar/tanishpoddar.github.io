import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? 'https://tanishpoddar.github.io/api' 
  : '/api';

export const sendContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
    throw error;
  }
}; 