import styled from "styled-components/native";

import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
    width: 100%;
    padding: 10px 10px;
    font-size: ${RFValue(14)}px;
    font-family : ${({theme})=>theme.fonts.regular} ;
    color: ${({theme})=>theme.colors.shape};
    /*background-color: ${({theme})=>theme.colors.shape};*/    
    border-left-width: 1px;
    border-left-color: ${({theme})=>theme.colors.text};
    
    margin-top: 8px;
    margin-bottom: 0px;

`;