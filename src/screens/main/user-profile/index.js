import React from 'react'
import { FlatList } from 'react-native'
import PostGallery from '../../../components/post-gallery';
import ProfileDetails from '../../../components/profile-details';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import styles from './style';

const UserProfile = ({ route }) => {
  const { user } = route.params;
  const posts = [];
  return (
    <FlatList
      data={posts}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      horizontal={false}
      ListHeaderComponent={
        <ProfileDetails
          userId={user._id}
          image={user.image ? { uri: user.image } : defaultAvatar}
          name={user.name ? user.name : 'Name'}
          username={user.username ? user.username : 'username'}
          bio={user.bio ? user.bio : 'User Bio'}
          followers={user.followers !== undefined ? user.followers.length : 0}
          following={user.followings !== undefined ? user.followings.length : 0}
          followersCount={user.followersCount !== undefined ? user.followersCount : 0}
          followingCount={user.followingCount !== undefined ? user.followingCount : 0}
        />
      }
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <PostGallery post={item} />
        )
      }}
    />
  )
}

export default UserProfile; 