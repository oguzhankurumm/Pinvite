import { StyleSheet } from 'react-native';
import { primary, white } from '../../../assets/colors';
import { mediumText, regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: white
    },
    rightButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightButtonText: {
        fontFamily: mediumText,
        fontSize: 14,
        color: primary,
    }
});

export default styles;