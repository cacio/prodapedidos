import React  from 'react';
import {TouchableOpacityProps} from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {Button,ImgemContainer,Title} from './styles';

interface Props extends TouchableOpacityProps{
    title:string;
    svg:React.FC<SvgProps>
}

export function SignInSocialButton({title,svg:Svg,...rest}:Props){
    return (
        <Button {...rest}>
            <ImgemContainer>
                <Svg/>
            </ImgemContainer>
            <Title>
                {title}
            </Title>
        </Button>
    );
}