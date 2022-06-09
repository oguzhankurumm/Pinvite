import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import styles from './style';
import MiniHeader from '../../../components/mini-header';
import { Icon } from 'react-native-eva-icons';
import { white } from '../../../assets/colors';
import CustomInputFloat from '../../../components/custom-input-float';

const PostScreen = ({ navigation, route }) => {
  const { selectedMedia } = route.params;
  const captionInputRef = useRef();
  const [caption, setCaption] = useState("");

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <View style={styles.container}>
        <MiniHeader onLeftPress={() => navigation.goBack()} />
        <View style={styles.mainContainer}>
          <View style={styles.postContainer}>
            <Image
              style={styles.postImage}
              source={{ uri: selectedMedia.uri }}
            />
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
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PostScreen;