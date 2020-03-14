import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    UPDATE_REPORTS,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_LIKES_COMMENT,
    UPDATE_REPORTS_COMMENT
} from './types';

//GET posts by date 
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
/*faire le type GET_POSTS_BY_LIKE, faire dans posts back end
 ordering by like faire le reducer mettre la function dans le front et voila */

// GET posts by like
export const getPostsByLikes = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts/filteredbylikes');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'error getting posts by like', status: '404'}
        });
    }
} 

//GET post
export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'error get post', status: '404' }
        });
    }
};

//ADD Like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//REMOVE Like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'error removeLike', status: '404' }
        });
    }
};

//ADD Report
export const addReport = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/report/${postId}`);
        dispatch({
            type: UPDATE_REPORTS,
            payload: { postId, reports: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'error report', status: '404' }
        });
    }
};

//REMOVE Report
export const removeReport = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unreport/${postId}`);
        dispatch({
            type: UPDATE_REPORTS,
            payload: { postId, reports: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'error removeReport', status: '404' }
        });
    }
};


//DELETE post
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//ADD post
export const addPost = (FormData, history, edit = false) => async dispatch => {
    
    try {
        const config = {
            heards: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/posts/', FormData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Post Updated' : 'Post Added', 'success'));
        if(!edit) {
            history.push('/posts');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//ADD comment
export const addComment = (postId, FormData) => async dispatch => {
    
    try {
        const config = {
            heards: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/posts/comment/${postId}`, FormData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert( 'Comment Added', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//DELETE post
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//ADD Like Comment
export const addLikeComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/like/${postId}/${commentId}`);
        dispatch({
            type: UPDATE_LIKES_COMMENT,
            payload: { commentId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'addLikeComment error', status: '404' }
        });
    }
};

//REMOVE Like Comment
export const removeLikeComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/unlike/${postId}/${commentId}`);
        dispatch({
            type: UPDATE_LIKES_COMMENT,
            payload: { commentId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'removeLikeComment error', status: '404' }
        });
    }
};

//ADD report Comment
export const addReportComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/report/${postId}/${commentId}`);
        dispatch({
            type: UPDATE_REPORTS_COMMENT,
            payload: { commentId, reports: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'addReportComment error', status: '404' }
        });
    }
};

//REMOVE Report Comment
export const removeReportComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/unreport/${postId}/${commentId}`);
        dispatch({
            type: UPDATE_REPORTS_COMMENT,
            payload: { commentId, reports: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: 'removeReportComment error', status: '404' }
        });
    }
};

