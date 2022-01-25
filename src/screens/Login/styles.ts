import styled from 'styled-components/native'; 
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
export const Container = styled.View`

 padding: 0 24px;
 background-color: ${({theme})=> theme.colors.primary};
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 116}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-family: ${({theme})=> theme.fonts.medium};
    color: ${({theme})=> theme.colors.shape};
`;
export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(16)}px;
    margin-top: 16px;
`;

export const Form = styled.View`
    width: 100%;
    margin:64px 0;
`;

export const Footer = styled.View`

`;

