import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    image: {
        width: Dimensions.get('window').width / 3.4,
        height: Dimensions.get('window').width / 3.4,
        margin: 3
    }
});

export default styles;