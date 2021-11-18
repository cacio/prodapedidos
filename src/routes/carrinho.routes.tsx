import React from 'react'; 
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';
import { Platform } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const { Navigator,Screen } = createBottomTabNavigator();

import {ShoppingBag} from '../screens/ShoppingBag'; 
export function CarrinhoRoutes() {
    const theme = useTheme();
 return(
    <Navigator
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:theme.colors.secundary,
                tabBarInactiveTintColor:theme.colors.text,
                tabBarLabelPosition:'beside-icon',
                tabBarStyle:{
                    height: 60,
                    paddingVertical:Platform.OS === 'ios' ? 10 : 0,
                }
            }}
        >
            <Screen                 
                name="Carrinho"
                component={ShoppingBag}
                options={{
                    tabBarIcon:(({size,color})=>
                        <MaterialIcons name="format-list-bulleted" size={size} color={color}/>
                    )
                }}
            />

            <Screen 
                name="Finalizar"
                component={ShoppingBag}
                options={{
                    tabBarIcon:(({size,color})=>
                        <MaterialIcons name="swap-vertical-circle" size={size} color={color}/>
                    )
                }}
            />

        </Navigator>
  );
}