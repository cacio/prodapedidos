import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 

export const Container = styled.View`
    flex: 1; 
    background-color: ${({theme})=> theme.colors.primary};

`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center ;
    padding-bottom: 80px;    
    margin-top: 100px;
`;
export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    color:  ${({ theme }) => theme.colors.shape };
    font-family: ${({ theme }) => theme.fonts.medium };
    margin-top: 30px;
`;

export const Message = styled.Text`
    font-size: ${RFValue(15)}px;
    color:  ${({ theme }) => theme.colors.text };
    font-family: ${({ theme }) => theme.fonts.regular };
    line-height: ${RFValue(25)}px;
    text-align: center;
    margin-top: 16px;
    
`;

export const Footer = styled.View`
    width: 100%;
    align-items: center;
    margin: 20px 0;
    padding: 0 20px;
`;