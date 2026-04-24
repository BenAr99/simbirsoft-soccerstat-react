import {environment} from "../../../environments/environment.ts";

const BASE_URL = "https://api.football-data.org/v4";

export async function apiFetch(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "X-Auth-Token": environment.apiKey,
        }
    })

    if (!response.ok) {
        throw new Error("API error");
    }

    return response.json()
}