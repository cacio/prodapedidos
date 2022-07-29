import React,{useState} from 'react';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import {
        Container,
        Content,
        Photo,
        InfoCliente,
        Nome,
        NomeFantasia,
        LabelAtivo,
        PhotoWrapper,
        ContentAction,
        Botton,
        IconBotton,
        Name
    } from './styles';

interface ButtonSelected{
    id:string;
    tipo:string;
}

/*export interface ClientCarProps{
    id:string;
    foto:string;
    nome:string;
    nomefantasia:string;
    ativo:string;       
}*/

interface Props{
    data:modelClientes,
    setbuttonselected:(buttonselected: ButtonSelected)=>void;
    onPress:()=>void;
}

export function ClienteCard({data,setbuttonselected,onPress}:Props){
    const [options, setOption] = useState<ButtonSelected>(); 

    function handleOptionSelect(buttonselected: ButtonSelected){
        setbuttonselected(buttonselected);
        setOption(buttonselected);
    }  

       return(
        <Container onPress={onPress}>
            <Content tpsn={`${data.ATIVO}`}>
                <PhotoWrapper>
                    <Photo source={{ uri: data.foto === '' ? `https://ui-avatars.com/api/?name=${data.NOME}&length=1`: data.foto}}/>                    
                </PhotoWrapper>
                <InfoCliente>
                      <Nome>{data.NOME}</Nome>  
                      <NomeFantasia>{data.FANTASIA}</NomeFantasia>                                                                  
                 </InfoCliente>   
            </Content>
        </Container>
    );
    
}

