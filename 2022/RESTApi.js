import axios from "axios";

const X_AUTH_TOKEN = '70a764b2946bdc714ed5d82619ad6c97';
const BASE_URL = 'https://huqeyhi95c.execute-api.ap-northeast-2.amazonaws.com/prod';

export const getStart = async (n) => {
    const res = await axios({
        method: 'POST',
        url: BASE_URL + '/start',
        data: {
            problem: n,
        },
        headers: {
            'X-Auth-Token': X_AUTH_TOKEN,
            'Content-Type': 'application/json',
        }
    });
    return res.data.auth_key;
}

export const getWaiting = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/waiting_line',
        headers: {
            'Authorization': auth_key,
            'Content-Type': 'application/json',
        }
    });
    return res.data.waiting_line;
}

export const getGameResult = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/game_result',
        headers: {
            'Authorization': auth_key,
            'Content-Type': 'application/json',
        }
    });
    return res.data.game_result;
}

export const getUserInfo = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/user_info',
        headers: {
            'Authorization': auth_key,
            'Content-Type': 'application/json',
        }
    });
    return res.data;
}

export const putMatch = async (auth_key, pairs) => {
    const res = await axios({
        method: 'PUT',
        url: BASE_URL + '/match',
        headers: {
            'Authorization': auth_key,
            'Content-Type': 'application/json',
        },
        data: {
            pairs: pairs
        }
    });
    return res.data;
}

export const putChange = async (auth_key, commands) => {
    const res = await axios({
        method: 'PUT',
        url: BASE_URL + '/change_grade',
        headers: {
            'Authorization': auth_key,
            'Content-Type': 'application/json',
        },
        data: {
            commands: commands
        }
    });
    return res.data;
}

export const getScore = async (auth_key) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/score',
        headers: {
            'Authorization': auth_key,
            'Content-Type': 'application/json',
        }
    });
    return res.data;
}