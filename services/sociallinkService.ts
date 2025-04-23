// src/services/sociallinkService.ts
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL + '/sociallink';

export const updateSocialLink = async (
  from: string,
  to: string,
  type: string,
  delta: number,
  memory?: string
) => {
  return axios.post(`${API_URL}/update`, {
    from,
    to,
    type,
    delta,
    memory
  });
};

export const getSocialLinks = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
