import { StyleSheet } from 'react-native';
import { white, dark, black, primary, gray, onlineColor } from '../../assets/colors';
import { regularText, semiBoldText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15
    },
    subContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: white,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15
    },
    divider: {
        backgroundColor: gray,
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        fontFamily: semiBoldText,
        fontSize: 14,
        color: dark,
    },
    msg: {
        marginTop: 5,
        fontFamily: regularText,
        fontSize: 14,
        color: black
    },
    time: {
        fontFamily: regularText,
        fontSize: 14,
        color: black,
        marginBottom: 5,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 50,
        borderColor: primary,
        borderWidth: 2
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    onlineStatus: {
        position:'absolute',
        backgroundColor: onlineColor,
        right:-2,
        bottom:12,
        width: 12,
        height: 12,
        borderRadius:50
    }
});

export default styles;