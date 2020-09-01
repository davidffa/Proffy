import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';

import bgImage from '../../assets/images/backgrounds/loginBackground.png';
import proffy from '../../assets/images/Proffy.png';
import goBackIcon from '../../assets/images/icons/goBack.png';

import api from '../../services/api';

import styles from './styles';

function ForgotPassword() {
    const { goBack, navigate } = useNavigation();

    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regExEmail.test(email)) {
            setValid(true);
        }else {
            setValid(false);
        }
    }, [email]);

    function handleGoBack() {
        goBack();
    }

    async function handleForgotPassword() {
        try {
            await api.post('forgot_password', {
                email,
            });

            Alert.alert('Sucesso', 'E-mail de recuperação enviado!');

            navigate('Login')
        }catch (err) {
            Alert.alert('Erro', 'E-mail não registado!');
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.background}>
                <Image source={bgImage} style={styles.backgroundImage} />
                <Image source={proffy} />
                <Text style={styles.logoDescription}>Sua plataforma de estudos online.</Text>
            </View>
            <View style={styles.content}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={goBackIcon} /> 
                </TouchableOpacity>

                <Text style={styles.title}>Esqueceu sua senha?</Text>
                <Text style={styles.description}>Não se preocupe, vamos resolver isso.</Text>

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

                <RectButton onPress={handleForgotPassword} style={[styles.sendButton, valid ? {backgroundColor: '#04D361'} : {backgroundColor: '#DCDCE5'}]} enabled={valid}>
                    <Text style={[styles.sendButtonText, valid ? {color: '#FFF'} : {color: '#9C98A6'}]}>Enviar</Text>
                </RectButton>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ForgotPassword;