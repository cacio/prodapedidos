import React from 'react';
//import { RectButtonProps } from 'react-native-gesture-handler';
import {TouchableOpacityProps} from 'react-native';

import { Container,Title } from './styles';
interface Props extends TouchableOpacityProps{
    title:string;
    onPress:()=>void;
    ligth?:boolean;
    enable?:boolean;
};

export function Button({ title,onPress,enable = true,ligth = false,...rest}:Props){
    return(
        <Container             
            onPress={onPress} 
            {...rest}            
            >
            <Title ligth={ligth}>
                {title}
            </Title>
        </Container>

    );

}