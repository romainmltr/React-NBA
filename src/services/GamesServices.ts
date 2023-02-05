import axios from 'axios';


/* Creating an instance of axios and setting it to null. */
let instance: any = null
updateAxiosInstance()

/**
 * It's a function that takes two parameters, currentPage and itemsPerPage, and returns a promise that
 * resolves to an array of objects.
 * @param {any} currentPage - The page number you want to get.
 * @param {any} itemsPerPage - number of items per page
 * @returns An array of objects.
 */
export async function getGames(currentPage: any, itemsPerPage: any) {
    const response = await instance.get(`?page=${currentPage}&per_page=${itemsPerPage}`);
    return response.data;
}

/**
 * This function will return a promise that will resolve to an array of objects that contain the data I
 * want to display on the page.
 * @param {any} currentPage - the current page of the pagination
 * @param {any} itemsPerPage - number of items per page
 * @param {any} currentTeam - the team id
 * @returns The response.data is an array of objects.
 */
export async function getGamesByTeam(currentPage: any, itemsPerPage: any, currentTeam: any) {
    const response = await instance.get(`?page=${currentPage}&per_page=${itemsPerPage}&team_ids[]=${currentTeam}`);
    return response.data;
}

/**
 * This function creates a new axios instance with a new baseURL and assigns it to the instance
 * variable.
 */
export async function updateAxiosInstance() {
    instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1/games'
    });
}