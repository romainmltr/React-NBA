export type Team = {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    divison: string;
    full_name: string;
    name: string;
}

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

export type HomeTeam = {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
}

export type VisitorTeam = {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
}

export type ArrayRating = {
    full_name: string
    score: number
}