import requester from "./requester";

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (partId, text, rating, currentDate) => requester.post(BASE_URL, { partId, text, rating, currentDate });

const getAll = (partId) => {
    const query = new URLSearchParams({
        where: `partId="${partId}"`,
        load: `author=_ownerId:users`,
    });
   
   return requester.get(`${BASE_URL}?${query.toString()}`);

}

const commentsAPI = {
    create,
    getAll
};

export default commentsAPI;