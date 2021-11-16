import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";

interface OptionsProps{
    isActive:boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme})=>theme.colors.background};
`;


export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme})=>theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;

`;
export const Title  = styled.Text`
   font-family: ${({theme})=>theme.fonts.regular};
   color: ${({theme})=>theme.colors.shape};
   font-size:${RFValue(18)}px;;
`;


export const Options = styled.TouchableOpacity<OptionsProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({isActive,theme}) => 
        isActive ? theme.colors.secundary : theme.colors.background
    };
    border-bottom-width: 1px;
    border-bottom-color:  ${({theme})=>theme.colors.text};
`;

export const Icon = styled(Feather)`
     font-size: ${RFValue(20)}px;
     margin-right: 16px;
`;

export const Name = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme})=>theme.colors.text};

`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;