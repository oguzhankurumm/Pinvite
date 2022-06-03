import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // padding: 20,
        marginBottom: 70
    },
    logoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 150
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;