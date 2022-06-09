import axios from 'axios';
import {
    GET_FOLLOWINGS_USER_POSTS_START,
    GET_FOLLOWINGS_USER_POSTS_SUCCESS,
    GET_FOLLOWINGS_USER_POSTS_FAILED,
    GET_LOCAL_POSTS_START,
    GET_LOCAL_POSTS_SUCCESS,
    GET_LOCAL_POSTS_FAILED,
} from '../constants/posts';
import { BASE_URL } from '@env'

export const getFollowingUserPosts = followingUsers => async dispatch => {
    try {
        dispatch({ type: GET_FOLLOWINGS_USER_POSTS_START });
        const formattedFollowingUsers = followingUsers.map(user => user._id);
        const response = await axios.post(`${BASE_URL}/posts/getFollowingUserPosts`, formattedFollowingUsers);
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

export const getLocalPost = location => async dispatch => {
    try {
        dispatch({ type: GET_LOCAL_POSTS_START });
        const response = await axios.post(`${BASE_URL}/posts/getNearestPostsByLocation`, location);
        if (response.status === 200) {
            dispatch({ type: GET_LOCAL_POSTS_SUCCESS, localPosts: response.data.posts });
        } else {
            dispatch({ type: GET_LOCAL_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        console.log('get local error:', error);
        dispatch({ type: GET_LOCAL_POSTS_FAILED, message: error });
    }
};


export const likePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/likePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('like error:', error);
    }
}

export const unlikePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/unlikePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('unlike error:', error);
    }
}

export const savePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/savePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('save error:', error);
    }
}

export const unsavePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/unsavePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('unsave error:', error);
    }
}