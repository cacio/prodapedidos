import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 
import {Feather,MaterialIcons} from '@expo/vector-icons';
import {TouchableOpacity,TextInput} from 'react-native';

export const Container = styled.View`
 flex: 1;
 width  : 100%;
 background-color: ${({theme})=>theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(155)}px;
    background-color: ${({theme})=>theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    /*padding-bottom: 19px;*/

`;


export const DadosCliente = styled.View`
    flex:1;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
    padding: 10px;
    margin-top: 15px;
    
`;

export const ContentImage = styled.View`    
    justify-content: space-between;
    align-items: center;
`;

export const ImagemCli = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const DetailWrapper = styled.View`
    flex: 1;
    width: 100%;    
    justify-content: flex-start;
    margin-left: 10px; 
    margin-top: 20px;
    
`;

export const TitloCli = styled.Text`
    font-size: 12px;
    font-family: ${({theme})=> theme.fonts.regular};
    color: ${({theme})=> theme.colors.shape};
`;

export const Nomecli = styled.Text`
    font-size: 14px;
    font-family: ${({theme})=> theme.fonts.medium};
    color: ${({theme})=> theme.colors.shape};
`;

export const EnderecoCli = styled.Text`
    font-size: 12px;
    font-family: ${({theme})=> theme.fonts.medium};
    color: ${({theme})=> theme.colors.text};
`;

export const Content = styled.ScrollView`    
    width: 100%;       
    padding: 10px 10px;
`;

export const DataEntrega = styled(TouchableOpacity)`
    height: ${RFValue(56)}px;
    background-color: ${({theme})=>theme.colors.shape};
    border-radius: 5px;
    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const IconContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme})=>theme.colors.background};
    border-right-width: 1px;
`;

export const IconeData = styled(Feather)`
    font-size: ${RFValue(18)}px;
`;

export const Title = styled.Text`
     flex: 1;
    text-align: center;
    font-family: ${({theme})=>theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;


export const LabelName = styled.Text`
    width: 100%;
    font-size: 16px;
    font-family: ${({theme})=>theme.fonts.medium};

`;

export const IconContainerForma = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme})=>theme.colors.background};    
    border-right-width: 1px;
`;

export const FormaPagamento = styled.View`
    width: 100%;
    height: ${RFValue(56)}px;
    background-color: ${({theme})=>theme.colors.shape};
    border-radius: 5px;
    border-style:  solid;
    border-width: 1px;
    border-color: ${({theme})=>theme.colors.borderinput};
    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const IconPagament = styled(MaterialIcons)`
    font-size: ${RFValue(18)}px;
`;

export const DetailsFormaPagamento = styled.View`
    width: 100%;
    flex-direction: column;    
    align-items:flex-start;
    margin-left: 10px;
`;

export const TitleForma = styled.Text`
    font-size: 18px;
    font-family: ${({theme})=>theme.fonts.medium};
`;

export const Prazos = styled.Text`
    font-size: 16px;
    font-family: ${({theme})=>theme.fonts.medium};
`;

export const ContentCarrinho = styled.View`
    width: 100%;       
    border-radius: 5px;
    border-style:  solid;
    border-width: 1px;  
    border-color: ${({theme})=>theme.colors.borderinput};  
    margin-bottom: 16px;
`;
export const DetailsCarrinho = styled.ScrollView`
    width: 100%;
    height: ${RFValue(250)}px;
`;
export const TitleCarrinho = styled.Text`
    font-size: 16px;
    font-family: ${({theme})=>theme.fonts.medium};
    background-color: ${({theme})=>theme.colors.secundary};
    padding: 10px 10px;
`;


export const Footer = styled.View``;

export const ContentFooter = styled.View`
    flex-direction :row; 
    justify-content: space-between;
    align-items: center; 
    margin-top: 5px;    
    background-color: ${({theme})=>theme.colors.shape};        
    margin: 5px 0px; 
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

export const Observacao = styled(TextInput)`
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 18px;
    font-size: ${RFValue(14)}px;
    font-family : ${({theme})=>theme.fonts.regular} ;
    color: ${({theme})=>theme.colors.text_dark};
    background-color: ${({theme})=>theme.colors.shape};    
    border-radius: 5px ;
    margin-bottom: 8px;
`;