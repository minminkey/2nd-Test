import axios from "axios"

const BASE_URL = 'http://localhost:8000';

const USER_KEY = 'tester';

export const getStart = async (ID, NUM) => {
    const res = await axios({
        method: 'POST',
        url: BASE_URL + `/start/${USER_KEY}/${ID}/${NUM}`
    });
    return res.data.token
}

export const getOnCalls = async (token) => {
    const res = await axios({
        method: 'GET',
        url: BASE_URL + '/oncalls',
        headers: {
            'X-Auth-Token': token
        }
    });
    return res.data;
}

export const postAction = async (token, commands) => {
    const res = await axios({
        method: 'POST',
        url: BASE_URL + '/action',
        headers: {
            'X-Auth-Token': token,
            'Content-Type': 'application/json'
        },
        data: {
            commands: commands
        }
    });
    return res.data.is_end;
}