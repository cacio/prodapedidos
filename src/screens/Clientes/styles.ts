import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import {FlatList} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {Feather,FontAwesome,MaterialIcons} from '@expo/vector-icons';
import {getStatusBarHeight,getBottomSpace} from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native';
import { Clientes as modelClientes } from '../../databases/model/Clientes';

export const Container = styled.View`
    flex: 1;        
    background-color: ${({theme})=>theme.colors.background};

`;

export const Header = styled.View`
    background-color: ${({theme})=>theme.colors.primary};
    width: 100%;
    /*height: ${RFValue(133)}px;*/
    
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;
export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.shape};
    font-size: ${RFValue(18)}px;

`;

export const HeaderNavegation = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin-top:${getStatusBarHeight() + 18}px;  
    padding:0 24px;
    margin-bottom: 10px;        
`;

export const PrevHome = styled(TouchableOpacity)`    
   
`;

export const NavIcon = styled(Feather)`        
    font-size:${RFValue(30)}px;
    color: ${({theme})=>theme.colors.shape};      
`;

export const NavTitle = styled.Text`
      
    color: ${({theme})=>theme.colors.shape};
    font-size:${RFValue(20)}px;
    text-align: center;
    margin-right: 110px;
    margin-bottom: 10px;
`;

export const CountCli = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    margin-top: 15px;
`;

export const CountName = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-weight: 700;
    font-size:${RFValue(20)}px;
`;

export const CiliTitle = styled.Text`
     color: ${({theme})=>theme.colors.shape};
`;

export const FilterForm = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content:  space-around;
    align-items: center;
    padding: 10px 22px;
  
`;

export const Separador =styled.View`
    width: 85%;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme})=>theme.colors.shape};
`;

export const IconWrapper = styled.View`

`;

export const Iconfilter = styled(Feather)`
    font-size: ${RFValue(24)}px;
    text-align: right;
    color: ${({theme})=>theme.colors.success};
`;

export const Field = styled.View`
    width: 80%;
    justify-content: center;

`;

export const ButtonTypeFilter = styled(TouchableOpacity)`

`;

export const IconTypeFilter = styled(FontAwesome)`
    font-size: ${RFValue(24)}px;
    text-align: left;  
    color: ${({theme})=>theme.colors.text};  
`;

export const ClientLista = styled(
    SwipeListView as new ()=> SwipeListView<modelClientes>         
    ).attrs({
    showsVerticalScrollIndicator:false,
    contentContainerStyle:{
        paddingBottom:getBottomSpace()                        
    }
})`  
    padding:5px 5px;     
`;

export const ContentButtons = styled.View`
    flex:1 ;
    flex-direction:row;
    justify-content: space-between;
    align-items:center ;
    padding-left:15px;
    margin-top:5px; 
`;

export const ButtonFatura = styled(TouchableOpacity)`
    align-items:center ;
    bottom:0px;
    justify-content:center ;
    position:absolute ;
    top:0px;
    width:75px;
    right: 75px;
    background-color: ${({theme})=>theme.colors.secundary};
    border-width: 1px;
    border-color: ${({theme})=> theme.colors.primary};
`;

export const ButtonDetalhe = styled(TouchableOpacity)`
    align-items:center ;
    bottom:0px;
    justify-content:center ;
    position:absolute ;
    top:0px;
    width:75px;
    right: 0px;
    background-color: ${({theme})=>theme.colors.primary};
    border-width: 1px;
    border-color: ${({theme})=> theme.colors.primary};
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
`;

export const DetalheText = styled.Text`
    color: ${({theme})=> theme.colors.text_dark};
    font-weight: bold;
`;
export const FatutaText  = styled.Text`
    color: ${({theme})=> theme.colors.text_dark};
    font-weight: bold;
`;

export const IconBotton = styled(MaterialIcons)`
    font-size: ${RFValue(20)}px;
    color: ${({theme})=> theme.colors.text_dark};
    font-weight: 700;
    margin-right: 5px;    
`;