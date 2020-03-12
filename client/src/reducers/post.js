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
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.postId ? { ...post, likes: payload.likes} : post
                ),
                loading: false
            };
        case UPDATE_REPORTS:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.postId ? { ...post, reports: payload.reports} : post
                ),
                loading: false
            };
        case UPDATE_LIKES_COMMENT:
            return {
                ...state,
                post: {
                  ...state.post,
                  comments: state.post.comments.map(comment =>
                    comment._id === payload.commentId
                      ? { ...comment, likes: payload.likes }
                      : comment
                  )
                },
                loading: false
            };
        case UPDATE_REPORTS_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(comment =>
                    comment._id === payload.commentId
                        ? { ...comment, reports: payload.reports }
                        : comment
                    )
                },
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            }
        case DELETE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
        default:
            return state;
    }
}