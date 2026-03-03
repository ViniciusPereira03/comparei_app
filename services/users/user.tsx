// services/users/users.ts
import { apiRequest, SERVICES_URL } from '../api';

const BASE_URL = SERVICES_URL.USERS;

// --- Autenticação ---

export interface LoginResponse {
    id: string;
    token: string;
}

export const loginUser = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>(
        BASE_URL,
        '/login',
        'POST',
        { username, password }
    );
};

export const registerUser = async (
    name: string,
    username: string,
    email: string,
    password: string
) => {
    return apiRequest(
        BASE_URL,
        '/user',
        'POST',
        {
            name,
            username,
            email,
            password,
        }
    );
};

// --- Dados do Usuário ---

export const getUser = async (id: string) => {
    return apiRequest(
        BASE_URL,
        `/user/${id}`,
        'GET'
    );
};

export const getRanking = async (id: string) => {
    return apiRequest(
        BASE_URL,
        `/users?order=ranking`,
        'GET'
    );
};

export const putDistanceRadius = async (
    ray_distance: number,
    userId: string
) => {
    return apiRequest(
        BASE_URL,
        `/user/${userId}`,
        'PUT',
        { ray_distance }
    );
};

// --- Upload de foto (placeholder) ---
export const uploadProfilePhoto = async (
    userId: string,
    imageUri: string
) => {
    console.log("uploadProfilePhoto: ", userId, imageUri)

    const formData = new FormData();

    formData.append('file', {
        uri: imageUri,
        name: 'profile.jpg',
        type: 'image/jpeg',
    } as any);

    const url = `${BASE_URL}/user/${userId}/photo`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            apiKey: process.env.EXPO_PUBLIC_API_KEY_USUARIO!,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Erro ao enviar foto');
    }

    return data; // { photo: "http://..." }
};
