import type {
    League,
    LeaguesMatchesResponse,
    LeaguesResponse
} from "../../../types/leagues.contract.ts";

import type { MatchCalendar } from "../calendar/calendar.contract.ts";
import { apiFetch } from "../../shared/api/api.ts";


export const getLeagues = async (): Promise<League[]> => {
    const response: LeaguesResponse = await apiFetch("/competitions");
    return response.competitions;
};


export const getMatchesLeague = async (
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

    const response = await apiFetch<LeaguesMatchesResponse>(
        `/competitions/${id}/matches?${startDateParam}${endDateParam}`
    );

    return {
        name: response.competition.name,
        matches: response.matches.map((match) => ({
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