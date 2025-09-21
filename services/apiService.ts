import { User, UserAuthResponse } from '../types';

const API_BASE_URL = 'http://localhost:5001/api';

const handleResponse = async (response: Response) => {
    // Check if the response is JSON before trying to parse it
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    }

    if (!response.ok) {
        // Use the message from the backend JSON error response, or create a default
        const message = data?.message || `HTTP error! status: ${response.status}`;
        const error = new Error(message);
        throw error;
    }
    
    return data;
};

export const signup = async (userData: any): Promise<UserAuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const login = async (credentials: any): Promise<UserAuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

export const getProfile = async (): Promise<User> => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error('No authentication token found.');
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};

export const updateProfile = async (profileData: Partial<User>): Promise<UserAuthResponse> => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error('No authentication token found.');
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    });
    return handleResponse(response);
};

export const sendContactMessage = async (contactData: { name: string; email: string; message: string }): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    });
    return handleResponse(response);
};