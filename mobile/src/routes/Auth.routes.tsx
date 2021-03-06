import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';

const { Navigator, Screen } = createStackNavigator();

function Auth() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Login" component={Login} />
                <Screen name="ForgotPassword" component={ForgotPassword} />
                <Screen name="Register" component={Register} />
            </Navigator>
        </NavigationContainer>
    )
}

export default Auth;