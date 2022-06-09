import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '@env'

async function changeProfileImage(userId) {
    try {
        const picker = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1
        });

        const response = await axios.post(`${BASE_URL}/user/uploadAvatar`, {
            image: picker.data,
            userId
        });
        return response;
    } catch (error) {
        return error;
    }
}

async function getUserData(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/auth/getUserData?id=${userId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function checkUsername(username) {
    try {
        const response = await axios.get(`${BASE_URL}/auth/checkUsername?username=${username}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function getFollowings(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/user/getFollowings?id=${userId}`);
        if (response.status === 200) {
            return response.data.followings;
        } else {
            return [];
        }
    } catch (error) {
        return error;
    }
}


function intlFormat(num) {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}

function makeNumbersFriendly(num) {
    if (num >= 1000000)
        return intlFormat(num / 1000000) + 'M';
    if (num >= 1000)
        return intlFormat(num / 1000) + 'k';
    return intlFormat(num);
}

export {
    changeProfileImage,
    getUserData,
    checkUsername,
    getFollowings,
    makeNumbersFriendly
};