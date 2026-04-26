const BASE_URL = "https://api.football-data.org/v4";
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const apiFetch = async <T>(url: string): Promise<T> => {
    const res = await fetch(`${corsProxyUrl}${BASE_URL}${url}`, {
        headers: {
            "X-Auth-Token": import.meta.env.VITE_API_KEY
        },
    });
    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);

        const message =
            errorBody?.message ||
            `HTTP error ${res.status}`;

        throw new Error(message);
    }

    return res.json();
};