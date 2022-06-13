import { StyleSheet } from 'react-native';
import { black, gray, white } from '../../../assets/colors';
import { mediumText, regularText } from '../../../assets/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: white,
    },
    mainContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    postContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    postImage: {
        height: 100,
        width: 100,
        borderRadius: 2
    },
    captionInput: {
        marginLeft: 10,
        flex: 1,
        height: 100,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: gray,
        paddingHorizontal: 10,
        marginBottom: 0,
        marginTop: 0,
        color: black
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
    },
    iconContainer: {
        height: 18,
        width: 18,
        borderRadius: 4,
        backgroundColor: gray
    },
    addButtonText: {
        marginLeft: 10,
        fontFamily: regularText,
        fontSize: 14,
        color: gray,
        textAlign: 'left',
    },
    switchButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6,
    },
    switchButtonText: {
        fontFamily: regularText,
        fontSize: 14,
        color: gray,
        textAlign: 'left',
    },
    iconTextContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6,
    },
    iconTextContainerTitle: {
        fontFamily: regularText,
        fontSize: 14,
        color: gray,
        textAlign: 'left',
    },
    iconTextRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorText: {
        fontFamily: mediumText,
        fontSize: 10,
        color: white,
        textAlign: 'center',
        position: 'absolute'
    }
});

export default styles;