import {
    USER_STATE_CHANGE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CHANGE_PROFILE_PICTURE,
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    DELETE_ACCOUNT_START,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILED
} from "../constants/auth";

const initialState = {
    currentUser: null,
    loaded: false,
    changeLoading: false,
    message: '',
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
                loaded: action.loaded
            };
        case LOGOUT_START:
            return {
                ...state,
                loaded: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                loaded: true
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                currentUser: null,
                loaded: true
            };
        case LOGIN_START:
            return {
                ...state,
                loaded: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loaded: true,
                currentUser: action.currentUser
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loaded: true,
                currentUser: null,
                message: action.message
            }
        case REGISTER_START:
            return {
                ...state,
                loaded: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loaded: true,
                currentUser: action.currentUser
            };
        case REGISTER_FAILED:
            return {
                ...state,
                loaded: true,
                currentUser: null,
                message: action.message
            }
        case LOGOUT_START:
            return {
                ...state,
                loaded: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loaded: true,
                currentUser: null
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                loaded: true,
                message: action.message
            }
        case CHANGE_PROFILE_PICTURE:
            return {
                ...state,
                changeLoading: true,
                currentUser: {
                    ...state.currentUser,
                    image: action.avatar
                }
            }
        case UPDATE_PROFILE_START:
            return {
                ...state,
                changeLoading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                changeLoading: false,
                currentUser: action.currentUser
            }
        case UPDATE_PROFILE_FAILED:
            return {
                ...state,
                changeLoading: false,
                message: action.message
            }
        case DELETE_ACCOUNT_START:
            return {
                ...state,
                changeLoading: true
            }
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                changeLoading: false,
                currentUser: null
            }
        case DELETE_ACCOUNT_FAILED:
            return {
                ...state,
                changeLoading: false,
                message: action.message
            }
        default:
            return state;
    }
};

export default auth;