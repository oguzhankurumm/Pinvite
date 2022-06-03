import { StyleSheet } from 'react-native';
import { black, gray, white } from '../../assets/colors';
import { regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    input: {
        paddingVertical: 10,
        borderColor: black,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: gray,
        color: white,
        fontFamily: regularText,
        fontSize: 14,
        marginTop: 3
    },
    label: {
        fontFamily: regularText,
        fontSize: 14,
        color: gray
    }
});

export default styles;