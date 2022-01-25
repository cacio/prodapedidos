import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator,Screen} = createStackNavigator();

import { AppRoutes } from './app.routes';
import { Clientes} from '../screens/Clientes';
import { ProductView } from '../screens/ProductView';
import { DetailsProduct} from '../screens/DetailsProduct';
import { checkout } from '../screens/checkout';
import { Profile } from '../screens/Profile';
import { MeusPedidos } from '../screens/MeusPedidos';
import { Confirmation } from '../screens/Confirmation';

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

            <Screen 
                name="ProuctView" 
                component={ProductView}                 
                options={{
                    gestureEnabled:true,
                    gestureDirection:'horizontal',
                    headerMode:'screen'
                }}
            />

             <Screen 
                name="DetailsProduct" 
                component={DetailsProduct}                 
                options={{
                    gestureEnabled:true,
                    gestureDirection:'horizontal',
                    headerMode:'screen'
                }}
            />

            <Screen 
                name="checkout" 
                component={checkout}                 
                options={{
                    gestureEnabled:true,
                    gestureDirection:'horizontal',
                    headerMode:'screen'
                }}
            />

            <Screen 
                name="Profile" 
                component={Profile}                 
                options={{
                    gestureEnabled:true,
                    gestureDirection:'horizontal',
                    headerMode:'screen'
                }}
            />

        <Screen 
                name="MeusPedidos" 
                component={MeusPedidos}                 
                options={{
                    gestureEnabled:true,
                    gestureDirection:'horizontal',
                    headerMode:'screen'
                }}
            />

            <Screen name="Confirmation" component={Confirmation} /> 
        </Navigator>

    );
}

