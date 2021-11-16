import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 
import {TouchableOpacity} from 'react-native';
export const Container = styled(TouchableOpacity)`        
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Product = styled.View`
    width: 100%;     
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

export const ProductWrapper = styled.View`
    width: 80%;
    flex-direction :row;
    justify-content: flex-start;
    align-items: flex-start;

`;

export const Nome = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.bold};
    margin-right: 5px;
`;

export const Unit = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.bold};
    margin-right: 5px;
`;

export const Price = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.bold};
    margin-right: 5px;
`;

export const Details = styled.View`
    width: 100%;
    flex-direction :row;   
    justify-content: center;
    align-items: center;
`;

export const Estoque = styled.Text`
    font-size: ${RFValue(11)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.secundary};
    margin-right: 5px;
`;

export const Pc = styled.Text`
    font-size: ${RFValue(11)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.secundary};
    margin-right: 5px;
`;

export const PesoMedio = styled.Text`
    font-size: ${RFValue(11)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.secundary};
    margin-right: 5px;
`;