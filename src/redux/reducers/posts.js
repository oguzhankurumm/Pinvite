import {
    GET_MY_POSTS_START,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILED,
    GET_FOLLOWINGS_USER_POSTS_START,
    GET_FOLLOWINGS_USER_POSTS_SUCCESS,
    GET_FOLLOWINGS_USER_POSTS_FAILED,
    GET_LOCAL_POSTS_START,
    GET_LOCAL_POSTS_SUCCESS,
    GET_LOCAL_POSTS_FAILED,
    UPLOAD_POST_START,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILED,
    RESET_POSTS,
} from "../constants/posts";

const initialState = {
    myPosts: [],
    followingUserPosts: [],
    localPosts: [],
    loaded: false,
    message: '',
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case RESET_POSTS:
            return {
                ...state,
                myPosts: [],
                followingUserPosts: [],
                localPosts: [],
                loaded: true,
                message: '',
            }
        case GET_MY_POSTS_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case GET_MY_POSTS_SUCCESS:
            return {
                ...state,
                myPosts: action.posts,
                loaded: true,
                message: '',
            }
        case GET_MY_POSTS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message,
            }
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
        case UPLOAD_POST_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case UPLOAD_POST_SUCCESS:
            return {
                ...state,
                myPosts: [action.post, ...state.myPosts],
                ...(action.post.location !== null ? { localPosts: [action.post, ...state.localPosts] } : { followingUserPosts: [action.post, ...state.followingUserPosts] }),
                loaded: true,
                message: '',
            }
        case UPLOAD_POST_FAILED:
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