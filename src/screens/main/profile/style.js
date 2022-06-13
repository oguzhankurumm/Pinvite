import { StyleSheet } from 'react-native';
import { dark, white, } from '../../../assets/colors';
import { regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: dark,
    },
    galleryContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyContainer: {
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontFamily: regularText,
        fontSize: 14,
        color: white,
        textAlign: 'center'
    },
});

export default styles;