import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
        paddingTop: 52,
        paddingLeft: 32,
        paddingRight: 32
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    createContainer: {
        marginTop: 92
    },

    headerTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 32,
        color: '#32264D'
    },

    headerDescription: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#6A6180',
        width: 220,
        marginTop: 12
    },

    content: {
        marginTop: 98
    },

    contentTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        color: '#32264D'
    },

    nameInputBlock: {
        height: 62,
        borderStyle: 'solid',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        paddingLeft: 24,
        marginTop: 24
    },
    
    nameInput: {
        height: 62,
        fontSize: 16,
        color: '#9C98A6',
    },

    surnameInputBlock: {
        height: 62,
        borderStyle: 'solid',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 0,
        justifyContent: 'center',
        paddingLeft: 24
    },

    surnameInput: {
        height: 62,
        fontSize: 16,
        color: '#9C98A6',
    },

    nextButton: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        marginTop: 16,
    },

    nextButtonText: {
        fontFamily: 'Archivo_700Bold'
    }
});

export default styles;