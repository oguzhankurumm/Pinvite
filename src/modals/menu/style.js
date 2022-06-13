import { StyleSheet } from 'react-native';
import { black, lightGray } from '../../assets/colors';
import { regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        flex: 1
    },
    containerInput: {
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10
    },
    input: {
        fontFamily: regularText,
        color: black,
        fontSize: 13,
        backgroundColor: lightGray,
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 16
    }
});

export default styles;