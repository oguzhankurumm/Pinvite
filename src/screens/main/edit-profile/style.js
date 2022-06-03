import { StyleSheet } from 'react-native';
import { dark, gray, primary, white } from '../../../assets/colors';
import { regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: dark,
        padding: 15
    },
    keyboard: {
        flex: 1,
        backgroundColor: dark,
    },
    avatarContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 110,
        height: 110,
        borderWidth: 1.5,
        borderColor: white,
        borderRadius: 100
    },
    changeAvatarButton: {
        padding: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeAvatarText: {
        fontFamily: regularText,
        fontSize: 14,
        color: primary
    },
    saveButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15.5,
        borderWidth: 1,
        borderColor: gray
    },
    saveButtonText: {
        fontFamily: regularText,
        fontSize: 13,
        color: white
    },
});

export default styles;