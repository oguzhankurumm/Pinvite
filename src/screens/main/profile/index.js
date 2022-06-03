import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import PostGallery from '../../../components/post-gallery';
import ProfileDetails from '../../../components/profile-details';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import styles from './style';

const Profile = ({ navigation }) => {
  const { currentUser } = useSelector(state => state.authReducer);
  const { posts } = useSelector(state => state.userReducer);

  return (
    <FlatList
      data={posts}
      style={styles.container}
      numColumns={3}
      horizontal={false}
      ListHeaderComponent={
        <ProfileDetails
          userId={currentUser._id}
          image={currentUser.image ? { uri: currentUser.image } : defaultAvatar}
          name={currentUser.name ? currentUser.name : 'Name'}
          username={currentUser.username ? currentUser.username : 'username'}
          bio={currentUser.bio ? currentUser.bio : 'User Bio'}
          followersCount={currentUser.followersCount !== undefined ? currentUser.followersCount : 0}
          followingCount={currentUser.followingCount !== undefined ? currentUser.followingCount : 0}
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

export default Profile; 