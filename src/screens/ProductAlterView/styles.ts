import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 
import { TouchableOpacity,FlatList } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';

export const Container = styled.View`
 flex: 1; 
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
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(12)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;   
    border-color: ${({theme})=>theme.colors.secundary_light};
    border-bottom-width: 1px;        
`;

export const PrevHome = styled(TouchableOpacity)`    
    border-radius: 10px;    
    justify-content: center;
    align-items: center; 
    padding: 10px;
    margin-bottom: 10px;
`;

export const NavIcon = styled(Feather)`        
    font-size:${RFValue(30)}px;
    color: ${({theme})=>theme.colors.shape};      
`;

export const NavTitle = styled.Text`
    flex:1;    
    color: ${({theme})=>theme.colors.shape};
    font-size:${RFValue(20)}px;
    text-align: center;
    margin-left: -50px;
    margin-bottom: 10px;
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

export const IconTypeFilter = styled(Feather)`
    font-size: ${RFValue(24)}px;
    text-align: left;  
    color: ${({theme})=>theme.colors.text};  
`;

export const DetailsCli = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;    
    padding: 5px 18px;
    margin-top: 5px;
    margin-bottom: -7px;
`;

export const DetailWrapper = styled.View`
    margin-left: 10px; 

`;

export const ImageCli = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const NomeCli = styled.Text`
    font-size: ${RFValue(19)}px;
    color: ${({theme})=>theme.colors.shape};
    font-family: ${({theme})=>theme.fonts.medium};
    margin-bottom: -5px;
    
`;

export const FantasiaCli = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=>theme.colors.shape};
    font-family: ${({theme})=>theme.fonts.regular};
    
`;

export const ProdutoList = styled(
    FlatList as new ()=> FlatList<modelProdutos>  
).attrs({
    contentContainerStyle:{
        padding:10,
        paddingBottom:getBottomSpace()
    },
    showsVerticalScrollIndicator:false,
})`

`;

export const MyCarButton = styled(RectButton)`
    width: 60px;
    height: 60px;
    background-color: ${({theme})=>theme.colors.primary};
    justify-content: center;
    align-items: center;
    border-radius:30px;
    position: absolute;
    bottom:13px;
    right:22px;
`;