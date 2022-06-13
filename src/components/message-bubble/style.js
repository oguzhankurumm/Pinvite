import { StyleSheet } from 'react-native';
import { black, white, primary } from '../../assets/colors';
import { mediumText, regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontFamily: regularText,
        fontSize: 13,
        color: white,
        paddingLeft: 8
    },
    myName: {
        fontFamily: regularText,
        fontSize: 13,
        color: white,
        paddingRight: 8
    },
    myMessageContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-end',
        maxWidth: '85%',
        marginBottom: 15,
    },
    myMessageLeft: {
        marginVertical: 5,
        alignSelf: 'flex-end',
        backgroundColor: primary,
        padding: 10,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    myMessageText: {
        alignSelf: 'flex-end',
        fontFamily: regularText,
        fontSize: 13,
        textAlign: 'left',
        color: white,
    },
    userMessageContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxWidth: '85%',
        marginBottom: 15
    },
    userMessageRight: {
        alignSelf: 'flex-start',
        backgroundColor: white,
        padding: 10,
        marginVertical: 5,
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    userMessageText: {
        alignSelf: 'flex-start',
        fontFamily: regularText,
        fontSize: 13,
        textAlign: 'left',
        color: black,
    },
    dateLeft: {
        marginTop: 5,
        alignSelf: 'flex-end',
        fontFamily: mediumText,
        fontSize: 10,
        textAlign: 'left',
        color: white
    },
    dateRight: {
        marginTop: 5,
        alignSelf: 'flex-start',
        fontFamily: mediumText,
        fontSize: 10,
        textAlign: 'right',
        color: white
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 50
    },
});

export default styles;