import { StyleSheet } from 'react-native';
import { gray, primary, white } from '../../assets/colors';
import { regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: white,
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    tab: {
        flexDirection:'row',
        backgroundColor: white,
        width: '33%',
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        flexDirection:'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        backgroundColor: white,
        shadowOpacity: 0.2,
        width: '33%',
        backgroundColor: white,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        fontFamily: regularText,
        fontSize: 14,
        color: gray
    },
    selectedText: {
        fontFamily: regularText,
        fontSize: 14,
        color: primary
    }
});

export default styles;