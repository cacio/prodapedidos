import styled,{css} from 'styled-components/native'; 
import { RFValue } from 'react-native-responsive-fontsize';
import {FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {getStatusBarHeight,getBottomSpace} from 'react-native-iphone-x-helper';
import {Feather,FontAwesome} from '@expo/vector-icons';
import {StatusProps,PedidoProps} from '.';

interface TipoStatus{
    colors:Number;
}

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
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(12)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;   
    border-color: ${({theme})=>theme.colors.secundary_light};
    border-bottom-width: 1px;        
`;

export const PrevHome = styled(TouchableOpacity)`    
   
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

export const  InfoTotalsDays = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const  Totalday = styled.View`        
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    background-color: ${({theme})=> theme.colors.title};
    padding: 8px;
    border-radius: 5px;
    opacity: 0.8;
`;

export const TotaldayValor = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-family:${({theme})=>theme.fonts.bold};    
    font-size:${RFValue(14)}px;
`;


export const TotaldayTitle = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-size:${RFValue(14)}px;
`;

export const  LengthDay = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    background-color: ${({theme})=> theme.colors.title};
    padding: 8px;
    border-radius: 5px;
    opacity: 0.8;
`;

export const LengthDayValor = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-family:${({theme})=>theme.fonts.bold};
    font-size:${RFValue(14)}px;
`;

export const LengthDayText = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-size:${RFValue(14)}px;
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
    color: ${({theme})=>theme.colors.shape};  
`;

export const ContentStatus = styled(
        FlatList as new ()=> FlatList<StatusProps> 
    ).attrs({
        horizontal:true,
        showsHorizontalScrollIndicator:false,
    })`        
    margin-left: 20px;
`;
export const Status = styled.TouchableOpacity<TipoStatus>`    
    height: 30px;
    border-radius: 15px;    
    flex-direction: row;    
    justify-content: center;
    align-items: center; 

    ${({colors})=> colors === 1 && css`
        background-color: ${({theme})=>theme.colors.secundary}
    `}

    ${({colors})=> colors === 2 && css`
        background-color: ${({theme})=>theme.colors.success}
    `}
    
    ${({colors})=> colors === 3 && css`
        background-color: ${({theme})=>theme.colors.attention}
    `}

    margin   : 15px 3px;
`;
export const TipoStatus = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme})=> theme.fonts.bold};
    color: ${({theme})=>theme.colors.shape};  
    margin: 0px 5px 0px 5px;
    border-right-width:1px;
    border-right-color: ${({theme})=>theme.colors.shape};  
    padding: 0px 5px 0px 8px;
`;
export const StatusText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme})=> theme.fonts.medium};
    color: ${({theme})=>theme.colors.shape};
    padding: 0px 10px 0px 0px;
`;

export const PedidoFeitoList = styled(
    FlatList as new ()=> FlatList<PedidoProps>
    ).attrs({
        showsVerticalScrollIndicator:false
    })`
`;