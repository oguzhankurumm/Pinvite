import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { white } from '../../assets/colors';
import LoadingAnimation from '../../assets/animations/loading.json'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get("window");

const LoadingModal = () => {
    const { changeLoading } = useSelector(state => state.authReducer);
    return (
        <Modal
            isVisible={changeLoading}
            useNativeDriverForBackdrop
            style={styles.modalStyle}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.5}
        >
            <View style={styles.container}>
                <View style={styles.indicator}>
                    <LottieView
                        source={LoadingAnimation}
                        style={{
                            width: '100%',
                            height: 200
                        }}
                        autoPlay
                        loop
                        speed={2}
                    />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalStyle: {
        justifyContent: 'center',
        margin: 0,
        width,
        height,
    },
    indicator: {
        height: 100,
        width: 100,
        backgroundColor: white,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingModal;
