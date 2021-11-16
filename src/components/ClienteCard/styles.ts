import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {Image,TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`  
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Content = styled.View`   
    width: 100%; 
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;     
    background-color: ${({theme})=> theme.colors.shape};    
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(25)}px;    
    margin-top:5px;        
    border-left-width:1px;
    border-left-color: ${({theme})=> theme.colors.primary}; 
`;

export const PhotoWrapper = styled.View``;

export const Photo = styled(Image)`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const InfoCliente = styled.View`
    width: 100%;
    margin-left: 8px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const Nome = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme})=> theme.fonts.bold};
    text-transform: uppercase;
`;

export const NomeFantasia = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=> theme.fonts.regular};
    color:${({theme})=> theme.colors.text_dark};
    text-transform: uppercase;
`;

export const LabelAtivo = styled.Text`
    width: ${RFValue(50)}px;
    height: ${RFValue(25)}px;
    background-color: ${({theme})=> theme.colors.success_light};
    border-radius: 10px;
    text-align: center;
    margin-top: 5px;
    padding: 3px;
`;

export const ContentAction = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 5px;

`;

export const Botton = styled.TouchableOpacity`          
    padding: 8px 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.colors.background};
    border-width: 1px;
    border-color: ${({theme})=> theme.colors.primary};
    border-radius: 5px;
    margin-right: 5px;
`;

export const IconBotton = styled(Feather)`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.text_dark};
    font-weight: 700;
    margin-right: 5px;    
`;

export const Name = styled.Text`
    color: ${({theme})=> theme.colors.text_dark};
    font-weight: bold;
`;