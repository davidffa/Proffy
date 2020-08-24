import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';

import { useOnboarding } from '../contexts/onboarding';
import { useAuth } from '../contexts/auth';

import Onboarding from './Onboarding.routes';
import AppStack from './AppStack.routes';
import Auth from './Auth.routes';

function Routes() {
    const { hasLaunched } = useOnboarding();
    const { signed } = useAuth(); 

    if (hasLaunched === null) {
        return <AppLoading />
    }else if (!hasLaunched) {
        return (
            <>
                <Onboarding />
                <StatusBar style="light" />
            </>
        );
    }else if (!signed) {
        return (
            <>
                <Auth />
                <StatusBar style="light" />
            </>
        )
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