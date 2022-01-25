import styled,{css} from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';


export const Container = styled(TouchableOpacity).attrs({
    activeOpacity:.5,
})`
    background-color: ${({theme})=>theme.colors.shape};
    border-radius: 5px;
    padding: 17px 20px;
    margin-bottom: 16px;
`;

export const MenuWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const InfoMenu = styled.View`    
    align-items: flex-start;
    width: 100%;
`;
export const Icon = styled(Feather)`
    width: ${RFValue(50)}px;
    height:${RFValue(50)}px;
    font-size: ${RFValue(50)}px;
    margin-right: 5px;
    color: ${({theme})=>theme.colors.text_dark};
`;
export const Title = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme})=>theme.fonts.bold};
    color: ${({theme})=>theme.colors.text_dark};
`;
export const SubTitle = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.text_dark};
`;
export const Total = styled.Text`
    font-family: ${({theme})=>theme.fonts.bold};
    color: ${({theme})=>theme.colors.text_dark};
`;

export const IconBotton = styled(Feather)`
    font-size: ${RFValue(30)}px;
    position: absolute;
    right: 0;
    color: ${({theme})=>theme.colors.text_dark};
`;
