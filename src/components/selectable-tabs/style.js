import { StyleSheet } from 'react-native';
import { primary, white } from '../../assets/colors';
import { regularText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        width: '95%',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8.84,
        elevation: 5,
    },
    tab: {
        flexDirection: 'row',
        width: '33%',
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
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
        color: white
    },
    selectedText: {
        fontFamily: regularText,
        fontSize: 14,
        color: primary
    }
});

export default styles;