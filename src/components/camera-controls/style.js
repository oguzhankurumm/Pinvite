import { StyleSheet } from 'react-native';
import { black, gray, lightGray, white } from '../../assets/colors';
import { mediumText, regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: white,
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    galleryButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontFamily: regularText,
        fontSize: 13,
        color: lightGray
    },
    textBold: {
        marginTop: 10,
        fontFamily: mediumText,
        fontSize: 13,
        color: black
    },
    modeContainer: {
        left: 8,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    cameraModes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cameraIcon: {
        left: -15,
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: lightGray,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraInside: {
        width: 45,
        height: 45,
        backgroundColor: lightGray,
        borderRadius: 100
    },
});

export default styles;