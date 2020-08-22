import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, Image, Text, TouchableOpacity } from 'react-native';

import studyIcon from '../../../assets/images/studyOnboarding.png';
import onboardingBg from '../../../assets/images/backgrounds/firstOnboardingBg.png';
import onboardingPages from '../../../assets/images/onboardingPages.png';
import front from '../../../assets/images/icons/front.png';

import styles from './styles';

function OnboardingFirst() {
    const { navigate } = useNavigation();

    function handleNavigate() {
        navigate('OnboardingSecond');
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.backgroundView}>
                <Image 
                    source={onboardingBg} 
                    style={styles.onboardingBackground} 
                />
                <Image 
                    source={studyIcon}
                    style={styles.studyIcon}
                />
            </View>
            <View style={styles.contentView}>
                <Text style={styles.numberText}>01.</Text>
                <Text style={styles.description}>Encontre vários professores para ensinar você</Text>
                
                <View style={styles.footer}>
                    <Image source={onboardingPages} />

                    <TouchableOpacity onPress={handleNavigate}>
                        <Image source={front} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default OnboardingFirst;