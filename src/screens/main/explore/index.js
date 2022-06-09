import React from 'react'
import { View, Text } from 'react-native'
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Explore = () => {
  return (
    <KeyboardAwareScrollView style={styles.keyboard} extraScrollHeight={50}>
      <View style={styles.container}>
        <Text>Explore</Text>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Explore;