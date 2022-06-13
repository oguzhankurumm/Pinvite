import React, { useRef, useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, SafeAreaView, RefreshControl, ScrollView, Dimensions, Alert } from 'react-native'
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import SelecteableTabs from '../../../components/selectable-tabs';
import PostSingle from '../../../components/post-single';
import { getFollowingUserPosts, getLocalPost } from '../../../redux/actions/posts';
import UserCard from '../../../components/user-card';
import { updateCurrentLocation } from '../../../redux/actions/auth';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import GradientButton from '../../../components/gradient-button';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { followings, mostFollowedUsers } = useSelector(state => state.userReducer);
  const { followingUserPosts, localPosts } = useSelector(state => state.postsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [showFollowingPosts, setShowFollowingPosts] = useState(followings.length >= 1 ? true : false);
  const refPagerView = useRef();
  const pages = [0, 1]
  const [visibleItemIndex, setVisibleItemIndex] = useState();
  const [viewabilityConfiguration, setViewabilityConfiguration] = useState({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 40,
  });
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

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 40,
    waitForInteraction: true,
  };

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    console.log({
      message: 'triggers change....1',
      viewableItems,
      changed,
      focused
    }, 'CHECK');
    if (changed && changed.length > 0) {
      console.log('changed: ', changed[0].index)
      setVisibleItemIndex(changed[0].index);
    }
  });

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

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
        return error;
      }
    );

  }

  useEffect(() => {
    getCurrentLocation();
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getFollowingUserPosts(followings))
    await dispatch(getLocalPost(currentUser.location))
    setRefreshing(false);
  }

  const onDonePress = async () => {
    if (followings.length === 0) return Alert.alert('You have no following users. Follow some users to see their posts.');
    await dispatch(getFollowingUserPosts(followings));
    setShowFollowingPosts(true);
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
      <View style={{ marginBottom: 20 }}>
        <GradientButton title="OK, Continue" onPress={onDonePress} />
      </View>
    </View>
  )

  const renderItem = ({ item, index }) => {
    return (
      <PostSingle
        data={item}
        isActive={visibleItemIndex === index}
        key={item._id}
      />
    )
  }

  const PostFlatlist = ({ data }) => (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      decelerationRate="fast"
      keyExtractor={(item, index) => item.id}
      snapToInterval={Dimensions.get("window").height - 126}
      snapToAlignment="start"
      viewabilityConfig={viewabilityConfiguration}
      renderItem={renderItem}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
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
              if (!showFollowingPosts) {
                return <FollowPage />
              }
              return <PostFlatlist data={followingUserPosts} />
            }
            return <PostFlatlist data={localPosts} />
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