import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './style';
import MiniHeader from '../../../components/mini-header';
import CameraControls from '../../../components/camera-controls';
import { Camera, useCameraDevices, PhotoFile, VideoFile } from 'react-native-vision-camera';

const UploadScreen = ({ navigation }) => {
  const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef(null);
  const [isCameraPermitted, setIsCameraPermitted] = useState(false);
  const [isMicrophonePermitted, setIsMicrophonePermitted] = useState(false);
  const [isPostMode, setIsPostMode] = useState(true);
  const [Recording, setRecording] = useState(false);

  const checkPermissions = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus()
    const microphonePermission = await Camera.getMicrophonePermissionStatus()
    if (cameraPermission === 'authorized' && microphonePermission === 'authorized') {
      setIsCameraPermitted(true);
      setIsMicrophonePermitted(true);
    } else {
      const newCameraPermission = await Camera.requestCameraPermission()
      const newMicrophonePermission = await Camera.requestMicrophonePermission()
      if (newCameraPermission === 'authorized' && newMicrophonePermission === 'authorized') {
        setIsCameraPermitted(true);
        setIsMicrophonePermitted(true);
      } else {
        setIsCameraPermitted(false);
        setIsMicrophonePermitted(false);
      }
    }
  }

  const onSelectAsset = item => {
    console.log(item[0])
    navigation.navigate('PostScreen', { selectedMedia: item[0] })
  }

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      quality: 100
    })
    console.log(photo)
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
    camera.current.stopRecording()
  }

  useEffect(() => {
    checkPermissions()
  }, []);

  return (
    <View style={styles.container}>
      <MiniHeader
        onLeftPress={null}
        hideLeftButton
      />
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