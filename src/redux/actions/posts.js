import axios from 'axios';
import {
    GET_FOLLOWINGS_USER_POSTS_START,
    GET_FOLLOWINGS_USER_POSTS_SUCCESS,
    GET_FOLLOWINGS_USER_POSTS_FAILED,
    SET_INITIAL_PAGE
} from '../constants/posts';
import { BASE_URL } from '@env'

export const getFollowingUserPosts = followingUsers => async dispatch => {
    try {
        dispatch({ type: GET_FOLLOWINGS_USER_POSTS_START });
        const formattedFollowingUsers = followingUsers.map(user => user._id);
        const response = await axios.post(`${BASE_URL}/posts/getFollowingUserPosts`, formattedFollowingUsers );
        if (response.status === 200) {
            dispatch({ type: GET_FOLLOWINGS_USER_POSTS_SUCCESS, followingUserPosts: response.data.posts });
        } else {
            dispatch({ type: GET_FOLLOWINGS_USER_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        console.log('hata:', error);
        dispatch({ type: GET_FOLLOWINGS_USER_POSTS_FAILED, message: error });
    }
};

export const setInitialPage = page => async dispatch => {
    dispatch({ type: SET_INITIAL_PAGE, page });
}