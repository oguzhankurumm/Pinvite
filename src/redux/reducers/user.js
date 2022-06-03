import {
    GET_MY_POSTS_START,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILED,
    FOLLOW_USER_START,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILED,
    UNFOLLOW_USER_START,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILED,
    GET_FOLLOWERS_START,
    GET_FOLLOWERS_SUCCESS,
    GET_FOLLOWERS_FAILED,
    GET_FOLLOWINGS_START,
    GET_FOLLOWINGS_SUCCESS,
    GET_FOLLOWINGS_FAILED,
    SET_FOLLOWINGS,
    GET_MOST_FOLLOWED_USERS_START,
    GET_MOST_FOLLOWED_USERS_SUCCESS,
    GET_MOST_FOLLOWED_USERS_FAILED,
} from "../constants/user";

const initialState = {
    posts: [],
    followers: [],
    followings: [],
    mostFollowedUsers: [],
    loaded: false,
    message: '',
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_POSTS_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case GET_MY_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts,
                loaded: true,
                message: '',
            }
        case GET_MY_POSTS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message,
            }
        case GET_FOLLOWERS_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case GET_FOLLOWERS_SUCCESS:
            return {
                ...state,
                followers: action.followers,
                loaded: true,
                message: '',
            }
        case GET_FOLLOWERS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message,
            }
        case GET_FOLLOWINGS_START:
            return {
                ...state,
                loaded: false,
                message: '',
            }
        case GET_FOLLOWINGS_SUCCESS:
            return {
                ...state,
                followings: action.followings,
                loaded: true,
                message: '',
            }
        case GET_FOLLOWINGS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message,
            }
        case SET_FOLLOWINGS:
            return {
                ...state,
                followings: action.followings,
            }
        case FOLLOW_USER_START:
            return {
                ...state,
                loaded: false
            };
        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                loaded: true,
                followers: state.followers.concat(action.user),
            };
        case FOLLOW_USER_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message
            };
        case UNFOLLOW_USER_START:
            return {
                ...state,
                loaded: false
            };
        case UNFOLLOW_USER_SUCCESS:
            let filterFollowings = state.followings.filter(following => following._id !== action.selectedId);
            console.log({ filterFollowings, fls: state.followings, selectedId: action.selectedIid });
            return {
                ...state,
                loaded: true,
                followers: filterFollowings,
            };
        case UNFOLLOW_USER_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message
            };
        case GET_MOST_FOLLOWED_USERS_START:
            return {
                ...state,
                loaded: false
            };
        case GET_MOST_FOLLOWED_USERS_SUCCESS:
            return {
                ...state,
                loaded: true,
                mostFollowedUsers: action.mostFollowedUsers,
            };
        case GET_MOST_FOLLOWED_USERS_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message
            };
        default:
            return state;
    }
};

export default user;