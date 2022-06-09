import { StyleSheet, Dimensions } from 'react-native';
import { white } from '../../assets/colors';
import { regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height - 126,
    },
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    linear: {
        position: 'absolute',
        borderRadius: 12,
        width: '100%',
        height: 200
    },
    uiContainer: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    rightContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iconRightContainer: {
        marginRight: 15,
        marginTop: 20,

    },
    bottomContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bottomSecond: {
        flex: 1,
        paddingLeft: 5,
    },
    sideText: {
        fontFamily: regularText,
        color: white
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginRight: 10,
        borderWidth: 2,
        borderColor: white
    },
    username: {
        fontFamily: regularText,
        fontWeight: '600',
        color: white
    },
    date: {
        fontFamily: regularText,
        color: white,
        paddingVertical: 2,
    },
    description: {
        fontFamily: regularText,
        color: white
    }
});

export default styles;