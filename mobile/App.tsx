import React from 'react';

import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_500Medium, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { Onboarding } from './src/contexts/onboarding';

import Routes from './src/routes/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <Onboarding>
        <AppLoading />
      </Onboarding>
    );
  }else {
    return (
      <Onboarding>
        <Routes />
      </Onboarding>
    );
  }  
}
