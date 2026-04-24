import {environment} from "../../environments/environment.ts";
import type {League, LeaguesResponse} from "../../types/leagues.contract.ts";

export const getLeagues = async (): Promise<League[]> => {
    const res = await fetch(
        "https://api.football-data.org/v4/competitions",
        {
            headers: {
                "X-Auth-Token": environment.apiKey,
            },
        }
    );

    const data: LeaguesResponse = await res.json();

    return data.competitions;
};