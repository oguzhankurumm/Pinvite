import { StyleSheet } from 'react-native';
import { white, dark, black, primary, gray, onlineColor } from '../../assets/colors';
import { regularText, semiBoldText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: white,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15
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
        marginTop: 3,
        fontFamily: regularText,
        fontSize: 13,
        color: black
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderColor: primary,
        borderWidth: 2
    },
    dateContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    time: {
        fontFamily: regularText,
        fontSize: 12,
        color: gray,
        marginBottom: 5,
    },
    onlineStatus: {
        position: 'absolute',
        backgroundColor: onlineColor,
        right: -2,
        bottom: 12,
        width: 12,
        height: 12,
        borderRadius: 50
    }
});

export default styles;