import { StyleSheet } from 'react-native';
import { white, gray } from '../../assets/colors';
import { boldText, regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    name: {
        fontFamily: boldText,
        fontSize: 16,
        color: white
    },
    username: {
        fontFamily: regularText,
        fontSize: 14,
        color: white
    },
    image: {
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: white,
        width: 72,
        height: 72,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightOne: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightTwo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    followContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    followCountText: {
        fontFamily: regularText,
        fontSize: 20,
        color: white,
        textAlign: 'center'
    },
    followText: {
        fontFamily: regularText,
        fontSize: 14,
        color: white,
        textAlign: 'center'
    },
    editProfileButton: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15.5,
        borderWidth: 1,
        borderColor: gray
    },
    editProfileText: {
        fontFamily: regularText,
        fontSize: 13,
        color: white
    },
    followButton: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15.5,
    },
    followButtonText: {
        fontFamily: regularText,
        fontSize: 13,
        color: white
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: gray,
        marginTop: 20
    },
    bioContainer: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bioText: {
        fontFamily: regularText,
        fontSize: 14,
        color: white
    }
});

export default styles;