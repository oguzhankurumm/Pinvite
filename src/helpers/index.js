import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';
import { BASE_URL } from '@env'

async function changeProfileImage(userId) {
    try {
        const picker = await ImagePicker.openPicker({
            cropperCircleOverlay: true,
            freeStyleCropEnabled: true,
            avoidEmptySpaceAroundImage: true,
            cropperToolbarTitle: "Select Avatar",
            loadingLabelText: "Loading...",
            cropperChooseText: "Select",
            cropperCancelText: "Cancel",
            mediaType: "photo",
            cropping: true,
            includeBase64: true,
            width: 500,
            height: 500,
            compressImageQuality: 0.5,
            compressImageMaxHeight: 500,
            compressImageMaxWidth: 500
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

async function updateLocation(userId) {
    try {
        const getPosition = await Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                console.log({ latitude, longitude })
                return { latitude, longitude };
                // return axios.post(`${BASE_URL}/auth/updateLocation?id=${userId}`, {
                //     latitude,
                //     longitude
                // });
            },
            error => {
                return error;
            }
        );
        return getPosition;
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
    updateLocation,
    getUserData,
    checkUsername,
    getFollowings,
    makeNumbersFriendly
};