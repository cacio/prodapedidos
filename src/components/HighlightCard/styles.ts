import styled,{css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {RFPercentage,RFValue} from 'react-native-responsive-fontsize';

interface TypesProps{
    type:'up'|'down';
}

export const Container = styled.View`
    background-color: ${({theme})=>theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(25)}px;
    margin-right: 16px;
`;

export const Header          = styled.View`
    flex-direction: row;        
`;

export const CliWrapper = styled.View`
    width: 100%;    
    flex-direction: row;    
`;

export const CliInfo = styled.View`
     margin-left: 5px;     
`;


export const Icon            = styled(Feather)<TypesProps>`    
    font-size: ${RFValue(40)}px;

    ${({type})=> type === 'down' && css`
        border: 2px solid ${({theme})=> theme.colors.attention};
        color:${({theme})=> theme.colors.attention};
    `}
    ${({type})=> type === 'up' && css`
        border: 2px solid ${({theme})=> theme.colors.success};
        color:${({theme})=> theme.colors.success};
    `}
    
    border-radius: 10px;
    padding: 2px;    
    text-align: center;    
    
`;
export const CliNome         = styled.Text`    
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const CliFantasia = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({theme})=>theme.colors.text};
`;

export const Footer          = styled.View``;
export const Amount          = styled.Text`
    font-family: ${({theme})=>theme.fonts.medium};
    font-size: ${RFValue(24)}px;
    color: ${({theme})=>theme.colors.text_dark};
    
`;
export const LastTransaction = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({theme})=>theme.colors.text};
`;