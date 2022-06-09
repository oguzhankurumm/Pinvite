import { StyleSheet } from 'react-native';
import { gray, primary, white } from '../../assets/colors';
import { mediumText } from '../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    leftText: {
        fontFamily: mediumText,
        fontSize: 14,
        color: gray
    },
    rightText: {
        fontFamily: mediumText,
        fontSize: 14,
        color: primary
    }
});

export default styles;