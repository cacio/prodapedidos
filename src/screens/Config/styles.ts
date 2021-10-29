import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;        
    background-color: ${({theme})=>theme.colors.background};

`;

export const Header = styled.View`
    background-color: ${({theme})=>theme.colors.primary};
    width: 100%;
    height: ${RFValue(133)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;
export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.shape};
    font-size: ${RFValue(18)}px;

`;

export const Form = styled.View`
    flex:1;
    justify-content: space-between;
    width: 100%;
    padding: 24px;
`;

export const Fields = styled.View``;

export const Content = styled.ScrollView``;

export const ButtonDate = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(45)}px;           
    align-items: center;
    flex-direction: row; 
    padding:0 24px;
    background-color: ${({theme})=>theme.colors.shape};
    border-radius: 8px;
    margin-bottom: 10px;
`;

export const DateTitle = styled.Text`    
    flex: 1;
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.text_dark};
    font-size: ${RFValue(18)}px;
    text-align: center;
`;

export const DateIcon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color:${({theme})=>theme.colors.text};
`;