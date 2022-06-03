import React, { useRef, useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, RefreshControl, ScrollView } from 'react-native'
import styles from './style';
import PagerView from 'react-native-pager-view';
import { updateLocation } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import SelecteableTabs from '../../../components/selectable-tabs';
import PostSingle from '../../../components/post-single';
import { getFollowingUserPosts } from '../../../redux/actions/posts';
import UserCard from '../../../components/user-card';

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { followings, mostFollowedUsers } = useSelector(state => state.userReducer);
  const { followingUserPosts, localPosts, initialPage } = useSelector(state => state.postsReducer);
  const [refreshing, setRefreshing] = useState(false);

  const mediaRefs = useRef([]);
  const refPagerView = useRef();

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    })
  });

  const renderItem = ({ item, index }) => {
    return (
      <View key={item._id} style={[{ flex: 1, height: '100%' }, index % 2 == 0 ? { backgroundColor: 'blue' } : { backgroundColor: 'pink' }]}>
        <PostSingle
          ref={postSingleRef => (mediaRefs.current[item.id] = postSingleRef)}
          item={item}
        />
      </View >
    )
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getFollowingUserPosts(followings))
    setRefreshing(false);
  }

  const FollowPage = () => (
    <View style={styles.followPageContainer}>
      <Text style={styles.headerText}>Welcome to Pinvite</Text>
      <Text style={styles.headerDescription}>Follow an account to stay updated with{'\n'}the latest events</Text>
      <ScrollView
        style={styles.followPageScrollView}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.followPageScrollViewContentContainer}
      >
        {mostFollowedUsers.map(user => (
          <UserCard
            key={user._id}
            user={user}
          />
        ))}
      </ScrollView>
    </View>
  )

  const FollowingPostsPage = () => (
    <FlatList
      data={followingUserPosts}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      windowSize={4}
      initialNumToRender={0}
      maxToRenderPerBatch={2}
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100
      }}
      renderItem={renderItem}
      pagingEnabled
      keyExtractor={item => item._id}
      decelerationRate="normal"
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  )

  const LocalPostsPage = () => (
    <FlatList
      data={localPosts}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      windowSize={4}
      initialNumToRender={0}
      maxToRenderPerBatch={2}
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100
      }}
      renderItem={renderItem}
      pagingEnabled
      keyExtractor={item => item._id}
      decelerationRate="normal"
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '100%', width: '100%' }}>
        <SelecteableTabs />
        <PagerView
          ref={refPagerView}
          initialPage={initialPage}
          scrollEnabled={false}
        >
          {followings.length < 5 ? <FollowPage /> : <FollowingPostsPage />}
          <LocalPostsPage />
        </PagerView>
      </View>
    </SafeAreaView>
  )
}

export default Home;