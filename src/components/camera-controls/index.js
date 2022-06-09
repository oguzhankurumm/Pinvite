import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import styles from './style';
import { lightGray } from '../../assets/colors';
import { launchImageLibrary } from 'react-native-image-picker';

export const CameraControls = ({ onSelectAsset, startRecording, stopRecording, takePhoto, isPostMode, setIsPostMode, Recording, setRecording }) => {

    const launchGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: "mixed",
            includeBase64: true,
            selectionLimit: 1
        });
        if (!result.didCancel) {
            onSelectAsset(result.assets);
        }
    }


    return (
        <View style={styles.container}>
            <Pressable style={styles.galleryButton} onPress={launchGallery}>
                <Icon name="image-outline" width={28} height={28} fill={lightGray} />
                <Text style={styles.text}>Gallery</Text>
            </Pressable>
            <View style={styles.modeContainer}>
                <Pressable
                    onPress={takePhoto}
                    onLongPress={startRecording}
                    onPressOut={stopRecording}
                    style={[styles.cameraIcon, { borderColor: Recording ? 'red' : lightGray }]}
                >
                    <View style={[styles.cameraInside, { backgroundColor: Recording ? 'red' : lightGray }]} />
                </Pressable>
                <Pressable onPress={() => setIsPostMode(!isPostMode)} style={styles.cameraModes}>
                    <View>
                        <Text style={styles.textBold}>{isPostMode ? "Post" : "Story"}</Text>
                    </View>
                    <View style={{ paddingLeft: 30 }}>
                        <Text style={styles.text}>{!isPostMode ? "Post" : "Story"}</Text>
                    </View>
                </Pressable>
            </View>
            <View />
        </View>
    )
};

export default CameraControls;