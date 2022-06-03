import { combineReducers } from "redux";
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    postsReducer
})

export default rootReducer;