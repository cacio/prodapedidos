import styled,{css} from 'styled-components/native'; 
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity,FlatList } from 'react-native';
import {DetalisProps} from '.';

interface OptionsProps{
    active:boolean;
}

export const Container = styled.View`
 flex: 1; 
`;

export const Header = styled.View`
    width: 100%;
    height:127px;
    background-color:${({theme})=>theme.colors.primary};
    padding:0 24px;
    align-items:center;
`;

export const HeaderTop = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin-top:${getStatusBarHeight() + 32}px;
`;

export const ContentButtons = styled.View`
    flex-direction:row;
`;

export const Content = styled.View`    
    padding: 0 15px;
    margin-top:22px;
`;

export const Options = styled.View`
    border-bottom-width:1px;
    border-bottom-color:${({theme})=>theme.colors.shape};
    flex-direction:row;
    justify-content:space-around;
    margin-bottom:24px;
`;

export const Option = styled.TouchableOpacity<OptionsProps>`
    padding-bottom:14px ;
    ${({active})=> active && css`
        border-bottom-width:3px;
        border-bottom-color:${({theme})=>theme.colors.primary};
    `}
`;

export const OptionTitile = styled.Text<OptionsProps>`
    font-size:${RFValue(18)}px;
    font-family:${({theme,active})=>
    active ? theme.fonts.bold : theme.fonts.regular};

    color: ${({theme,active})=>
    active ? theme.colors.text_dark : theme.colors.text};
`;

export const Section = styled.View``;

export const PedidoListDetalis = styled(
    FlatList as new ()=> FlatList<DetalisProps>
).attrs({
    showsVerticalScrollIndicator:false
})``;

export const ContentItem = styled.View`   
     
    background-color: ${({theme})=>theme.colors.shape};    
    padding    : 5px;
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

export const Footer = styled.View``;

export const ContentFooter = styled.View`
    flex-direction :row; 
    justify-content: space-between;
    align-items: center; 
    margin-top: 5px;    
    background-color: ${({theme})=>theme.colors.shape};        
    margin: 5px 5px; 
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
    padding: 10px 5px;
`;

export const EditarButton = styled(TouchableOpacity)`
    flex-direction :row;     
    border-width: 1px;
    border-color: ${({theme})=>theme.colors.secundary};
    padding: 5px;
    border-radius: 5px;
    margin: 0px 8px;
`;

export const EditarText = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color:${({theme})=>theme.colors.shape};
`;

export const RemoveButton = styled(TouchableOpacity)`
    flex-direction :row;     
    border-width: 1px;
    border-color: ${({theme})=>theme.colors.attention};
    padding: 5px;
    border-radius: 5px;
`;
export const RemoveText = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme})=>theme.fonts.medium};
    color:${({theme})=>theme.colors.shape};
`;