import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingFirst from '../pages/Onboarding/OnboardingFirst';
import OnboardingSecond from '../pages/Onboarding/OnboardingSecond';

const { Navigator, Screen } = createStackNavigator();

function Onboarding() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="OnboardingFirst" component={OnboardingFirst} />
                <Screen name="OnboardingSecond" component={OnboardingSecond} />
            </Navigator>
        </NavigationContainer>
    )
}

export default Onboarding;