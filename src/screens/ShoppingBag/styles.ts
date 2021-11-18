import { TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 
import {Feather} from '@expo/vector-icons';
export const Container = styled.View`
 flex: 1;
 width  : 100%;
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


 export const Content = styled.View`
    
    flex-direction :row; 
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme})=>theme.colors.shape};    
    padding:10px 10px;
    margin: 5px;    
    border-radius: 5px;
 `;

 export const ItemCarrinho = styled(TouchableOpacity)`  
    width  : 90%;
    flex-direction :row; 
    justify-content: space-between;
    align-items: center;        
 `;

 export const ProdutoWrapper = styled.View`
   width: 60%;
 `;

 export const Nome = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
 `;

 export const DetailsItem = styled.View`   
    flex-direction :row;
    justify-content: flex-start;
    align-items: center;    
 `;

 export const Peso = styled.Text`    
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.title};
    margin-right: 5px;
 `;

 export const PesoMedio = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.title};
    margin-right: 5px;
 `;

 export const TotalItem = styled.View`    
    justify-content: space-between;
    align-items: center;   
 `;

 export const Quantidade = styled.Text`
     font-size: ${RFValue(16)}px;
     font-family: ${({theme})=>theme.fonts.bold};
     color: ${({theme})=>theme.colors.shape};
 `;

 export const Price = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.title};
 `;
 export const Subtotal = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme})=>theme.fonts.bold};
 `;

 export const QuantidadeWrapper = styled.View`
    width: 30px;
    height: 30px;
    background-color: ${({theme})=>theme.colors.secundary};
    
    justify-content: center;
    align-items: center;
    border-radius: 15px;
 `;

export const Footer = styled.View``;

export const ContentFooter = styled.View`
    flex-direction :row; 
    justify-content: space-between;
    align-items: center; 
    margin-top: 5px;    
    background-color: ${({theme})=>theme.colors.shape};        
    margin: 5px 10px; 
    border-radius: 8px;   
`;

export const TotalItens = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.text_dark};
    padding: 10px 10px;
    /*padding: 10px 10px;  */
`;
export const TotalPrice = styled.Text`
    width: 35%;
    /*background-color : ${({theme})=>theme.colors.text};*/
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    text-align: right;
    margin-right: 10px;
    color: ${({theme})=>theme.colors.text_dark};
    border-left-width: 1px;
    border-left-color: ${({theme})=>theme.colors.text};
    padding: 10px 10px;
`;

export const ButtonContent = styled.View`
    padding: 10px;
`;

export const  IconRemove = styled.TouchableOpacity`
   margin: 5px 5px;
`;

export const  Icone = styled(Feather)`
   font-size: ${RFValue(32)}px;
`;