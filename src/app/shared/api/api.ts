import {environment} from "../../../environments/environment.ts";

const BASE_URL = "https://api.football-data.org/v4";

export const apiFetch = async <T>(url: string): Promise<T> => {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: {
            "X-Auth-Token": environment.apiKey
        },
    });
    console.log('Запрос отправлен')
    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(errorBody || `HTTP error ${res.status}`);
    }

    return res.json();
};