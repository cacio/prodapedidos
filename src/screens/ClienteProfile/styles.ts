import styled,{css} from 'styled-components/native'; 
import {getStatusBarHeight,getBottomSpace} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import {FlatList,TouchableOpacity} from 'react-native';
import {Feather,MaterialIcons} from '@expo/vector-icons';
import { TextInput } from 'react-native';
import {PedidoProps} from '.';
interface OptionsProps{
    active:boolean;
}

export const Container = styled.View`
 flex: 1; 
 background-color: ${({theme})=>theme.colors.background};
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
   margin-right:100px;
`;

export const PrevHome = styled(TouchableOpacity)`    
   
`;

export const NavIcon = styled(Feather)`        
    font-size:${RFValue(30)}px;
    color: ${({theme})=>theme.colors.shape};      
`;

export const Content = styled.View`    
   width: 100%;
   padding: 10px;
`;

export const LabelName = styled.Text`
    font-size:${RFValue(14)}px;
    color: ${({theme})=>theme.colors.text_dark};
    font-family:${({theme})=>theme.fonts.medium};
    margin-bottom: 3px;
`;

export const InputObs = styled(TextInput).attrs({
    textAlignVertical:'top'
})`
    justify-content:flex-start;
    height   : 80px;
    text-align: justify;
    border-radius: 5px ;
    border-width:2px;
    border-color: ${({theme})=>theme.colors.borderinput};
`;

export const Hr = styled.View`    

    margin:10px 5px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme})=>theme.colors.title};
`;

export const Ttile = styled.Text`
    color: ${({theme})=>theme.colors.title};
    font-size: 18px;
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

export const PedidoFeitoList = styled(
    FlatList as new ()=> FlatList<PedidoProps>
    ).attrs({
        showsVerticalScrollIndicator:false
    })`

    background-color: ${({theme})=>theme.colors.shape};    
`;

export const Form = styled.ScrollView``;