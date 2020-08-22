import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import OnboardingFirst from '../pages/Onboarding/OnboardingFirst';
import OnboardingSecond from '../pages/Onboarding/OnboardingSecond';

const { Navigator, Screen } = createStackNavigator();

function Onboarding() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
                <Screen name="OnboardingFirst" component={OnboardingFirst} options={{...TransitionPresets.SlideFromRightIOS}}/>
                <Screen name="OnboardingSecond" component={OnboardingSecond} options={{...TransitionPresets.SlideFromRightIOS}}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default Onboarding;