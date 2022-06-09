import {
    GET_FOLLOWINGS_USER_POSTS_START,
    GET_FOLLOWINGS_USER_POSTS_SUCCESS,
    GET_FOLLOWINGS_USER_POSTS_FAILED,
    GET_LOCAL_POSTS_START,
    GET_LOCAL_POSTS_SUCCESS,
    GET_LOCAL_POSTS_FAILED,
} from "../constants/posts";

const initialState = {
    followingUserPosts: [],
    localPosts: [],
    loaded: false,
    message: '',
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWINGS_USER_POSTS_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case GET_FOLLOWINGS_USER_POSTS_SUCCESS:
            return {
                ...state,
                followingUserPosts: action.followingUserPosts,
                loaded: true,
                message: '',
            }
        case GET_FOLLOWINGS_USER_POSTS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message,
            }
        case GET_LOCAL_POSTS_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case GET_LOCAL_POSTS_SUCCESS:
            return {
                ...state,
                localPosts: action.localPosts,
                loaded: true,
                message: '',
            }
        case GET_LOCAL_POSTS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message,
            }
        default:
            return state;
    }
};

export default posts;