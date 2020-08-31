import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },

    background: {
        height: '45%',
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

    formHeader: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: 38
    },

    formTitle: {
        fontSize: 24,
        fontFamily: 'Archivo_700Bold'
    },
    
    createAccount: {
        color: '#8257E5',
        marginTop: 8,
    },

    inputContainer: {
        marginTop: 28,
        position: 'relative'
    },

    emailInputBlock: {
        height: 62,
        borderStyle: 'solid',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        paddingLeft: 24
    },
    
    emailInput: {
        height: 62,
        fontSize: 16,
        color: '#9C98A6',
    },

    passwordInputBlock: {
        flexDirection: 'row',
        height: 62,
        borderStyle: 'solid',
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 24
    },

    passwordInput: {
        height: 62,
        width: '75%',
        fontSize: 16,
        color: '#9C98A6',
    },

    eye: {
        height: 34,
        width: 34,
        marginRight: 24
    },

    formFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    rememberText: {
        color: '#9C98A6'
    },

    forgotPassword: {
        color: '#9C98A6'
    },

    loginButton: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        marginTop: 16,
    },

    loginButtonText: {
        fontFamily: 'Archivo_700Bold'
    }
});

export default styles;