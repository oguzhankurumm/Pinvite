import React from 'react'
import { View, Dimensions } from 'react-native'
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { gradient1, gradient2, white } from '../../assets/colors';
import LogoImage from '../../assets/images/pinvite-logo-image.svg';
import LogoText from '../../assets/images/pinvite-logo-text.svg';
import { ActivityIndicator } from 'react-native-paper';

const Welcome = ({ navigation }) => {
    const { width } = Dimensions.get('window');

    return (
        <LinearGradient
            colors={[gradient1, gradient2]}
            style={styles.container}
            start={{ x: -0.9, y: 0.2 }}
            end={{ x: 0.45, y: 1.0 }}
        >
            <View style={styles.mainContainer}>
                <View style={styles.logoContainer}>
                    <LogoImage width={width} />
                    <LogoText width={width} style={{ marginTop: 20 }} />
                </View>
                <View style={styles.buttonsContainer}>
                    <ActivityIndicator
                        animating={true}
                        color={white}
                        size={'large'}
                    />
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome;