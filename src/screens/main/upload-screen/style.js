import { StyleSheet } from 'react-native';
import { white } from '../../../assets/colors';
import { regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: white,
    },
    camera: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: regularText,
        fontSize: 14,
        color: white,
        textAlign: 'center',
        padding: 20
    },
    rightIconsContainer: {
        position: 'absolute',
        padding: 10,
        top: 20,
        right: 10,
        bottom: 20,
    },
});

export default styles;