import { combineReducers } from "redux";
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';
import modalReducer from './reducers/modal';
import chatReducer from './reducers/chat';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    postsReducer,
    modalReducer,
    chatReducer
})

export default rootReducer;