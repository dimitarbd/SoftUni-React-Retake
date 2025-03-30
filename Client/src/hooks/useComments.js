import commentsAPI from "../api/comments-api";

export default function useCreateComment(partId, email, text, rating, currentDate) {
    const createHandler = (partId, text, rating, currentDate) => {
        commentsAPI.create(partId, text, rating, currentDate)
            .then((response) => {
                console.log("Comment created successfully:", response);
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
            });
    }
    return createHandler;
}