import axios from 'axios';

/* Creating an instance of axios and then calling the updateAxiosInstance function. */
let instance: any = null
updateAxiosInstance()

/**
 * Get all users from mongodb
 * @returns An array of objects.
 */
export async function getTeams() {
    const response = await instance.get('?per_page=100');
    return response.data;
}

/**
 * This function creates a new axios instance with a new baseURL and assigns it to the instance
 * variable.
 */
export async function updateAxiosInstance() {
    instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/teams',
    });
}