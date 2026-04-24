import type {Status} from "./status.ts";

export interface Team {
    crest: string;
    id: string;
    name: string;
}

export interface TeamsResponse {
    teams: Team[];
    count: number;
}

export interface TeamMatchesResponse {
    matches: [
        {
            homeTeam: {
                name: string;
            };
            awayTeam: {
                name: string;
            };
            utcDate: Date;
            penalties: number[];
            status: Status;
            score: {
                fullTime?: {
                    home?: number;
                    away?: number;
                };
                halfTime?: {
                    home?: number;
                    away?: number;
                };
                penalties?: {
                    home?: number;
                    away?: number;
                };
            };
        },
    ];
}