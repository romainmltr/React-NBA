/**
 * A Team is an object with a number id, a string abbreviation, a string city, a string conference, a
 * string divison, a string full_name, and a string name.
 * </code>
 * @property {number} id - The unique ID of the team.
 * @property {string} abbreviation - The three-letter abbreviation for the team.
 * @property {string} city - The city of the team.
 * @property {string} conference - "Eastern"
 * @property {string} divison - string;
 * @property {string} full_name - "New York Knicks"
 * @property {string} name - The name of the team.
 */
export type Team = {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    divison: string;
    full_name: string;
    name: string;
}

/**
 * Obj is an object with a bunch of properties, some of which are objects themselves.
 * @property {number} id - number
 * @property {string} date - "2019-10-22"
 * @property {HomeTeam} home_team - HomeTeam
 * @property {number} home_team_score - number
 * @property {number} period - 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
 * 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
 * @property {boolean} postseason - boolean
 * @property {number} season - number
 * @property {string} status - "Final"
 * @property {string} time - "7:00PM"
 * @property {VisitorTeam} visitor_team - {
 * @property {number} visitor_team_score - number
 */
export type Obj = {
    id: number
    date: string
    home_team: HomeTeam
    home_team_score: number
    period: number
    postseason: boolean
    season: number
    status: string
    time: string
    visitor_team: VisitorTeam
    visitor_team_score: number
}

/**
 * HomeTeam is an object with a number id, a string abbreviation, a string city, a string conference, a
 * string division, a string full_name, and a string name.
 * @property {number} id - number
 * @property {string} abbreviation - "ATL"
 * @property {string} city - "New York"
 * @property {string} conference - "Eastern"
 * @property {string} division - "Atlantic"
 * @property {string} full_name - "New York Knicks"
 * @property {string} name - "New York Knicks"
 */
export type HomeTeam = {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
}

/**
 * VisitorTeam is a type that has an id, abbreviation, city, conference, division, full_name, and name.
 * @property {number} id - number
 * @property {string} abbreviation - "BOS"
 * @property {string} city - The city of the team.
 * @property {string} conference - "Eastern"
 * @property {string} division - "Atlantic"
 * @property {string} full_name - "New York Knicks"
 * @property {string} name - "New York Knicks"
 */
export type VisitorTeam = {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
}

/**
 * An ArrayRating is an object with a full_name property that is a string and a score property that is
 * a number.
 * @property {string} full_name - The full name of the person
 * @property {number} score - number
 */
export type ArrayRating = {
    full_name: string
    score: number
}