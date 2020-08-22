import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },

    backgroundView: {
        height: '45%',
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    onboardingBackground: {
        position: 'absolute',
    },

    studyIcon: {
        marginTop: 40
    },

    contentView: {
        flex: 1,
        paddingTop: 80,
        paddingLeft: 40,
        paddingRight: 40,
    },

    numberText: {
        fontSize: 40,
        fontFamily: 'Archivo_500Medium',
        color: '#6A6180',
        opacity: 0.16
    },

    description: {
        marginTop: 30,
        fontSize: 24,
        fontFamily: 'Archivo_500Medium',
        color: '#6A6180',
        maxWidth: 200
    },

    footer: {
        flexDirection: 'row',
        marginTop: 70,
        justifyContent: 'space-between'
    }
});

export default styles;