import axios from "axios";

const X_AUTH_TOKEN = 'aa2e9e999c5e41c160919cb26571faf1';
const BASE_URL = 'https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com/prod/users';

export const getStart = async (n) => {
    const res = await axios({
        method: 'POST',
        url: BASE_URL + '/start',
        data: {
            problem: n,
        },
        headers: {'X-Auth-Token':X_AUTH_TOKEN, 'Content-Type': 'application/json'},
    });
    return res.data.auth_key;
}

export const getLocations = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/locations',
        headers: {'Authorization':auth_key, 'Content-Type': 'application/json'},
    });
    return res.data.locations;
}

export const getTrucks = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/trucks',
        headers: {'Authorization':auth_key, 'Content-Type': 'application/json'},
    });
    return res.data.trucks;
}

export const putSimulate = async (auth_key, commands) => {
    const res = await axios({
        method: 'PUT',
        url: BASE_URL + '/simulate',
        headers: {'Authorization':auth_key, 'Content-Type': 'application/json'},
        data: {
            commands: commands
        }
    })
    return res.data;
}

export const getScore = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/score',
        headers: {'Authorization':auth_key, 'Content-Type': 'application/json'},
    });
    return res.data.score;
}