import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator,Screen} = createStackNavigator();

import { AppRoutes } from './app.routes';
import { Clientes} from '../screens/Clientes';

export function RoutesStack(){
    return (
        <Navigator
            screenOptions={{headerShown:false}}
        >

            <Screen                 
                name="home"
                component={AppRoutes}               
            />

            <Screen 
                name="Clientes" 
                component={Clientes} 
                
                options={{
                    gestureEnabled:true,
                    gestureDirection:'horizontal',
                    headerMode:'screen'
                }}
            />

        </Navigator>

    );
}

