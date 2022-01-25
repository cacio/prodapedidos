import {RectButton} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

interface ButtonTextProps{
    ligth:boolean;
}

export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme})=>theme.colors.secundary};
    border-radius: 5px;
    align-items: center;
    padding: 18px;    
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({theme})=>theme.fonts.medium};
    color: ${({theme,ligth})=>ligth ? theme.colors.text_dark : theme.colors.shape};
    font-size: ${RFValue(14)}px;        
`;