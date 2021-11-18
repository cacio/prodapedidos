import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 

export const Container = styled.View`
 flex: 1; 
`;

export const Header = styled.View`
    justify-content: center;
    align-items: center;
    margin-top:25px;    
    padding: 10px;
`;


export const Titulo = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme})=>theme.fonts.medium};    
`;
