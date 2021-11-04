import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { RoutesStack } from './dashboard.routes';
import {useAuth} from '../hooks/auth';

export function Routes(){
    
    const { user } = useAuth();

    return(
        <NavigationContainer>
           { user.id ? <RoutesStack/> :<AuthRoutes/>}
        </NavigationContainer>
    )
    
}