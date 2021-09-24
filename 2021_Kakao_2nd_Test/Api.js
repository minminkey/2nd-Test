import axios from "axios";

const AUTH_TOKEN = 'a16bf5d765722829422aa054fdfa462e';
const BASE_URL = 'https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com/prod/users';

export const getStart = async () => {
    const res = await axios({
        method: 'POST',
        url: BASE_URL + '/start',
        data:{
            prol
        }
    })
}