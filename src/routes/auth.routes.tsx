import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation } from '../screens/Confirmation';

const {Navigator,Screen} = createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator 
            screenOptions={{headerShown:false}}            
        >
            <Screen name="SignIn" component={Login} />
            <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
            <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
            <Screen name="Confirmation" component={Confirmation} />            
        </Navigator>
    );
}
