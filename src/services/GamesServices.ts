// create a new user in the jsonbin.io database
import axios from 'axios';

// Définition de l'instance d'Axios
let instance: any = null
updateAxiosInstance()

export async function getGames(currentPage: any, itemsPerPage: any) {
    const response = await instance.get(`?page=${currentPage}&per_page=${itemsPerPage}`);
    return response.data;
}

export async function getGamesByTeam(currentPage: any, itemsPerPage: any, currentTeam: any) {
    const response = await instance.get(`?page=${currentPage}&per_page=${itemsPerPage}&team_ids[]=${currentTeam}`);
    return response.data;
}
// Mise à jour de l'instance d'Axios
export async function updateAxiosInstance() {
    instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/games'
    });
}