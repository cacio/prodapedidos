import styled,{css} from 'styled-components/native'; 
import {TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TipoProsp{
    tipo:number;
}

interface OptionsProps{
    isActive:boolean;    
}

export const Container = styled(TouchableOpacity)<OptionsProps>`        
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({theme})=> theme.colors.shape};    
    margin:8px;        
    border-left-width:1px;
    border-left-color: ${({theme})=> theme.colors.primary};     
    border-radius: 10px;
    background-color: ${({isActive,theme}) => 
        isActive ? theme.colors.success_light : theme.colors.background
    };  


`;


export const PedidosCard = styled.View`         
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;         
    border-radius: 5px;    
            
`;


export const ContentTipo = styled.View<TipoProsp>`        
    
    width: ${RFValue(30)}px;                
    border-radius: 10px;         
    margin : 0px 5px 0px 0px;

    ${({tipo})=> tipo === 1 && css`
        background-color: ${({theme})=>theme.colors.secundary}
    `}

    ${({tipo})=> tipo === 2 && css`
        background-color: ${({theme})=>theme.colors.success}
    `}
    
    ${({tipo})=> tipo === 3 && css`
        background-color: ${({theme})=>theme.colors.attention}
    `}    
`;

export const TipoPedido = styled.Text`   
    
    height: 105px;
    text-align :center ;    
    font-size: ${RFValue(20)}px;
    color: ${({theme})=> theme.colors.shape};
    font-family    : ${({theme})=> theme.fonts.bold};

`;

export const InfoCliente = styled.View`    
    
`;

export const NomeCli = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme})=> theme.fonts.bold};
    color: ${({theme})=> theme.colors.text_dark};    
`;


export const CotentPedido = styled.View`
    
`;

export const DetalhePedido = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;

export const InfoDatas = styled.View`
    margin: 0px 5px;
`;

export const Emissao = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.medium};
`;

export const Entrega = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.medium};
`;

export const InfoTotais = styled.View``;

export const Total = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.medium};
`;

export const TotalDesconto = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.medium};
`;

export const TotalFinal = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.medium};
`;
