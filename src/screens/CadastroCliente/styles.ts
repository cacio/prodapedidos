import styled from 'styled-components/native'; 
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

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
    margin-top:${getStatusBarHeight() + 18}px;  
    padding:0 24px;
    margin-bottom: 10px;
`;

export const Title  = styled.Text`
   font-family: ${({theme})=>theme.fonts.regular};
   color: ${({theme})=>theme.colors.shape};
   font-size:${RFValue(18)}px;
   margin-right:100px;
`;

export const Content = styled.View`
    flex: 1;
    justify-content:center ;
    align-items:center;
`;

export const TextDev = styled.Text`
    color:${({theme}) => theme.colors.text_dark} ;
`;