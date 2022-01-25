import { RFValue } from 'react-native-responsive-fontsize';
import styled,{css} from 'styled-components/native'; 

interface Props{
    isFocused:boolean;
}

export const Container = styled.View`
    flex-direction: row;    
    margin-bottom: 8px;

    

`;

export const IconContaine = styled.View<Props>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
    background-color: ${({theme})=>theme.colors.background};    
    ${({isFocused,theme}) => isFocused && css`
        border-bottom-width:2px;
        border-bottom-color: ${theme.colors.secundary};

    `}
`;

export const InputText = styled.TextInput<Props>`
    flex: 1;
    background-color: ${({theme})=>theme.colors.background};
    color: ${({theme})=>theme.colors.text_dark};
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    padding: 0 23px;
    ${({isFocused,theme}) => isFocused && css`
        border-bottom-width:2px;
        border-bottom-color: ${theme.colors.secundary};

    `}
`;