import type {League, LeaguesResponse} from "../../types/leagues.contract.ts";
import {apiFetch} from "../shared/api/api.ts";

export const getLeagues = async (): Promise<League[]> => {
    const data: LeaguesResponse = await apiFetch('/competitions')
    return data.competitions;
};