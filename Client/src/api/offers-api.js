import requester from "./requester";

const BASE_URL = 'http://localhost:3030/data/parts';

export const getOffersByUserId = (userId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${userId}"`,
    });
    return requester.get(`${BASE_URL}?${query.toString()}`);
}; 