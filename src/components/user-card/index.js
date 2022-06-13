import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { gradient1, gradient2 } from '../../assets/colors';
import styles from './style';
import { followUser, unfollowUser } from '../../redux/actions/user';
import { useNavigation } from '@react-navigation/native';
import defaultAvatar from '../../assets/images/defaultAvatar.png';

const UserCard = ({ user }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { followings } = useSelector(state => state.userReducer);
    const { currentUser } = useSelector(state => state.authReducer);
    const [Followed, setFollowed] = useState(followings.some(following => following._id === user._id));
    const userAvatar = user.image ? { uri: user.image } : defaultAvatar;

    const followFunction = () => {
        if (Followed === false) {
            dispatch(followUser({ id: user._id, userId: currentUser._id }));
        } else {
            dispatch(unfollowUser({ id: user._id, userId: currentUser._id }));
        }
    }

    const seeProfile = () => navigation.navigate('UserProfile', { user });

    return (
        <View style={styles.container}>
            <Pressable onPress={seeProfile}>
                <FastImage
                    style={styles.image}
                    source={userAvatar}
                    resizeMode="cover"
                />
            </Pressable>
            <Text style={styles.name}>{user.name}</Text>
            <TouchableOpacity onPress={followFunction}>
                <LinearGradient
                    colors={[gradient1, gradient2]}
                    style={styles.followButton}
                    start={{ x: -0.9, y: 0.2 }}
                    end={{ x: 0.45, y: 1.0 }}
                >
                    <Text style={styles.followButtonText}>{Followed ? "Unfollow" : "Follow"}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
export default UserCard;