import React from 'react'
import { View, FlatList } from 'react-native'
import styles from './style';
import ChatCard from '../../../components/chat-card';
import { Divider } from 'react-native-paper';

const Messages = () => {
  const dummyMsg = [
    {
      _id: 0,
      messages: [{
        _id: 'KsdgMds',
        text: "Hello, how are you?",
        sender: "qpkhgcaQLYSl6wnrjf8896m1alM2",
      }],
      lastSender: "qpkhgcaQLYSl6wnrjf8896m1alM2",
      lastMessage: "Hello!",
      lastMessageDate: "2022-06-05T17:11:38.838Z",
      members: ["qpkhgcaQLYSl6wnrjf8896m1alM2", "w8aX5ynGlsXNZf83LnZD"],
      createdAt: "2022-06-05T17:11:38.838Z",
      name: "Cleo Valencia",
      userAvatar: "https://i.pravatar.cc/300?img=1",
    }
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyMsg}
        style={styles.flatlist}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatCard key={item._id} chatItem={item} />}
      />
    </View>
  )
}

export default Messages;