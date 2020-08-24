import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';

import { useOnboarding } from '../contexts/onboarding';

import Onboarding from './Onboarding.routes';
import AppStack from './AppStack.routes';


function Routes() {
    const { hasLaunched } = useOnboarding();

    if (hasLaunched === null) {
        return <AppLoading />
    }else if (!hasLaunched) {
        return (
            <>
                <Onboarding />
                <StatusBar style="light" />
            </>
        );
    }else {
        return (
            <>
                <AppStack />
                <StatusBar style="light" />
            </>
        );
    }
}

export default Routes;