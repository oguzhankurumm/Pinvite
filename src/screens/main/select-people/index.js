import React, { useState, useLayoutEffect } from 'react'
import { Text, FlatList, Alert, TouchableWithoutFeedback } from 'react-native'
import styles from './style';
import { useSelector } from 'react-redux';
import UserListCard from '../../../components/user-list-card';

const SelectPeople = ({ navigation, route }) => {
  const { mode, title } = route.params;
  const { followings } = useSelector(state => state.userReducer);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onUserSelect = (user) => {
    if (mode === 'single') {
      if (selectedUsers._id === user._id) {
        setSelectedUsers([]);
        setNavigation();
      } else {
        setSelectedUsers(user);
        setNavigation();
      }
    } else if(mode === 'multiple') {
      if (selectedUsers.some(selectedUser => selectedUser._id === user._id)) {
        setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser._id !== user._id));
        setNavigation();
      } else {
        setSelectedUsers([...selectedUsers, user]);
        setNavigation();
      }
    }
  }

  const setNavigation = () => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => {
          if (selectedUsers.length === 0) {
            console.log('selectedUsers', selectedUsers._id);
            Alert.alert('Please select at least one user');
          } else {
            console.log('selectedUsers', selectedUsers._id);
            navigation.navigate('ChatScreen', { contactId: mode === 'single' ? selectedUsers._id : selectedUsers });
          }
        }}>
          <Text style={styles.rightButtonText}>Done</Text>
        </TouchableWithoutFeedback>
      ),
    })
  }

  return (
    <FlatList
      data={followings}
      style={styles.container}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => <UserListCard user={item} onUserSelect={onUserSelect} selectedUsers={selectedUsers} mode={mode} />}
      removeClippedSubviews
    />
  )
}

export default SelectPeople;