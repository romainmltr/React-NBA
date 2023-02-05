import { Team } from './TeamType';

/**
 * A Player is an object with a number id, a string first_name, a string last_name, a number
 * height_feet, a number height_inches, a string position, a Team team, and a number weight_pounds.
 * @property {number} id - The player's unique ID.
 * @property {string} first_name - The player's first name.
 * @property {string} last_name - string;
 * @property {number} height_feet - number;
 * @property {number} height_inches - number;
 * @property {string} position - The position of the player.
 * @property {Team} team - Team;
 * @property {number} weight_pounds - number;
 */
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