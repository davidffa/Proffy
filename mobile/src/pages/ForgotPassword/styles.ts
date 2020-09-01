import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },

    background: {
        height: 320,
        backgroundColor: '#8257E5',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },

    backgroundImage: {
        position: 'absolute',
    },

    logoDescription: {
        marginBottom: -10,
        color: '#D4C2FF',
        maxWidth: 160,
    },

    content: {
        flex: 1,
        padding: 28
    },

    title: {
        fontSize: 24,
        fontFamily: 'Archivo_700Bold',
        color: '#32264D',
        marginTop: 62
    },

    description: {
        color: '#6A6180',
        marginTop: 18,
        width: 140,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular'
    },

    emailInputBlock: {
        height: 62,
        borderStyle: 'solid',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 24,
        marginTop: 36
    },
    
    emailInput: {
        height: 62,
        fontSize: 16,
        color: '#9C98A6',
    },

    sendButton: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        marginTop: 16,
    },

    sendButtonText: {
        fontFamily: 'Archivo_700Bold'
    }
});

export default styles;