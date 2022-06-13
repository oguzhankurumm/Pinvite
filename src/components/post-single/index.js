import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image'
import styles from './style';
import moment from 'moment';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import SendRight from '../../assets/icons/Send_right.svg';
import ChatRight from '../../assets/icons/Chat_right.svg';
import InfoRight from '../../assets/icons/Info_right.svg';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import { likePost, unlikePost, savePost, unsavePost } from '../../redux/actions/posts';
import AnimatedLottieView from 'lottie-react-native';
import LoadingAnimation from '../../assets/animations/hourglass.json';
import { openCommentModal } from '../../redux/actions/modal';
import { navigate } from '../../helpers/navigationService';
import { gradient1, gradient2 } from '../../assets/colors';
import { followUser, unfollowUser } from '../../redux/actions/user';

const PostSingle = (props) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { caption, user, createdAt, likes, saves, _id, userId, type, media, thumbnail } = props.data;
    const { currentUser } = useSelector(state => state.authReducer);
    const avatar = 'https://pbs.twimg.com/profile_images/1223706175910211584/tmu8d9fA.jpg';
    const defaultThumbnail = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774';
    const dateDiff = moment.unix(createdAt).fromNow();
    const { followings } = useSelector(state => state.userReducer);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(likes?.includes(currentUser._id));
    const [saveStatus, setSaveStatus] = useState(saves?.includes(currentUser._id));
    const [isLoading, setisLoading] = useState(true);
    const [muted, setMuted] = useState(true);
    const [paused, setPaused] = useState(false);
    const [Followed, setFollowed] = useState(followings.some(following => following._id === user._id));

    const onPlayPause = async () => {
        setPaused(!paused);
        setMuted(!paused);
    }

    const showProfile = () => {
        navigate('UserProfile', { user });
    }

    const handleLike = () => {
        if (currentLikeStatus) {
            setCurrentLikeStatus(false);
            dispatch(unlikePost({ postId: _id, myUserId: currentUser._id, userId }));
        } else {
            setCurrentLikeStatus(true);
            dispatch(likePost({ postId: _id, myUserId: currentUser._id, userId }));
        }
    }

    const handleSave = () => {
        if (saveStatus) {
            setSaveStatus(false);
            dispatch(unsavePost({ postId: _id, myUserId: currentUser._id, userId }));
        } else {
            setSaveStatus(true);
            dispatch(savePost({ postId: _id, myUserId: currentUser._id, userId }));
        }
    }

    const handleSend = () => {
        alert('send');
    }

    const handleShowComments = () => {
        dispatch(openCommentModal(true, item));
    }

    const handleShowInfo = () => {
        alert('info')
    }

    const followFunction = () => {
        if (Followed === false) {
            dispatch(followUser({ id: user._id, userId: currentUser._id }));
        } else {
            dispatch(unfollowUser({ id: user._id, userId: currentUser._id }));
        }
    }

    const LoaderComponent = () => {
        return (
            <View style={[styles.container, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}>
                <AnimatedLottieView
                    source={LoadingAnimation}
                    style={{
                        width: '100%',
                        height: 150
                    }}
                    autoPlay
                    loop
                    speed={1}
                />
            </View>
        )
    }

    return (
        <Pressable style={styles.container}>
            {type === 'video' &&
                <View style={styles.video} >
                    {isLoading && <LoaderComponent />}
                    <Video
                        ref={ref}
                        source={{ uri: convertToProxyURL(media) }}
                        style={styles.video}
                        onReadyForDisplay={() => setisLoading(false)}
                        onLoadStart={() => setisLoading(true)}
                        onError={(e) => console.log('play error', e)}
                        repeat={true}
                        paused={paused}
                        poster={thumbnail ? thumbnail : defaultThumbnail}
                        posterResizeMode='cover'
                        resizeMode="cover"
                        playInBackground={false}
                        playWhenInactive={false}
                        muted={muted}
                    />

                    <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={['rgba(0,0,0,0.5)', 'transparent']}
                        style={styles.video}
                    />
                </View>
            }
            {type === 'image' &&
                <View style={styles.image}>
                    <FastImage
                        source={{ uri: media }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={['rgba(0,0,0,0.5)', 'transparent']}
                        style={styles.image}
                    />
                </View>
            }

            <View style={styles.uiContainer}>
                <View style={styles.rightContainer}>
                    <Pressable style={styles.iconRightContainer} onPress={handleShowInfo}>
                        <InfoRight height={42} width={42} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer} onPress={handleLike}>
                        <Icon name="heart" height={36} width={36} fill={currentLikeStatus === true ? "red" : "white"} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer} onPress={handleShowComments}>
                        <ChatRight height={44} width={44} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer} onPress={handleSend}>
                        <SendRight height={42} width={42} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer} onPress={handleSave}>
                        <Icon name="bookmark" height={38} width={38} fill={saveStatus === true ? "black" : "white"} />
                    </Pressable>
                </View>
                <View style={styles.bottomContainer}>
                    <Pressable onPress={showProfile}>
                        <FastImage
                            style={styles.avatar}
                            source={{ uri: user.image !== "" ? user.image : avatar }}
                            resizeMode="cover"
                        />
                    </Pressable>
                    <View style={styles.bottomSecond}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.username}>{user?.username}</Text>
                            {followings.find(id => id._id !== userId) || userId !== currentUser._id &&
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
                            }

                        </View>
                        <Text style={styles.date}>{dateDiff}</Text>
                        <Text numberOfLines={1} style={styles.description}>{caption}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
};

export default PostSingle;