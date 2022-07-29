import styled,{css} from 'styled-components/native'; 
import { RFValue } from 'react-native-responsive-fontsize';
import {FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {getStatusBarHeight,getBottomSpace} from 'react-native-iphone-x-helper';
import {Feather,FontAwesome, AntDesign} from '@expo/vector-icons';
import {StatusProps,PedidoProps} from '.';
import {RectButton} from 'react-native-gesture-handler';

interface TipoStatus{
    colors:Number;
    active?:boolean;
}

interface CheckdOptonsProps{
    active:boolean;
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
        
    font-size:${RFValue(25)}px;
    font-family:${({theme})=>theme.fonts.medium};
    color: ${({theme})=>theme.colors.shape};
    margin-right:70px ;
`;

export const  InfoTotalsDays = styled.View`
    
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


export const ButtonEnvPed = styled(RectButton)`

    width: 90%;
    height: 60px;
    background-color: ${({theme})=>theme.colors.primary};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius:30px;
    position: absolute;
    bottom:13px;
    right:22px;

`;

export const TextEnvPed = styled.Text`
    color:${({theme})=>theme.colors.shape};
    font-family: ${({theme})=>theme.fonts.medium};
    margin: 0px 10px;
`;

export const EmptyListPed = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 10px;
`;

export const EmptyText = styled.Text`
    margin-top: 5px;
    color:${({theme})=>theme.colors.text_dark};
    font-family: ${({theme})=>theme.fonts.bold};
`;

export const EmptySubtitleText = styled.Text`
    color:${({theme})=>theme.colors.title};
    font-family: ${({theme})=>theme.fonts.regular};
`;

export const ButtonNovoPed = styled.TouchableOpacity`
    margin-top: 10px;
`;

export const TitleButon = styled.Text`
    color:${({theme})=>theme.colors.primary};
    font-family: ${({theme})=>theme.fonts.medium};
`;

export const OptionFiltro = styled.View`
    flex-direction:row;
    justify-content:flex-start;
    margin:0px 10px 0px 5px;    
`;

export const OptionButton = styled(TouchableOpacity)<CheckdOptonsProps>`
    flex-direction:row;
    justify-content:center;
    align-items:center ;
    padding:10px;
    margin-right:5px;
    border-radius:5px;
    border-width:1px;
    border-color: ${({theme})=>theme.colors.borderinput};
    ${({active})=> active === true && css`
        background-color: ${({theme})=>theme.colors.primary};
    `}

    ${({active})=> active === false && css`
        background-color: ${({theme})=>theme.colors.background}
    `}

`;

export const OptionText = styled.Text<CheckdOptonsProps>`

    font-size:14px;
    ${({active})=> active === true && css`
        color: ${({theme})=>theme.colors.shape};
    `}

    ${({active})=> active === false && css`
        color: ${({theme})=>theme.colors.text_dark};
    `}

    margin-left:5px;

`;

export const IconChecked = styled(AntDesign)`
    font-size:14px;
    color: ${({theme})=>theme.colors.shape};
`;

export const TitleText = styled.Text`
    font-size: 14px;
    font-family: ${({theme})=>theme.fonts.medium};
    margin:10px 0px 0px 10px;
`;

export const DatasOption = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;    
    padding:5px;
`;

export const DataFilter = styled(TouchableOpacity)`
    width:100%;
    height: ${RFValue(56)}px;
    background-color: ${({theme})=>theme.colors.background};
    border-radius: 5px;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;    
    margin-bottom: 16px;
    margin-left:5px;
    margin-right:10px;
    border-width:1px;
    border-color: ${({theme})=>theme.colors.borderinput};

`;

export const IconContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme})=>theme.colors.borderinput};
    border-right-width: 1px;
`;

export const IconeData = styled(Feather)`
    font-size: ${RFValue(18)}px;
`;

export const TitleData = styled.Text`
    margin:0px auto;
    text-align: center;
    font-family: ${({theme})=>theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;

export const TitleTipoData = styled.Text`
    margin-left:5px;
    font-size: 14px;
    font-family: ${({theme})=>theme.fonts.medium};
`;

export const ContantData = styled.View`    
    width    : 48%;
    margin-right:10px;     
`;

export const OptionStatusContent = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:center;
    align-items:center ;
    background-color: ${({theme})=>theme.colors.background};
    padding:5px;
`;

export const OptionStatus = styled(TouchableOpacity)<TipoStatus>`
    flex:1;
    height: 40px;
    border-radius: 10px;    
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

    ${({active})=> active === true && css`
        background-color: ${({theme})=>theme.colors.primary}
    `}

    margin   : 15px 3px;
`;

export const OptionStatusValue = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=> theme.fonts.bold};
    color: ${({theme})=>theme.colors.shape};  
    margin: 0px 5px 0px 5px;
    border-right-width:1px;
    border-right-color: ${({theme})=>theme.colors.shape};  
    padding: 0px 5px 0px 8px;
`;

export const OptionStatusText = styled.Text`
     font-size: ${RFValue(12)}px;
     font-family: ${({theme})=> theme.fonts.medium};
     color: ${({theme})=>theme.colors.shape};
     padding: 0px 10px 0px 0px;
`;

export const ContentFiltro = styled.View`    
    padding: 0 10px 15px;
`;