import { StyleSheet } from 'react-native';
import { gray, primary } from '../../assets/colors';
import { mediumText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    nameContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    names: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        borderRadius: 15.5,
        borderWidth: 1,
        borderColor: gray,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: primary
    },
    name: {
        fontSize: 12,
        fontFamily: mediumText,
        color: gray,
        textAlign: 'left'
    }
});

export default styles;