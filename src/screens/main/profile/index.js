import React from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import PostGallery from '../../../components/post-gallery';
import ProfileDetails from '../../../components/profile-details';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import styles from './style';

const Profile = ({ navigation }) => {
  const { currentUser } = useSelector(state => state.authReducer);
  const { posts } = useSelector(state => state.userReducer);

  return (
    <ScrollView
      style={styles.container}
    >
      <ProfileDetails
        userId={currentUser._id}
        image={currentUser.image ? { uri: currentUser.image } : defaultAvatar}
        name={currentUser.name ? currentUser.name : 'Name'}
        username={currentUser.username ? currentUser.username : 'username'}
        bio={currentUser.bio ? currentUser.bio : 'User Bio'}
        followersCount={currentUser.followersCount !== undefined ? currentUser.followersCount : 0}
        followingCount={currentUser.followingCount !== undefined ? currentUser.followingCount : 0}
      />
      <View style={styles.galleryContainer}>
        <FlatList
          data={posts}
          horizontal={false}
          renderItem={({ item }) => <PostGallery key={item._id} post={item} />}
          keyExtractor={item => item._id}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingBottom: 5 }}
        />
      </View>
    </ScrollView>
  )
}

export default Profile; 