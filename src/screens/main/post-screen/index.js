import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Pressable, Image, Alert } from 'react-native'
import styles from './style';
import MiniHeader from '../../../components/mini-header';
import { Icon } from 'react-native-eva-icons';
import { gray, lightGray, primary, white } from '../../../assets/colors';
import CustomInputFloat from '../../../components/custom-input-float';
import { ActivityIndicator, Divider, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Video as VideoCompressor, Image as ImageCompressor } from 'react-native-compressor';
import { createPost } from '../../../redux/actions/posts';

const PostScreen = ({ navigation, route }) => {
  const { currentUser } = useSelector(state => state.authReducer);
  const { loaded } = useSelector(state => state.postsReducer);
  const { selectedMedia, isPostMode, thumbnail, mediaType } = route.params;

  const dispatch = useDispatch();
  const captionInputRef = useRef();
  const [caption, setCaption] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [postPrivacy, setPostPrivacy] = useState([
    { id: 0, name: "Public", value: "public", isSelected: true },
    { id: 1, name: "Friends", value: "friends", subtitle: "Followers you follow back", isSelected: false },
    { id: 2, name: "Private", value: "private", isSelected: false }
  ]);
  const [location, setLocation] = useState(null);
  const [link, setLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Progress, setProgress] = useState(0);

  const onShare = async () => {
    try {
      if (caption.length === 0) return Alert.alert('No Caption', 'Please enter a caption');
      setIsLoading(true);
      if(Progress > 0 || !loaded || isLoading) return Alert.alert('Uploading', 'Please wait until the upload is complete');
      let data = {};

      if (mediaType === "image") {
        const imageResult = await ImageCompressor.compress(selectedMedia.uri, {
          maxWidth: 800,
          quality: 0.5
        });
        data = { ...data, media: imageResult }
      }

      if (mediaType === "video") {
        const videoResult = await VideoCompressor.compress(selectedMedia.uri, {
          compressionMethod: 'auto',
        }, (progress) => {
          setProgress(progress * 100);
        });
        data = { ...data, media: videoResult }
      }

      const newData = {
        ...data,
        caption,
        allowComments,
        privacy: postPrivacy.filter(item => item.isSelected)[0].value,
        location,
        link,
        mediaType: isPostMode ? "post" : "story",
        type: mediaType,
        thumbnail: thumbnail ? thumbnail.path : null,
        userId: currentUser._id
      }
      dispatch(createPost({ data: newData, userId: currentUser._id }))
        .then(() => {
          setIsLoading(false);
          navigation.navigate('Home');
        })
        .catch(() => setIsLoading(false))

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
      console.log(error)
    }

  }

  const AddButton = ({ title, onPress }) => {
    return (
      <Pressable style={styles.addButton} onPress={onPress}>
        <View style={styles.iconContainer}>
          <Icon name="plus-outline" height={18} width={18} fill={white} />
        </View>
        <Text style={styles.addButtonText}>{title}</Text>
      </Pressable>
    )
  }

  const SwitchButton = ({ title }) => {
    return (
      <View style={styles.switchButton}>
        <Text style={styles.switchButtonText}>{title}</Text>
        <Switch value={allowComments} onValueChange={setAllowComments} color={primary} style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }} />
      </View>
    )
  }

  const showPrivacyModal = () => {
    alert('show privacy modal')
  }

  const IconTextButton = ({ title }) => {
    return (
      <Pressable style={styles.iconTextContainer}>
        <Text style={styles.iconTextContainerTitle}>{title}</Text>
        <View style={styles.iconTextRightContainer}>
          <Text style={styles.iconTextContainerTitle}>
            {postPrivacy.find(item => item.isSelected)?.name || "Public"}
          </Text>
          <Icon name="chevron-right" height={18} width={18} fill={gray} />
        </View>
      </Pressable>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <View style={styles.container}>
        <MiniHeader onLeftPress={() => navigation.goBack()} onRightPress={onShare} />
        <View style={styles.mainContainer}>
          <View style={styles.postContainer}>
            <View style={styles.postImage}>
              <Image
                style={styles.postImage}
                source={thumbnail ? { uri: thumbnail.path } : { uri: selectedMedia.uri }}
                resizeMode="cover"
              />
              {isLoading &&
                <View style={styles.indicator}>
                  <ActivityIndicator animating={true} color={white} size={56} />
                  <Text style={styles.indicatorText}>{parseFloat(Progress).toFixed(2)}%</Text>
                </View>
              }
            </View>
            <CustomInputFloat
              inputRef={captionInputRef}
              onChangeText={setCaption}
              value={caption}
              placeholder="Add #Hashtags, tags, caption"
              blurOnSubmit={true}
              keyboardType="default"
              returnKeyType="done"
              maxLength={120}
              multiline={true}
              rows={3}
              styleProps={styles.captionInput}
            />
          </View>
          <AddButton title="Add Location" />
          <AddButton title="Add Link" />
          <AddButton title="Add More" />
          <SwitchButton title="Allow Comments" />
          <Divider style={{ backgroundColor: lightGray, height: 1 }} />
          <IconTextButton title="Share with" />
          <Divider style={{ backgroundColor: lightGray, height: 1 }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PostScreen;