import React, { useRef, forwardRef } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './style';
import moment from 'moment';
import Video from 'react-native-video';
import SaveRight from '../../assets/icons/Bookmark_right.svg';
import SendRight from '../../assets/icons/Send_right.svg';
import ChatRight from '../../assets/icons/Chat_right.svg';
import FavoriteRight from '../../assets/icons/Favorite_right.svg';
import InfoRight from '../../assets/icons/Info_right.svg';
import LinearGradient from 'react-native-linear-gradient';

export const PostSingle = forwardRef(({ item }, parentRef) => {
    const ref = useRef(null);
    const avatar = 'https://pbs.twimg.com/profile_images/1223706175910211584/tmu8d9fA.jpg';
    const thumbnail = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774';

    const dateDiff = moment.unix(item.createdAt).fromNow();


    return (
        <View style={styles.container}>
            {item.type === 'video' ?
                <View style={styles.video}>
                    <Video
                        ref={ref}
                        source={{ uri: item.media }}
                        style={styles.video}
                        onError={(e) => console.log(e)}
                        repeat={true}
                        paused={false}
                        poster={thumbnail}
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
                :
                <View style={styles.image}>
                    <Image
                        source={{ uri: item.media }}
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
                    <Pressable style={styles.iconRightContainer}>
                        <InfoRight height={42} width={42} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer}>
                        <FavoriteRight height={36} width={36} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer}>
                        <ChatRight height={44} width={44} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer}>
                        <SendRight height={42} width={42} />
                    </Pressable>
                    <Pressable style={styles.iconRightContainer}>
                        <SaveRight height={38} width={38} />
                    </Pressable>
                </View>
                <View style={styles.bottomContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: avatar }}
                        resizeMode="cover"
                    />
                    <View style={styles.bottomSecond}>
                        <Text style={styles.username}>@oguzhankurum</Text>
                        <Text style={styles.date}>{dateDiff}</Text>
                        <Text numberOfLines={1} style={styles.description}>{item.caption}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
})

export default PostSingle;