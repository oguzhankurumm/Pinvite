import React, { useState, useRef } from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import defaultAvatar from '../../../assets/images/defaultAvatar.png'
import { changeProfileImage, checkUsername } from '../../../helpers'
import { changeAvatar, deleteAccount, updateProfile } from '../../../redux/actions/auth';
import BorderedButton from '../../../components/bordered-button';
import CustomInputFloat from '../../../components/custom-input-float';
import { gray } from '../../../assets/colors';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const websiteInputRef = useRef();
  const bioInputRef = useRef();
  const [Name, setName] = useState(currentUser.name || '');
  const [Username, setUsername] = useState(currentUser.username || '');
  const [Website, setWebsite] = useState(currentUser.website || '');
  const [Bio, setBio] = useState(currentUser.bio || '');
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const changeProfilePicture = async () => {
    const response = await changeProfileImage(currentUser._id);
    if (response.status === 200) {
      dispatch(changeAvatar(response.data.image));
    } else {
      Alert.alert('Error', 'Profile image could not be changed.')
    }
  }

  const deleteMyAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteAccount(currentUser._id)),
        },
      ],
      { cancelable: false },
    );
  }

  const usernameOnChange = async (username) => {
    setUsername(username);
    if (username === currentUser.username) {
      setUsernameAvailable(true);
      return;
    }
    const response = await checkUsername(username);
    if (response.success === true) {
      setUsernameAvailable(true);
    } else {
      setUsernameAvailable(false);
    }
  };

  const saveButtonFunction = () => {
    const data = {
      name: Name,
      username: Username,
      website: Website,
      bio: Bio
    }
    if (!usernameAvailable) return Alert.alert('Error', 'Username is not available.');
    dispatch(updateProfile({ data, userId: currentUser._id }));
  };

  const SaveButton = () => {
    return (
      <Pressable
        onPress={saveButtonFunction}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    )
  };

  return (
    <KeyboardAwareScrollView style={styles.keyboard} extraScrollHeight={50}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <SaveButton />
          <Image
            style={styles.avatar}
            source={currentUser.image ? { uri: currentUser.image } : defaultAvatar}
          />
          <Pressable
            style={styles.changeAvatarButton}
            onPress={changeProfilePicture}
          >
            <Text style={styles.changeAvatarText}>Change profile photo</Text>
          </Pressable>
        </View>

        <CustomInputFloat
          label="Name"
          inputRef={nameInputRef}
          onChangeText={setName}
          value={Name}
          placeholder={currentUser.name ? currentUser.name : 'Name'}
          blurOnSubmit={true}
          keyboardType="default"
          returnKeyType="done"
          maxLength={120}
        />
        <CustomInputFloat
          label="Username"
          inputRef={usernameInputRef}
          onChangeText={usernameOnChange}
          autoCorrect={false}
          value={Username}
          placeholder={currentUser.username ? currentUser.username : 'Username'}
          blurOnSubmit={true}
          keyboardType="default"
          returnKeyType="done"
          maxLength={120}
          showIcon={true}
          iconStatus={usernameAvailable}
        />
        <CustomInputFloat
          label="Bio"
          inputRef={bioInputRef}
          onChangeText={setBio}
          value={Bio}
          placeholder={currentUser.bio ? currentUser.bio : 'Write your bio'}
          blurOnSubmit={true}
          keyboardType="default"
          returnKeyType="done"
          maxLength={120}
          multiline={true}
          rows={3}
          styleProps={{ height: 80, borderRadius: 8, borderBottomWidth: 1, borderWidth: 1, borderColor: gray, paddingHorizontal: 10 }}
        />
        <CustomInputFloat
          label="Website"
          inputRef={websiteInputRef}
          autoCorrect={false}
          onChangeText={setWebsite}
          value={Website}
          placeholder={currentUser.website ? currentUser.website : 'Website'}
          blurOnSubmit={true}
          keyboardType="url"
          returnKeyType="done"
          maxLength={120}
        />
        <BorderedButton title="Delete Account" onPress={deleteMyAccount} styleProps={{ marginTop: 50 }} />
      </View>
    </KeyboardAwareScrollView>
  )
};

export default EditProfile; 