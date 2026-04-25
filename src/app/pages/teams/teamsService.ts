import type {Team, TeamMatchesResponse, TeamsResponse} from "../../../types/teams.contract.ts";
import {apiFetch} from "../../shared/api/api.ts";
import type {MatchCalendar} from "../calendar/calendar.contract.ts";

export const getTeams = async (): Promise<Team[]> => {
    const response: TeamsResponse = await apiFetch(`/teams`);
    return response.teams;
}

export const getTeam = async (id: string): Promise<Team> => {
    return apiFetch<Team>(`/teams/${id}`);
};

export const getMatchesTeam = async (
    id: string,
    startDate: Date | null,
    endDate: Date | null
): Promise<MatchCalendar> => {
    const startDateParam = startDate
        ? `&dateFrom=${startDate.toISOString().split("T")[0]}`
        : "";

    const endDateParam = endDate
        ? `&dateTo=${endDate.toISOString().split("T")[0]}`
        : "";

    const [matches, team] = await Promise.all([
        apiFetch<TeamMatchesResponse>(
            `/teams/${id}/matches?${startDateParam}${endDateParam}`
        ),
        getTeam(id),
    ]);

    return {
        name: team.name,
        matches: matches.matches.map((match) => ({
            date: match.utcDate,
            status: match.status,
            home: {
                name: match.homeTeam.name,
                fullTimeScore: match.score.fullTime?.home ?? undefined,
                halfTimeScore: match.score.halfTime?.home ?? undefined,
                penalties: match.score.penalties?.home ?? undefined,
            },
            away: {
                name: match.awayTeam.name,
                fullTimeScore: match.score.fullTime?.away ?? undefined,
                halfTimeScore: match.score.halfTime?.away ?? undefined,
                penalties: match.score.penalties?.away ?? undefined,
            },
        })),
    };
};