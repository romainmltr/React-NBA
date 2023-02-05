import axios from 'axios';


/* Creating a new axios instance with a baseURL. */
let instance: any = null
updateAxiosInstance()

/**
 * It returns a promise that resolves to an array of players.
 * @returns An array of objects.
 */
export async function getPlayers() {
    const response = await instance.get('?per_page=100');
    return response.data;
}

/**
 * This function updates the axios instance with a new baseURL.
 * @param {number} currentPlayer - number - The id of the player you want to get.
 * @returns the axios instance with a new baseURL.
 */
export async function getPlayerById(currentPlayer: number) {
    const response = await instance.get(`/${currentPlayer}`);
    return response.data;
}


/**
 * This function updates the axios instance with a new baseURL.
 */
export async function updateAxiosInstance() {
    instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/players',
    });
}