import { StyleSheet } from 'react-native';
import { black, primary, white } from '../../../assets/colors';
import { regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: white
    },
    flatlist: {
        marginTop: 10,
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: white
    },
    conversationContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        margin: 5,
        alignSelf: 'flex-end',
        padding: 8,
        backgroundColor: primary,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomLeftRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontFamily: regularText,
        fontSize: 14,
        color: black,
        textAlign: 'center'
    },
});

export default styles;