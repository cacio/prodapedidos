import React from 'react';

import {Container,Icon,Title,SubTitle,Total,IconBotton,MenuWrapper,InfoMenu} from './styles';

interface Category{    
    name:string;
    icon:string;
}

export interface TransactionCardMenuProps {
    title:string;
    subtitle:String;
    total:string;
    category:Category
}

interface Props{
    data:TransactionCardMenuProps
}

export function MenuCard({ data }:Props){
    return(

        <Container>
            <MenuWrapper>
                <Icon name={data.category.icon} />
                <InfoMenu>
                    <Title>{data.title}</Title>
                    <SubTitle>
                        {data.subtitle} <Total>{data.total}</Total>
                    </SubTitle>                                        
                    
                </InfoMenu>    
                <IconBotton name="arrow-right-circle" />            
            </MenuWrapper>
        </Container>
    );
}