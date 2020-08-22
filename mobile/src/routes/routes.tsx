import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';

import Onboarding from './Onboarding';
import AppStack from './AppStack';

function Routes() {
    const [hasLaunched, setHasLanunched] = useState<boolean | null>(null);

    useEffect(() => {
        async function handleSetHasLaunched() {
            const launched = await AsyncStorage.getItem('hasLaunched');
            
            if (launched)
                setHasLanunched(true);
            else
                setHasLanunched(false);
        }
        handleSetHasLaunched();
    }, []);

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