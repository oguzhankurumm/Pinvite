import {
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
    RESET_FOLLOWINGS_AND_FOLLOWERS,
} from "../constants/user";

const initialState = {
    followers: [],
    followings: [],
    mostFollowedUsers: [],
    loaded: false,
    message: '',
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case RESET_FOLLOWINGS_AND_FOLLOWERS:
            return {
                ...state,
                followers: [],
                followings: [],
                loaded: true,
                message: '',
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
            console.log('user', action.user);
            console.log('defaultusers', state.followings);
            const newFollowings = [...state.followings, action.user];
            console.log({ newFollowings })
            return {
                ...state,
                loaded: true,
                followings: newFollowings
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
                followings: filterFollowings,
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