import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import bgImage from '../../assets/images/backgrounds/loginBackground.png';
import proffy from '../../assets/images/Proffy.png';
import eye from '../../assets/images/icons/eye.png';
import eyeDivided from '../../assets/images/icons/eyeDivided.png';

import styles from './styles';

function Login() {
    const { signIn } = useAuth();
    const { navigate } = useNavigation();

    const [remember, setRemember] = useState(false);
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regExEmail.test(email) && password.length >= 8) {
            setValid(true);
        }else {
            setValid(false);
        }
    }, [email, password]);

    async function handleLogin() {
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (valid)
            await signIn(email, password, remember);
        else {
            if (!regExEmail.test(email)) {
                Alert.alert('Erro', 'E-mail inválido');
            }else {
                Alert.alert('Erro', 'A password tem de ter 8 caracteres ou mais');
            }
        }
    }

    function handleForgotPassword() {
        navigate('ForgotPassword')
    }

    function handleRegister() {
        navigate('Register');
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.background}>
                <Image source={bgImage} style={styles.backgroundImage} />
                <Image source={proffy} />
                <Text style={styles.logoDescription}>Sua plataforma de estudos online.</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Fazer login</Text>

                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.createAccount}>Criar uma conta</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.emailInputBlock}>
                        <TextInput 
                            placeholder="E-mail" 
                            autoCompleteType="email" 
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            style={styles.emailInput} 
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    <View style={styles.passwordInputBlock}>
                        <TextInput 
                            placeholder="Senha" 
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            secureTextEntry={visible ? false : true} 
                            style={styles.passwordInput} 
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity onPress={e => setVisible(!visible)}>
                            {
                                visible ? (
                                    <Image 
                                        source={eyeDivided}
                                        style={styles.eye}
                                    /> 
                                ) :
                                (
                                    <Image 
                                        source={eye}
                                        style={styles.eye}
                                    /> 
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formFooter}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox 
                            value={remember}
                            onValueChange={(value: boolean) => setRemember(value)}
                            tintColors={{ true: '#04D361', false: '#E6E6F0' }}
                        />
                        <Text style={styles.rememberText}>Lembrar-me</Text>
                    </View>

                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>

                <RectButton onPress={handleLogin} style={[styles.loginButton, valid ? {backgroundColor: '#04D361'} : {backgroundColor: '#DCDCE5'}]} enabled={valid}>
                    <Text style={[styles.loginButtonText, valid ? {color: '#FFF'} : {color: '#9C98A6'}]}>Entrar</Text>
                </RectButton>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login;