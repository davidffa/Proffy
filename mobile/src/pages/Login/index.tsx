import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler';

import bgImage from '../../assets/images/backgrounds/loginBackground.png';
import proffy from '../../assets/images/Proffy.png';
import eye from '../../assets/images/icons/eye.png';
import eyeDivided from '../../assets/images/icons/eyeDivided.png';

import styles from './styles';

function Login() {
    const [remember, setRemember] = useState(false);
    const [visible, setVisible] = useState(false);

    function handleLogin() {

    }

    function handleForgotPassword() {
        //navigate to forgotpassword screen
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={bgImage} style={styles.backgroundImage} />
                <Image source={proffy} />
                <Text style={styles.logoDescription}>Sua plataforma de estudos online.</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Fazer login</Text>

                    <TouchableOpacity>
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
                        />
                    </View>

                    <View style={styles.passwordInputBlock}>
                        <TextInput 
                            placeholder="Senha" 
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            secureTextEntry={visible ? false : true} 
                            style={styles.passwordInput} 
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

                <RectButton onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </RectButton>
            </View>
        </View>
    )
}

export default Login;