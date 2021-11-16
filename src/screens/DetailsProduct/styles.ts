import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 

export const Container = styled.View`
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

export const Content = styled.ScrollView`
    width: 100%;   
    
`;

export const HeaderOpcoes = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const ContentSelected = styled.View`
    width: 50%;
    margin-left: 10px;
    margin-right: 10px;
`;

export const ContentQuantidade = styled.View`
    width: 40%;    
    margin-right: 10px;
`;

export const Label = styled.Text`
    width: 100%;
    padding: 4px 5px;
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
`;

export const DetailsProducts = styled.View`
    background-color: ${({theme})=>theme.colors.shape};
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 8px;
`;

export const ContentProduct = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
    padding: 10px 10px;
`;

export const Nome = styled.Text`
    width: 45%;
    font-size: ${RFValue(18)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
`;

export const Unidade = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
`;

export const ContentInputPrice = styled.View`
    width: 45%;    
    flex-direction :row;  
    justify-content: space-between;
    align-items: center;        
    border-width    : 1px;
    border-color: ${({theme})=>theme.colors.borderinput};
    border-radius:8px;
`;

export const Details = styled.View`
    width: 100%;
    flex-direction :row;   
    justify-content: space-between;
    align-items: center; 
    padding: 10px 10px;  
    margin-bottom: 10px;
`;

export const Estoque = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.success};
    margin-right: 5px;
`;

export const Pc = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.success};
    margin-right: 5px;
`;

export const PesoMedio = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.success};
    margin-right: 5px;
`;

export const Footer = styled.View`
    
    background-color: ${({theme})=>theme.colors.shape};
    flex-direction :row;   
    justify-content: space-between;
    align-items: center; 
    padding: 10px 10px;  
    margin: 10px 10px; 
    border-radius: 8px;   
`;
export const TotalItens = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
`;
export const TotalPrice = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
`;

export const LabelPrice = styled.Text`
    height: 100%;
    font-size: ${RFValue(18)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
    margin: 5px 5px;
    border-right-width: 2px;    
    border-right-color: ${({theme})=>theme.colors.borderinput};
`; 

export const FooterContent = styled.View`
    padding: 10px;
`;