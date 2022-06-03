import { StyleSheet } from 'react-native';
import { black, gray } from '../../../assets/colors';
import { mediumText, regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    followPageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText: {
        paddingHorizontal: 20,
        paddingTop: 100,
        fontSize: 23,
        fontFamily: mediumText,
        color: black,
        textAlign: 'center'
    },
    headerDescription: {
        paddingHorizontal: 20,
        marginTop: 17,
        fontSize: 15,
        fontFamily: regularText,
        color: gray,
        textAlign: 'center'
    },
    followPageScrollView: {
        width: '100%',
        paddingTop: 50
    },
    followPageScrollViewContentContainer: {
        paddingVertical: 20,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default styles;