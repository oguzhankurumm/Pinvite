import React, { useRef, useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, RefreshControl, ScrollView, Dimensions } from 'react-native'
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import SelecteableTabs from '../../../components/selectable-tabs';
import PostSingle from '../../../components/post-single';
import { getFollowingUserPosts, getLocalPost } from '../../../redux/actions/posts';
import UserCard from '../../../components/user-card';
import { updateCurrentLocation } from '../../../redux/actions/auth';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { followings, mostFollowedUsers } = useSelector(state => state.userReducer);
  const { followingUserPosts, localPosts, initialPage } = useSelector(state => state.postsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const mediaRefs = useRef([]);
  const refPagerView = useRef();
  const pages = [0, 1]

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

  const getCurrentLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        dispatch(updateCurrentLocation({ location, userId: currentUser._id }));
        dispatch(getLocalPost(location));
      },
      error => {
        console.log('hata', error)
        return error;
      }
    );

  }

  useEffect(() => {
    getCurrentLocation();
  }, [])

  const postSingleView = ({ item, index }) => {
    return (
      <PostSingle
        ref={postSingleRef => (mediaRefs.current[item.id] = postSingleRef)}
        item={item}
      />
    )
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getFollowingUserPosts(followings))
    await dispatch(getLocalPost(currentUser.location))
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

  const PostFlatlist = ({ data, renderItem }) => (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      windowSize={4}
      initialNumToRender={0}
      maxToRenderPerBatch={2}
      snapToInterval={Dimensions.get("window").height - 126}
      snapToAlignment="start"
      removeClippedSubviews
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100
      }}
      renderItem={renderItem}
      pagingEnabled
      keyExtractor={item => item._id}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <SelecteableTabs newRef={refPagerView} />
        <Carousel
          scrollEnabled={false}
          ref={refPagerView}
          newRef={refPagerView}
          data={pages}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return <PostFlatlist data={followingUserPosts} renderItem={postSingleView} />
            }
            return <PostFlatlist data={localPosts} renderItem={postSingleView} />
          }}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          layout={'default'}
          style={{ paddingHorizontal: 10 }}
          removeClippedSubviews={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home;