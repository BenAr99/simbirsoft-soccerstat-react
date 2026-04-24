import type {Team, TeamsResponse} from "../../types/teams.contract.ts";
import {apiFetch} from "../shared/api/api.ts";

export const getTeams = async (): Promise<Team[]> => {
    const response: TeamsResponse = await apiFetch(`/teams`);
    return response.teams;
}