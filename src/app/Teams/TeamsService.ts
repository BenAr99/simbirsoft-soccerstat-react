import {environment} from "../../environments/environment.ts";
import type {Team, TeamsResponse} from "../../types/teams.contract.ts";

export const getTeams = async (): Promise<Team[]> => {
    const res = await fetch(
        "https://api.football-data.org/v4/teams",
        {
            headers: {
                "X-Auth-Token": environment.apiKey,
            },
        }
    );

    const data: TeamsResponse = await res.json();

    return data.teams;
};