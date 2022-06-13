import { StyleSheet } from 'react-native';
import { black, white } from '../../assets/colors';
import { mediumText } from '../../assets/fonts';

const styles = StyleSheet.create({
    input: {
        backgroundColor: white,
        padding: 10,
        borderWidth: 2,
        borderColor: black,
        borderRadius: 6,
        marginBottom: 15,
    },
    label: {
        fontFamily: mediumText,
        fontSize: 14,
        color: black,
        marginBottom: 5
    }
});

export default styles;