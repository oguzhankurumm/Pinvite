import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { getUserData } from '../../helpers';
import { Divider } from 'react-native-paper';
import { gray } from '../../assets/colors';
import { navigate } from '../../helpers/navigationService';

const ContactsUserCard = ({ user, statusTitle }) => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchUser = async function fetchUser() {
            const getUserInfo = await getUserData(user._id);
            setUserInfo(getUserInfo);
        }
        fetchUser();
    }, [user]);

    return (
        <Pressable onPress={() => navigate('UserProfile', { user: userInfo })} style={styles.container}>
            <FastImage
                style={styles.image}
                source={userInfo.image ? { uri: userInfo.image } : defaultAvatar}
                resizeMode="cover"
            />
            <View style={styles.nameContainer}>
                <View style={styles.names}>
                    <Text style={styles.name}>{userInfo.name}</Text>
                    <View style={styles.button}>
                        <Text style={styles.name}>{statusTitle}</Text>
                    </View>
                </View>
                <Divider style={{ backgroundColor: gray, height: 1 }} />
            </View>
        </Pressable>
    )
}
export default ContactsUserCard;