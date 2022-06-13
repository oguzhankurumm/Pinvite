import React, { useState, useRef } from 'react'
import { View, Text, FlatList, Pressable, Image, Dimensions } from 'react-native'
import styles from './style';
import ChatCard from '../../../components/chat-card';
import { Divider, Button, Menu } from 'react-native-paper';
import { Icon } from 'react-native-eva-icons';
import { primary, white } from '../../../assets/colors';
import { useSelector } from 'react-redux';
import { navigate } from '../../../helpers/navigationService';
import { regularText } from '../../../assets/fonts';
import Carousel from 'react-native-snap-carousel';
import ChatTabs from '../../../components/chat-tabs';
import ContactsUserCard from '../../../components/contacts-user-card';
import { Tab, Tabs, ScrollableTab } from 'native-base';

const Messages = ({ navigation }) => {
  const _carousel = useRef(null);
  const { list } = useSelector(state => state.chatReducer);
  const { followers, followings } = useSelector(state => state.userReducer);
  const [visible, setVisible] = useState(false);
  const tabs = [
    { title: "Contacts", id: 0 },
    { title: "Chats", id: 1 },
    { title: "Search", id: 2, icon: 'search-outline' },
  ];

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const StartNewConversation = () => (
    <Pressable
      style={styles.conversationContainer}
      onPress={openMenu}
    >
      <Icon name='plus-outline' width={28} height={28} fill={white} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 10 }}>
        <ChatTabs newRef={_carousel} tabs={tabs} />
      </View>
      <Carousel
        scrollEnabled={false}
        initialNumToRender={1}
        ref={_carousel}
        newRef={_carousel}
        data={tabs}
        renderItem={({ item }) => {
          if (item.id === 0) {
            return (
              <Tabs
                tabBarUnderlineStyle={{ backgroundColor: primary }}
                tabBarBackgroundColor={white}
                renderTabBar={() => <ScrollableTab style={{ marginTop: 10 }} />}
              >
                <Tab heading="Followers" activeTextStyle={{ color: primary }} activeTabStyle={{ backgroundColor: white }} tabStyle={{ backgroundColor: white }} textStyle={{ fontFamily: regularText }}>
                  <FlatList
                    data={followers}
                    style={styles.flatlist}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ContactsUserCard key={item._id} user={item} statusTitle="Followers" />}
                    ItemSeparatorComponent={() => <Divider />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    ListEmptyComponent={() => (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>You have no followers yet.</Text>
                      </View>
                    )}
                    removeClippedSubviews
                  />
                </Tab>
                <Tab heading="Following" activeTextStyle={{ color: primary }} activeTabStyle={{ backgroundColor: white }} tabStyle={{ backgroundColor: white }} textStyle={{ fontFamily: regularText }}>
                  <FlatList
                    data={followings}
                    style={styles.flatlist}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ContactsUserCard key={item._id} user={item} statusTitle="Following" />}
                    ItemSeparatorComponent={() => <Divider />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    ListEmptyComponent={() => (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>You don't have anyone you follow yet.</Text>
                      </View>
                    )}
                    removeClippedSubviews
                  />
                </Tab>
              </Tabs>
            )
          }
          if (item.id === 1) {
            return (
              <>
                <FlatList
                  data={list}
                  style={styles.flatlist}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <ChatCard key={item._id} chatItem={item} />}
                  ItemSeparatorComponent={() => <Divider />}
                  ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>You do not have any chats yet.</Text>
                    </View>
                  )}
                  removeClippedSubviews
                />
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  contentStyle={{ alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 80, marginRight: 15 }}
                  style={{ alignSelf: 'flex-end', alignItems: 'flex-end', width: '100%', right: 50, }}
                  anchor={
                    <Button onPress={openMenu} />
                  }>
                  <Menu.Item onPress={() => {
                    navigate('SelectPeople', { mode: 'single', title: 'Select People' });
                    closeMenu();
                  }} title="New Message" titleStyle={{ fontFamily: regularText, fontSize: 13 }} icon={() => <Image source={require('../../../assets/icons/newMessage.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />} contentStyle={{ justifyContent: 'center', alignItems: 'flex-start' }} />
                  <Divider style={{ width: 100 }} />
                  <Menu.Item onPress={() => {
                    navigate('SelectPeople', { mode: 'multiple', title: 'Select Multiple People' });
                    closeMenu();
                  }} title="Create a group" titleStyle={{ fontFamily: regularText, fontSize: 13 }} icon={() => <Image source={require('../../../assets/icons/newMessage.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />} contentStyle={{ justifyContent: 'center', alignItems: 'flex-start' }} />
                  <Divider />
                </Menu>
                <StartNewConversation />
              </>
            )
          }
          if (item.id === 2) {
            return <View></View>
          }
        }}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        layout={'default'}
        style={{ paddingHorizontal: 10 }}
        removeClippedSubviews={false}
      />

    </View >
  )
}

export default Messages;