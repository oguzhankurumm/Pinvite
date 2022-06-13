import React, { useRef } from 'react'
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native'
import { useSelector } from 'react-redux';
import PostGallery from '../../../components/post-gallery';
import ProfileDetails from '../../../components/profile-details';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import styles from './style';
import Carousel from 'react-native-snap-carousel';
import ProfileTabs from '../../../components/profile-tabs';

const Profile = ({ navigation }) => {
  const _carousel = useRef(null);
  const { currentUser } = useSelector(state => state.authReducer);
  const { myPosts } = useSelector(state => state.postsReducer);
  const tabs = [
    { title: "Upload", id: 0 },
    { title: "Tagged", id: 1 },
    { title: "Saved", id: 2 },
  ];
  console.log({myPosts})

  const PostFlatList = ({ data, emptyText }) => (
    <FlatList
      scrollEnabled={false}
      data={data.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      )}
      horizontal={false}
      renderItem={({ item }) => <PostGallery key={item._id} post={item} />}
      keyExtractor={item => item._id}
      numColumns={3}
      style={{ paddingHorizontal: 15 }}
    />
  )

  return (
    <ScrollView
      style={styles.container}
    >
      <View style={styles.galleryContainer}>
        <ProfileDetails
          userId={currentUser._id}
          image={currentUser.image ? { uri: currentUser.image } : defaultAvatar}
          name={currentUser.name ? currentUser.name : 'Name'}
          username={currentUser.username ? currentUser.username : 'username'}
          bio={currentUser.bio ? currentUser.bio : 'User Bio'}
          followersCount={currentUser.followersCount !== undefined ? currentUser.followersCount : 0}
          followingCount={currentUser.followingCount !== undefined ? currentUser.followingCount : 0}
        />
        <ProfileTabs newRef={_carousel} tabs={tabs} />
        <Carousel
          scrollEnabled={false}
          ref={_carousel}
          newRef={_carousel}
          data={tabs}
          renderItem={({ item, index }) => {
            if (item.id === 0) {
              return <PostFlatList data={myPosts} emptyText="You have not uploaded a post yet." />
            }
            if (item.id === 1) {
              return <PostFlatList data={myPosts} emptyText="You have not been tagged in any post yet." />
            }
            if (item.id === 2) {
              return <PostFlatList data={myPosts} emptyText="You have not saved any post yet." />
            }
          }}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          layout={'default'}
          removeClippedSubviews={false}
        />
      </View>
    </ScrollView>
  )
}

export default Profile; 