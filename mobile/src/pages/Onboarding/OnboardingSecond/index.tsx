import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import { useOnboarding } from '../../../contexts/onboarding';

import studyIcon from '../../../assets/images/give-classes-onboarding.png';
import onboardingBg from '../../../assets/images/backgrounds/secondOnboardingBg.png';
import onboardingPages from '../../../assets/images/onboardingPages2.png';
import front from '../../../assets/images/icons/front.png';

import styles from './styles';

function OnboardingSecond() {
    const { setLaunched } = useOnboarding();

    function handleNavigate() {
        setLaunched(true);
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
                <Text style={styles.numberText}>02.</Text>
                <Text style={styles.description}>Ou dê aulas sobre o que você mais conhece</Text>
                
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

export default OnboardingSecond;