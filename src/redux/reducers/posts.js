import {
    GET_FOLLOWINGS_USER_POSTS_START,
    GET_FOLLOWINGS_USER_POSTS_SUCCESS,
    GET_FOLLOWINGS_USER_POSTS_FAILED,
    SET_INITIAL_PAGE,
} from "../constants/posts";

const initialState = {
    followingUserPosts: [],
    localPosts: [],
    initialPage: 0,
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
        case SET_INITIAL_PAGE:
            return {
                ...state,
                initialPage: action.page,
            }
        default:
            return state;
    }
};

export default posts;