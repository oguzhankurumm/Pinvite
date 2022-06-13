import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Alert, Image, Pressable } from 'react-native'
import styles from './style';
import MiniHeader from '../../../components/mini-header';
import CameraControls from '../../../components/camera-controls';
import { Camera, useCameraDevices, PhotoFile, VideoFile } from 'react-native-vision-camera';
import Video from 'react-native-video';
import { createThumbnail } from "react-native-create-thumbnail";
import { Icon } from 'react-native-eva-icons';
import { white } from '../../../assets/colors';

const UploadScreen = ({ navigation }) => {
  const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef(null);
  const [isCameraPermitted, setIsCameraPermitted] = useState(false);
  const [isMicrophonePermitted, setIsMicrophonePermitted] = useState(false);
  const [isPostMode, setIsPostMode] = useState(true);
  const [mediaType, setMediaType] = useState("post");
  const [Recording, setRecording] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.getCameraPermissionStatus();
      setIsCameraPermitted(cameraStatus === 'authorized');

      const microphoneStatus = await Camera.getMicrophonePermissionStatus();
      setIsMicrophonePermitted(microphoneStatus === 'authorized');
    })
  }, [])


  const onSelectAsset = async item => {
    setSelectedMedia(item[0])
    if (item[0].type.includes("video")) {
      setMediaType("video");
      const getThumbnail = await createThumbnail({
        url: item[0].uri,
        timeStamp: 1000
      })
      setThumbnail(getThumbnail)
    } else {
      setMediaType("image")
      setThumbnail(null);
    }
  }

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      quality: 100
    })
    setSelectedMedia(photo);
    setMediaType("image");
    setThumbnail(null);
  }

  const startRecording = async () => {
    setRecording(true)
    camera.current.startRecording({
      onRecordingFinished: (video) => console.log({ video }),
      onRecordingError: (error) => console.error({ error }),
    })
  }

  const stopRecording = async () => {
    setRecording(false)
    camera.current.stopRecording();
  }

  const onPostPressed = () => {
    if (!selectedMedia) {
      return Alert.alert('Please select a media')
    }
    setMuted(true);
    navigation.navigate('PostScreen', { selectedMedia, isPostMode, thumbnail, mediaType })
  }

  return (
    <View style={styles.container}>
      <MiniHeader
        onLeftPress={null}
        onRightPress={onPostPressed}
        hideLeftButton
      />
      {selectedMedia ?
        <>
          {mediaType === "image" ?
            <Image
              source={{ uri: selectedMedia.uri }}
              style={styles.image}
              resizeMode="cover"
            />
            :
            <View style={styles.image}>
              <Pressable style={styles.image} onPress={() => setPaused(!paused)}>
                <Video
                  source={selectedMedia}
                  style={styles.image}
                  repeat={true}
                  paused={paused}
                  muted={muted}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable style={styles.rightIconsContainer}>
                <Icon onPress={() => setMuted(!muted)} name={!muted ? "volume-up-outline" : "volume-off-outline"} width={28} height={28} fill={white} />
              </Pressable>
            </View>
          }
        </>
        :
        <>
          {isCameraPermitted && device ?
            <Camera
              ref={camera}
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
              video={true}
              audio={isMicrophonePermitted}
              enableZoomGesture
            />
            :
            <View style={styles.camera}>
              <Text style={styles.text}>No camera detected.{"\n"}Please check camera & microphone permissions.</Text>
            </View>
          }
        </>
      }

      <CameraControls
        isPostMode={isPostMode}
        setIsPostMode={setIsPostMode}
        Recording={Recording}
        setRecording={setRecording}
        takePhoto={takePhoto}
        startRecording={startRecording}
        stopRecording={stopRecording}
        onSelectAsset={onSelectAsset}
      />
    </View>
  )
}

export default UploadScreen;