import React, { useState, useRef } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import styles from './style';
import MessageBubble from '../../../components/message-bubble';
import { useMessages } from '../../../helpers/useMessages';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import { dark, gray, primary } from '../../../assets/colors';
import { sendMessage } from '../../../helpers/chat';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const ChatScreen = ({ route }) => {
  const { chatId, contactId } = route.params;
  const [message, setMessage] = useState([]);
  const { currentUser } = useSelector(state => state.authReducer);
  const keyboardRef = useRef();
  const { messages, chatIdInst } = useMessages(chatId, contactId);
  
  const handleSendMessage = () => {
    if (message.length === 0) {
      return;
    }
    setMessage('');
    sendMessage(chatIdInst, message, currentUser._id);
  }

  const renderItem = ({ item }) => {
    return <MessageBubble
      text={item.text}
      date={item.createdAt}
      position={item.sender === currentUser._id ? "RIGHT" : "LEFT"}
      myAvatar={""}
      sender={item.sender}
    />
  }


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[dark, gray]}
        start={{ x: 1, y: 0 }}
        style={styles.container}
        end={{ x: 0, y: 1 }}
      >
        <FlatList
          inverted
          style={{ padding: 20 }}
          ref={keyboardRef}
          bounces={false}
          data={messages}
          keyExtractor={({ _id }) => _id}
          renderItem={renderItem}
        />
        <View style={styles.containerInput}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            placeholder="Type here..."
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
          />
          <Pressable onPress={handleSendMessage} style={styles.sendButton}>
            <Icon name="arrow-right" width={28} height={28} fill={primary} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  )
}

export default ChatScreen;