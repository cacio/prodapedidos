import React from "react";

import {Container,Icon,ButtonSel} from './styles';

interface Props{
    title:string;
    onPress:()=>void;
}

export function SelectButton({title,onPress}: Props){
    return (
        <Container onPress={onPress}>
            <ButtonSel>
                {title}
            </ButtonSel>
            <Icon name="chevron-down"/>
        </Container>
    );
}