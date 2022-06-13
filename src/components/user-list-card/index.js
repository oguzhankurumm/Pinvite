import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { getUserData } from '../../helpers';
import { Divider } from 'react-native-paper';
import { gray, green } from '../../assets/colors';
import { Icon } from 'react-native-eva-icons';

const UserListCard = ({ user, onUserSelect, selectedUsers, mode }) => {
    const [userInfo, setUserInfo] = useState([]);
    let isUserSelected = mode === 'single' ? selectedUsers._id === user._id : selectedUsers.some(selectedUser => selectedUser._id === user._id);

    useEffect(() => {
        const fetchUser = async function fetchUser() {
            const getUserInfo = await getUserData(user._id);
            setUserInfo(getUserInfo);
        }
        fetchUser();
    }, [user]);

    return (
        <Pressable onPress={() => onUserSelect(userInfo)} style={styles.container}>
            <FastImage
                style={styles.image}
                source={userInfo.image ? { uri: userInfo.image } : defaultAvatar}
                resizeMode="cover"
            />
            {isUserSelected &&
                <Icon name="checkmark-circle-2" height={18} width={18} fill={green} style={{ position: 'absolute', right: -6, bottom: -25 }} />
            }
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{userInfo.name || "Loading..."}</Text>
                <Divider style={{ backgroundColor: gray, height: 1 }} />
            </View>
        </Pressable>
    )
}
export default UserListCard;