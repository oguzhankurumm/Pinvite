import { StyleSheet } from 'react-native';
import { black } from '../../../assets/colors';
import { mediumText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10
    },
    text: {
        fontFamily: mediumText,
        fontSize: 14,
        color: black
    }

});

export default styles;