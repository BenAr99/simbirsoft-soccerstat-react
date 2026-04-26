const BASE_URL = "https://api.football-data.org/v4";
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const apiFetch = async <T>(url: string): Promise<T> => {
    const res = await fetch(`${corsProxyUrl}${BASE_URL}${url}`, {
        headers: {
            "X-Auth-Token": import.meta.env.VITE_API_KEY
        },
    });
    console.log('Запрос отправлен')
    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(errorBody || `HTTP error ${res.status}`);
    }

    return res.json();
};