import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { gradient1, gradient2 } from '../../assets/colors';
import styles from './style';
import { makeNumbersFriendly } from '../../helpers';

const ProfileDetails = ({ userId, name, username, image, bio, followersCount, followingCount }) => {
    const navigation = useNavigation();
    const { currentUser } = useSelector(state => state.authReducer);
    const isCurrentUser = currentUser._id === userId;
    const { following } = useSelector(state => state.userReducer);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image style={styles.image} source={image} />
                <View style={styles.rightContainer}>
                    <View style={styles.rightOne}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.username}>@{username}</Text>
                        {isCurrentUser ?
                            <Pressable
                                onPress={() => navigation.navigate('EditProfile')}
                                style={styles.editProfileButton}
                            >
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </Pressable>
                            :
                            <Pressable>
                                <LinearGradient
                                    colors={[gradient1, gradient2]}
                                    style={styles.followButton}
                                    start={{ x: -0.9, y: 0.2 }}
                                    end={{ x: 0.45, y: 1.0 }}
                                >
                                    <Text style={styles.followButtonText}>{following.find(id => id._id === userId) ? "Unfollow" : "Follow"}</Text>
                                </LinearGradient>
                            </Pressable>
                        }
                    </View>
                    <View style={styles.rightTwo}>
                        <View styles={styles.followContainer}>
                            <Text style={styles.followCountText}>{makeNumbersFriendly(followersCount)}</Text>
                            <Text style={styles.followText}>Followers</Text>
                        </View>
                        <View styles={styles.followContainer}>
                            <Text style={styles.followCountText}>{makeNumbersFriendly(followingCount)}</Text>
                            <Text style={styles.followText}>Following</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>{bio ? bio : ""}</Text>
            </View>
        </View>
    )
}

export default ProfileDetails;