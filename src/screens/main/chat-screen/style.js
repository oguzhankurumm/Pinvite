import { StyleSheet } from 'react-native';
import { black, white } from '../../../assets/colors';
import { regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: white
    },
    flatlist: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: white
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
        backgroundColor: white,
        borderRadius: 41,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 16
    },
    sendButton: {
        height: 32,
        width: 32,
        borderRadius: 50,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;