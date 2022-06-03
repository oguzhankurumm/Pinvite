import { StyleSheet } from 'react-native';
import { black, white } from '../../assets/colors';
import { boldText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: white,
        borderRadius: 6,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: black
    },
    text: {
        fontFamily: boldText,
        fontSize: 14,
        color: black,
    }
});

export default styles;