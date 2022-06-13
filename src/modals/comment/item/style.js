import { StyleSheet } from 'react-native';
import { black, gray } from '../../../assets/colors';
import { mediumText, regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    containerText: {
        marginHorizontal: 15,
        flex: 1,
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 16
    },
    name: {
        fontFamily: regularText,
        fontSize: 13,
        color: gray
    },
    comment: {
        paddingVertical: 2,
        fontFamily: mediumText,
        fontSize: 13,
        color: black
    },
    time: {
        fontFamily: regularText,
        fontSize: 11,
        color: gray
    }

});

export default styles;