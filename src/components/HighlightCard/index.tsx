import React from 'react';

import 
    { 
        Container,
        Header,
        Icon,
        CliWrapper,
        CliInfo,
        CliNome,
        CliFantasia,
        Footer,
        Amount,
        LastTransaction
    } from './styles';

    export interface TransactionCardProps{
        nome:string;
        fantasia:string;
        amount:string;
        lastTransaction:string;
        type:'up'|'down'; 
    }

    interface Props{
        data: TransactionCardProps 
    }


export function HighlightCard({ data }:Props){
    return (
        <Container>
            <Header>
                <CliWrapper>
                    <Icon name="briefcase" type={data.type}/>    
                    <CliInfo>            
                        <CliNome>{data.nome}</CliNome> 
                        <CliFantasia>{data.fantasia}</CliFantasia>               
                    </CliInfo>
                </CliWrapper>
            </Header>
            <Footer>
                <Amount>{data.amount}</Amount>
                <LastTransaction>{data.lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    )
}