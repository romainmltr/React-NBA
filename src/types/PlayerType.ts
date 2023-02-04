import { Team } from './TeamType';

export type Player = {
    id: number;
    first_name: string;
    last_name: string;
    height_feet: number;
    height_inches: number;
    position: string;
    team: Team;
    weight_pounds: number;
}