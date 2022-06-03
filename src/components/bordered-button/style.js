import { StyleSheet } from 'react-native';
import { white } from '../../assets/colors';
import { mediumText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: white,
        borderRadius: 21,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: mediumText,
        fontSize: 14,
        color: white,
    }
});

export default styles;