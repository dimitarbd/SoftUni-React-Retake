import { useEffect, useState } from "react";
import commentsAPI from "../api/comments-api";

export function useCreateComment() {
    const createHandler = (partId, text, rating, currentDate) => {
        commentsAPI.create(partId, text, rating, currentDate)
            .then((response) => {
                console.log("Comment created successfully:", response);
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
            });
    }
    return  createHandler;
}

export function useGetAllComments(partId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await commentsAPI.getAll(partId);
                setComments(response);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        })();
    }, [partId]);
    console.log(comments);

    return [comments, setComments];

}

export function useDeleteComment(commentId) {
    const deleteHandler = (commentId) => {
        commentsAPI.delete(commentId)
            .then((response) => {
                console.log("Comment deleted successfully:", response);
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            });
    }
    return deleteHandler;
}
export function useUpdateComment(commentId, text, rating) {
    const updateHandler = (commentId, text, rating) => {
        commentsAPI.update(commentId, text, rating)
            .then((response) => {
                console.log("Comment updated successfully:", response);
            })
            .catch((error) => {
                console.error("Error updating comment:", error);
            });
    }
    return updateHandler;
}
export function useGetComment(commentId) {
    const getHandler = (commentId) => {
        commentsAPI.getComment(commentId)
            .then((response) => {
                console.log("Comment fetched successfully:", response);
            })
            .catch((error) => {
                console.error("Error fetching comment:", error);
            });
    }
    return getHandler;
}