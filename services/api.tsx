// services/apiClient.ts

const BASE_URL = process.env.EXPO_PUBLIC_API_URL_BASE || 'http://localhost';

export const SERVICES_URL = {
    USERS: `${BASE_URL}:8080`,
    PROMER: `${BASE_URL}:8082`,
    LISTS: `${BASE_URL}:8083`,
    LOGS: `${BASE_URL}:8084`,
} as const;

type ServiceUrl = typeof SERVICES_URL[keyof typeof SERVICES_URL];
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const API_KEYS: Partial<Record<ServiceUrl, string | undefined>> = {
    [SERVICES_URL.USERS]: process.env.EXPO_PUBLIC_API_KEY_USUARIO,
    [SERVICES_URL.PROMER]: process.env.EXPO_PUBLIC_API_KEY_PROMER,
    [SERVICES_URL.LISTS]: process.env.EXPO_PUBLIC_API_KEY_LISTAS,
    [SERVICES_URL.LOGS]: process.env.EXPO_PUBLIC_API_KEY_LOGS,
};

export const apiRequest = async <TResponse = any, TBody = any>(
    baseUrl: ServiceUrl,
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: TBody,
    token?: string | null
): Promise<TResponse> => {
    const url = `${baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const apiKey = API_KEYS[baseUrl];
    if (apiKey) headers.apiKey = apiKey;

    if (token) headers.Authorization = `Bearer ${token}`;

    console.log('[apiRequest]', {
        url,
        method,
        body
    });


    const response = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {}

    if (!response.ok) {
        throw new Error(data?.message || data?.error || `Erro ${response.status}`);
    }

    return data as TResponse;
};
