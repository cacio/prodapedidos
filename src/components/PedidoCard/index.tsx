import React,{useState} from 'react'; 
import {TouchableOpacityProps} from 'react-native';
import {format,addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
 Container,
 PedidosCard,
 ContentTipo,
 TipoPedido,
 CotentPedido,
 InfoCliente,
 NomeCli,
 InfoDatas,
 Emissao,
 Entrega,
 InfoTotais,
 Total,
 TotalDesconto,
 TotalFinal,
 DetalhePedido
} from './styles';

interface PedidoProps extends TouchableOpacityProps{
    id:string;
    tipo:string;
    nomecli:string;
    nomefant:string;
    dtemissao:string;
    dtentrega:string;
    total:string;
    totaldesc:string;
    totalfinal:string;
}

interface BoxYesNot{
    key:string;
    name:string;
}


interface DadosPedidosProps{
    dados:PedidoProps;
    boxyesnot:BoxYesNot[];
    setBoxYesNot:(boxyesnot: BoxYesNot[])=>void;
    onPress:()=>void;
    onLongPress?:()=>void;
}

export function PedidoCard({dados,boxyesnot,setBoxYesNot,...rest}:DadosPedidosProps) {
    
    const [selpedido,setSelpedido] = useState<BoxYesNot[]>([{
        key:'selecione',
        name:'Selecione',
    }]);

    function formatDate(dt:string){

        const formatNewDate = dt.split(' ')[0];
        const dateFomatted  = formatNewDate.split('-')[2]+'/'+formatNewDate.split('-')[1]+'/'+formatNewDate.split('-')[0];
        return dateFomatted;
    }

    function handlerTipo(tipo:Number){
        let strTipo = '';
        if(tipo === 1){
            strTipo = 'P';
        }else if(tipo === 2){
            strTipo = 'S';
        }else if(tipo === 3){
            strTipo = 'PR';
        }
        return strTipo;
    }

 const selecionado =  boxyesnot.filter((items)=>items.key === dados.id);

 return(
   <Container {...rest} isActive={selecionado[0] ? true: false}>
        <PedidosCard>
            <ContentTipo tipo={Number(dados.tipo)}>
                <TipoPedido>{handlerTipo(Number(dados.tipo))}</TipoPedido>
            </ContentTipo>
            <CotentPedido>
                <InfoCliente>
                    <NomeCli>{dados.nomecli} ({dados.nomefant})</NomeCli>
                </InfoCliente>
                <DetalhePedido>
                    <InfoDatas>
                        <Emissao>Emissão: {formatDate(dados.dtemissao)}</Emissao>
                        <Entrega>Entrega: {formatDate(dados.dtentrega)}</Entrega>
                    </InfoDatas>
                    <InfoTotais>
                        <Total>TOTAL: R$ {parseFloat(dados.total).toLocaleString('pt-br',
                                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Total>
                        <TotalDesconto>TOTAL DESCONTO: R$ {parseFloat(dados.totaldesc).toLocaleString('pt-br',
                                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalDesconto>
                        <TotalFinal>TOTAL FINAL: R$ {parseFloat(dados.totalfinal).toLocaleString('pt-br',
                                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalFinal>
                    </InfoTotais>
                </DetalhePedido>
            </CotentPedido>
        </PedidosCard>
   </Container>
  );
}