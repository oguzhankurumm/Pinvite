import React, { useRef, forwardRef, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './style';
import moment from 'moment';
import Video from 'react-native-video';
import SendRight from '../../assets/icons/Send_right.svg';
import ChatRight from '../../assets/icons/Chat_right.svg';
import InfoRight from '../../assets/icons/Info_right.svg';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import { likePost, unlikePost, savePost, unsavePost } from '../../redux/actions/posts';
import AnimatedLottieView from 'lottie-react-native';
import LoadingAnimation from '../../assets/animations/hourglass.json';

export const PostSingle = forwardRef(({ item }, parentRef) => {
    const dispatch = useDispatch();
    const { caption, user, createdAt, likes, saves, _id, userId, type, media, thumbnail } = item;
    const { currentUser } = useSelector(state => state.authReducer);
    const ref = useRef(null);
    const avatar = 'https://pbs.twimg.com/profile_images/1223706175910211584/tmu8d9fA.jpg';
    const defaultThumbnail = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774';
    const dateDiff = moment.unix(createdAt).fromNow();
    const { followings } = useSelector(state => state.userReducer);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(likes?.includes(currentUser._id));
    const [saveStatus, setSaveStatus] = useState(saves?.includes(currentUser._id));
    const [isLoading, setisLoading] = useState(true);

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

    const handleSendMessage = () => {
        alert('send message')
    }

    const handleShowInfo = () => {
        alert('info')
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
        <View style={styles.container}>
            {type === 'video' &&
                <View style={styles.video}>
                    {isLoading && <LoaderComponent />}
                    <Video
                        ref={ref}
                        source={{ uri: media }}
                        style={styles.video}
                        onReadyForDisplay={() => setisLoading(false)}
                        onLoadStart={() => setisLoading(true)}
                        onError={(e) => console.log(e)}
                        repeat={true}
                        paused={false}
                        poster={thumbnail ? thumbnail : defaultThumbnail}
                        posterResizeMode='cover'
                        resizeMode="cover"
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
                    <Image
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
                    <Pressable style={styles.iconRightContainer} onPress={handleSendMessage}>
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
                    <Pressable>
                        <Image
                            style={styles.avatar}
                            source={{ uri: user.image !== "" ? user.image : avatar }}
                            resizeMode="cover"
                        />
                    </Pressable>
                    <View style={styles.bottomSecond}>
                        <Text style={styles.username}>{user?.username}</Text>
                        <Text style={styles.date}>{dateDiff}</Text>
                        <Text numberOfLines={1} style={styles.description}>{caption}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
})

export default PostSingle;