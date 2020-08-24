import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface OnboardingContextData {
    hasLaunched: boolean | null;
    setLaunched(param: boolean): void;
}

const OnboardingContext = createContext<OnboardingContextData>({} as OnboardingContextData)

export const Onboarding: React.FC = ({ children }) => {
    const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);

    useEffect(() => {
        async function handleSetHasLaunched() {
            const launched = await AsyncStorage.getItem('hasLaunched');
            
            if (launched)
                setHasLaunched(true);
            else
                setHasLaunched(false);
        }
        handleSetHasLaunched();
    }, []);

    function setLaunched(param: boolean) {
        setHasLaunched(param);

        AsyncStorage.setItem('hasLaunched', String(param));
    }

    return (
        <OnboardingContext.Provider value={{ hasLaunched, setLaunched }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);

    return context;
}

export default OnboardingContext;