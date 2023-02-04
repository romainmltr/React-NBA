// create a new user in the jsonbin.io database
import axios from 'axios';

// Définition de l'instance d'Axios
let instance: any = null
updateAxiosInstance()

export async function getTeams() {
    // get all users from mongodb
    const response = await instance.get('?per_page=100');
    return response.data;
}



// Mise à jour de l'instance d'Axios
export async function updateAxiosInstance() {
    instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/teams',
    });
}