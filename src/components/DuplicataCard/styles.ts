import styled from 'styled-components/native'; 
import {getStatusBarHeight,getBottomSpace} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import {FlatList,TouchableOpacity} from 'react-native';
import {Feather,MaterialIcons} from '@expo/vector-icons';
import { DuplicReceber as modelDuplicReceber } from '../../databases/model/DuplicReceber';

export const Container = styled.View`
 flex: 1; 
`;

export const Header = styled.View`
    justify-content: flex-end;
    align-items: center;
    width: 100%;    
    background-color: ${({theme})=>theme.colors.primary};        

`;

export const HeaderNavegation = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin-top:${getStatusBarHeight()}px;  
    padding:0 24px;
    margin-bottom: 20px;
`;

export const Title  = styled.Text`
   font-family: ${({theme})=>theme.fonts.regular};
   color: ${({theme})=>theme.colors.shape};
   font-size:${RFValue(18)}px;
   margin-right:80px;
`;

export const Content = styled.View`    
   width: 100%;
`;

export const TextDev = styled.Text`
    color:${({theme}) => theme.colors.text_dark} ;
`;

export const DuplicataLista  = styled(FlatList as new ()=> FlatList<modelDuplicReceber>).attrs({
    showsVerticalScrollIndicator:false,
    contentContainerStyle:{
        paddingBottom:getBottomSpace()                        
    }
})`
    padding:5px 5px;
`;

export const PrevHome = styled(TouchableOpacity)`    
   
`;

export const NavIcon = styled(Feather)`        
    font-size:${RFValue(30)}px;
    color: ${({theme})=>theme.colors.shape};      
`;

export const ContentDuplicata = styled.View`
    width: 100%; 
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;     
    background-color: ${({theme})=> theme.colors.background};    
    border-radius: 5px;
    padding: 15px 10px;
    padding-bottom: ${RFValue(25)}px;    
    margin-top:5px;        
    border-left-width:2px;
    border-right-width:2px;
    border-left-color: ${({theme})=> theme.colors.attention}; 
    border-right-color: ${({theme})=> theme.colors.attention}; 
`;

export const ImagesDuplicata  = styled.View`
    width:${RFValue(60)}px;
    height:${RFValue(60)}px;
    background-color: ${({theme})=> theme.colors.background};    
    border-radius: 30px;
    justify-content:center;
    align-items:center ;
`; 

export const ImageDup = styled(MaterialIcons)`
    font-size:${RFValue(50)}px;
`;

export const DadosDuplicata = styled.View`
    justify-content: center;
    align-items: flex-start;     
`;

export const Vencimento = styled.Text`
    font-family:${({theme})=> theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    line-height:18px;
`;

export const NumeroDup = styled.Text`
    font-family:${({theme})=> theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;

export const TipoCobranca = styled.Text`
    font-family:${({theme})=> theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;

export const ValorDuplicata = styled.View`     
     justify-content: center;
     align-items: center;
     margin:15px 10px;
`;

export const Valor = styled.Text`
font-family:${({theme})=> theme.fonts.bold};
    font-size:${RFValue(20)}px;
    
`;


export const Footer = styled.View`
    margin: 5px 5px; 
    border-radius: 5px;
    border-left-width:2px;
    border-right-width:2px;
    border-left-color: ${({theme})=> theme.colors.attention}; 
    border-right-color: ${({theme})=> theme.colors.attention};     
`;

export const ContentFooter = styled.View`
    flex-direction :row; 
    justify-content: space-between;
    align-items: center;     
    background-color: ${({theme})=>theme.colors.background};            
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
    font-family: ${({theme})=>theme.fonts.bold};
    text-align: right;
    margin-right: 10px;
    color: ${({theme})=>theme.colors.text_dark};
    border-left-width: 1px;
    border-left-color: ${({theme})=>theme.colors.text};
    padding: 10px 10px;
`;

export const ContentButton = styled.View`
    width: 100%;
    position:absolute;
    bottom:10px;
    padding: 5px 5px;
`;