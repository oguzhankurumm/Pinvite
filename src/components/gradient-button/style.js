import { StyleSheet } from 'react-native';
import { white } from '../../assets/colors';
import { regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
    },
    title: {
        fontFamily: regularText,
        fontSize: 12,
        color: white
    },
});

export default styles;