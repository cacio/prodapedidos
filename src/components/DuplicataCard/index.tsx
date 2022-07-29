import React,{useEffect,useState} from 'react'; 
import { TouchableOpacity,View,Text } from 'react-native';
import { DuplicReceber as modelDuplicReceber } from '../../databases/model/DuplicReceber';
import { Clientes as modelClientes } from '../../databases/model/Clientes';

import { database } from '../../databases';
import { Q } from '@nozbe/watermelondb';
import { useTheme } from 'styled-components';
import {format,addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Button } from '../Form/Button';
import { useNavigation } from '@react-navigation/native';

import {
 Container,
 Header,
 HeaderNavegation, 
 Title,
 Content,
 TextDev,
 DuplicataLista,
 PrevHome,
 NavIcon,
 ContentDuplicata,
 ImagesDuplicata,
 ImageDup,
 DadosDuplicata,
 Vencimento,
 NumeroDup,
 TipoCobranca,
 ValorDuplicata,
 Valor,
 Footer,
 ContentFooter,
 TotalItens,
 TotalPrice,
 ContentButton
} from './styles';


interface DuplicataProps{
    id:string;
}

interface Props{
    data:DuplicataProps,
    closeSelectdBox:()=>void;
}

export function DuplicataCard({data,closeSelectdBox}:Props) {
const [dupdata,setDupData] = useState<modelDuplicReceber[]>([]);
const [loading,setLoading] = useState(true); 
const [total,setTotal]     = useState('0');
const [ativo, setAtivo]    = useState(false);
const theme     = useTheme();

type NavigationProps = {
    navigate:(screen:string,{}?) => void;        
 }

const navigator = useNavigation<NavigationProps>();

let isMouted    = true; 
async function LoaderData(){
    
    try {

        const clienteCollection = database.get<modelClientes>('clientes');
        const cliente = await clienteCollection.query(Q.where('CODIGO',data.id)).fetch();

        const duplicrecerberCollection = database.get<modelDuplicReceber>('duplic_receber');
        const dataduplicreceber        = await duplicrecerberCollection.query(Q.where('cod_cli',data.id)).fetch();  
        
        const expansiveTotal = dataduplicreceber.reduce((acumullator:number,expensive:modelDuplicReceber)=>{                              
            return acumullator + Number(expensive.vlrdup);
       },0);
        
        if(isMouted){
            setDupData(dataduplicreceber);
            setTotal(parseFloat(String(expansiveTotal)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
           if(cliente[0].ATIVO == 'N'){
            setAtivo(true);
           }        
         }
         setLoading(false);

    } catch (error) {        
        console.log(error);                
        setLoading(false);
    }finally{
        if(isMouted){
            setLoading(false);
        }
    }
}

async function handlerBoxdadosCliemte(){
    const clienteCollection = database.get<modelClientes>('clientes');
    const cliente = await clienteCollection.query(Q.where('CODIGO',data.id)).fetch();
    //console.log(cliente[0]);
    navigator.navigate('ProuctView',{cli:cliente[0]});

}

useEffect(()=>{
    LoaderData();
},[data.id])

 return(
   <Container>

            <Header>
               <HeaderNavegation>
                   
                   <PrevHome onPress={closeSelectdBox}>                    
                        <NavIcon name="arrow-left" />
                    </PrevHome>
                   <Title>
                       Duplicatas Vencidas
                   </Title>
               </HeaderNavegation>
           </Header> 
           <Content>
               <DuplicataLista
                    data={dupdata}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>                        
                        <ContentDuplicata  key={item.id}>
                            <ImagesDuplicata>
                                <ImageDup name="monetization-on" />
                            </ImagesDuplicata>
                            <DadosDuplicata>
                                <NumeroDup>
                                   Número: {item.ndup}   
                                </NumeroDup>
                                <Vencimento>
                                   Vencimento: {format(new Date(item.vencdup.split('T')[0]),'dd/MM/yyyy') }   
                                </Vencimento>
                                <TipoCobranca>
                                    Tipo Cobrança: {item.forma_pagamento}
                                </TipoCobranca>
                            </DadosDuplicata>
                            <ValorDuplicata>
                                <Valor>R$ {parseFloat(String(item.vlrdup)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Valor>
                            </ValorDuplicata>
                        </ContentDuplicata>                       
                    }
               />
           </Content>
           <Footer>                
                <ContentFooter>
                    <TotalItens>Total:</TotalItens>
                    <TotalPrice>R$ {total}</TotalPrice>
                </ContentFooter>              
            </Footer>
            <ContentButton>
                <Button title="Abrir Pedidos" disabled={ativo} onPress={()=>handlerBoxdadosCliemte()} />
            </ContentButton>
   </Container>
  );
}