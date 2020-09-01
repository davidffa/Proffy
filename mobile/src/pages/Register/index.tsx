import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';

import goBackIcon from '../../assets/images/icons/goBack.png';
import registerPageFirst from '../../assets/images/icons/registerPageFirst.png';

import styles from './styles';

function Register() {
    const { goBack, navigate } = useNavigation();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (name && surname) {
            setValid(true);
        }else {
            setValid(false);
        }
    }, [name, surname]);

    function handleGoBack() {
        goBack();
    }

    function handleNavigate() {
        navigate('RegisterEmail');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={goBackIcon} />
                </TouchableOpacity>
                <Image source={registerPageFirst} />
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.createContainer}>
                    <Text style={styles.headerTitle}>Crie sua conta gratuita</Text>
                    <Text style={styles.headerDescription}>Basta preencher esses dados e você estará connosco.</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>01. Quem é você?</Text>

                    <View style={styles.nameInputBlock}>
                        <TextInput 
                            placeholder="Nome" 
                            autoCompleteType="name" 
                            autoCorrect={false}  
                            style={styles.nameInput} 
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={styles.surnameInputBlock}>
                        <TextInput 
                            placeholder="Sobrenome" 
                            autoCompleteType="name" 
                            autoCorrect={false}  
                            style={styles.surnameInput} 
                            value={surname}
                            onChangeText={text => setSurname(text)}
                        />
                    </View>
                </View>

                <RectButton onPress={handleNavigate} style={[styles.nextButton, valid ? {backgroundColor: '#8257E5'} : {backgroundColor: '#DCDCE5'}]} enabled={valid}>
                    <Text style={[styles.nextButtonText, valid ? {color: '#FFF'} : {color: '#9C98A6'}]}>Próximo</Text>
                </RectButton>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default Register;