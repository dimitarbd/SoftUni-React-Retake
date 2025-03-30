import requester from "./requester";

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (partId, text, rating, currentDate) => requester.post(BASE_URL, { partId, text, rating, currentDate });

const getAll = async (partId) => {
    const query = new URLSearchParams({
        where: `partId="${partId}"`,
        load: `author=_ownerId:users`,
    }).toString();
   
   return await requester.get(`${BASE_URL}?${query}`);

}

const commentsAPI = {
    create,
    getAll
};

export default commentsAPI;