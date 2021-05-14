const API_OPEN_URL = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
    try{
        const res = await fetch(`${API_OPEN_URL}/${nodeId ? nodeId : ''}`);
        if(!res.ok){
            throw new Error('서버가 이상합니다.');
        }
        return res.json();
    } catch(e) {
        console.log(e.message);
    }
}