const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

  const request = async url => {
    try {
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw errorData;
        }
    } catch(e) {
        throw {
            message: e.message,
            status: e.status
        };
    }
};

const api = {
  fetchCats: async keyword => {
    const response = await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    response.data.map(async data => {
      const after =  await request(`${API_ENDPOINT}/api/cats/${data.id}`)
      // const after = await before.json();
      // console.log(after)
      data.origin = after.data.origin;
      data.temp = after.data.temperament;
    });
    return response;
  }
};
