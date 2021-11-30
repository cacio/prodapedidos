import { TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 
import {Feather} from '@expo/vector-icons';
export const Container = styled.View` 
 width  : 100%;
 background-color: ${({theme})=>theme.colors.background};
 
`;


 export const Content = styled.View`   
    flex-direction :row; 
    background-color: ${({theme})=>theme.colors.shape};    
    padding:10px 10px;
    margin: 5px;    
    border-radius: 5px;
 `;

 export const ItemCarrinho = styled(TouchableOpacity)`  
    width  : 100%;
    flex-direction :row; 
    justify-content: space-between;
    align-items: center;        
 `;

 export const ProdutoWrapper = styled.View`
   width: 70%;
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
