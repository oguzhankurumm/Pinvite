import { StyleSheet } from 'react-native';
import { black, white } from '../../assets/colors';
import { mediumText, regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 15
    },
    image: {
        width: 115,
        height: 160,
        borderRadius: 11
    },
    name: {
        paddingVertical: 5,
        fontSize: 12,
        fontFamily: mediumText,
        color: black,
        width: 115,
        textAlign: 'center'
    },
    followButton: {
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
    },
    followButtonText: {
        fontFamily: regularText,
        fontSize: 12,
        color: white
    },
});

export default styles;