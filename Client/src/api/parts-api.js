import * as requester from './requester';

const BASE_URL = 'http://localhost:3030/data/parts'

export const getAll = async () => {
    const result = await requester.get(BASE_URL);    

    const parts = result.map((part) => {
        return {
            _id: part._id,
            name: part.name,
            description: part.description,
            imageUrl: part.imageUrl,
            price: part.price,
            ownerId: part.ownerId,
            createdAt: part.createdAt,
            rating: part.rating,
            category: part.category
        };
    }
    );
    return parts;
};

export const getOne = (partId) => requester.get(`${BASE_URL}/${partId}`);

export const create = (partData) => requester.post(BASE_URL, partData);

export const update = (partId, partData) => requester.put(`${BASE_URL}/${partId}`, partData);

export const del = (partId) => requester.del(`${BASE_URL}/${partId}`) 

const partsAPI = {
    getAll,
    getOne,
    create,
    update,
    del
};

export default partsAPI;

