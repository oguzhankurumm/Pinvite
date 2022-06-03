import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { gradient1, gradient2 } from '../../assets/colors';
import styles from './style';
import { followUser, unfollowUser } from '../../redux/actions/user';
import { useNavigation } from '@react-navigation/native';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const UserCard = ({ user }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { followings } = useSelector(state => state.userReducer);
    const { currentUser } = useSelector(state => state.authReducer);
    const [Followed, setFollowed] = useState(followings.find(id => id._id === user._id) ? true : false);
    console.log(Followed)

    const followFunction = () => {
        if (Followed === false) {
            setFollowed(true);
            console.log('follow')
            dispatch(followUser({ id: user._id, userId: currentUser._id }));
        } else {
            setFollowed(false);
            console.log('unf')
            dispatch(unfollowUser({ id: user._id, userId: currentUser._id }));
        }
    }

    const seeProfile = () => {
        navigation.navigate('UserProfile', { user });
    }

    return (
        <View style={styles.container}>
                <Pressable onPress={seeProfile}>
                    <Image
                        style={styles.image}
                        source={{ uri: user.image }}
                        resizeMode="cover"
                    />
                </Pressable>
                <Text style={styles.name}>{user.name}</Text>
                <Pressable onPress={followFunction}>
                    <LinearGradient
                        colors={[gradient1, gradient2]}
                        style={styles.followButton}
                        start={{ x: -0.9, y: 0.2 }}
                        end={{ x: 0.45, y: 1.0 }}
                    >
                        <Text style={styles.followButtonText}>{Followed ? "Unfollow" : "Follow"}</Text>
                    </LinearGradient>
                </Pressable>
        </View>
    )
}
export default UserCard;