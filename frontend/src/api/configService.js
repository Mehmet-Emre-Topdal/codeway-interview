import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + 'config';

export const getConfigs = async (token) => {
  try {
    const response = await axios.get(`${API_URL}?client=web`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {

    throw new Error(error.response.data);
  }
};

export const addConfig = async (newConfig, token) => {
  try {
    const response = await axios.post(`${API_URL}`, newConfig, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {

    throw new Error(error.response.data);

  }
};

export const updateConfig = async (id, updatedConfig, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedConfig, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const deleteConfig = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
