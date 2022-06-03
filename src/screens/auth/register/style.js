import { StyleSheet } from 'react-native';
import { black, white } from '../../../assets/colors';
import { lightText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: white,
        padding: 15
    },
    title: {
        fontFamily: lightText,
        fontSize: 36,
        color: black,
        marginBottom: 15,
    }
});

export default styles;