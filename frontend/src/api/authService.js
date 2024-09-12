import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}signIn`, {
        email,
        password,
        });
        
        return response.data.token;
    } catch (error) {
        throw new Error('Failed to sign in');
    }
    };

export const signOut = async (token) => {
    try {
        const response = await axios.post(`${API_URL}logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    }
    catch (error) {
    
        throw new Error('Failed to sign out');
    }
}
