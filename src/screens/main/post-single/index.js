import React, { useState, useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import styles from './style';
import PostSingle from '../../../components/post-single';

const PostSinglePage = ({ navigation, route }) => {
  const { post } = route.params;
  const [focused, setFocused] = useState();

  useEffect(() => {
    const subscribeFocusEvent = navigation.addListener('focus', () => {
      setFocused(true);
      console.log('focus', focused);
    });
    const subscribeBlurEvent = navigation.addListener('blur', () => {
      setFocused(false);
      console.log('blur', focused);
    });
    return (() => {
      subscribeFocusEvent;
      subscribeBlurEvent;
    });
  }, [focused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <PostSingle
          data={post}
          isActive={focused}
          key={post._id}
        />
      </View>
    </SafeAreaView>
  )
}

export default PostSinglePage;