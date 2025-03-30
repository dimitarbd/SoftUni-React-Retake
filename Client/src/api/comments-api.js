import requester from "./requester";

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (partId, email, text, rating, currentDate) => requester.post(BASE_URL, { partId, email, text, rating, currentDate });

const getAll = (partId) => {
    const query = new URLSearchParams({
        where: `partId="${partId}"`,
    }).toString();
   
   return requester.get(`${BASE_URL}?${query}`);

}

const commentsAPI = {
    create,
    getAll
};

export default commentsAPI;