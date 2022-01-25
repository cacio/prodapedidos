import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react'; 
import { TouchableOpacityProps } from 'react-native';
import { ClienteDTO } from '../../dtos/ClienteDTO';
import { CarrinhoDTO as CarrinhoProps } from '../../dtos/CarrinhoDTO';
import { useAuth } from '../../hooks/auth';
import { Load } from '../Load';

import {
 Container,
 Content,
 ItemCarrinho,
 ProdutoWrapper,
 Nome,
 DetailsItem,
 Peso,
 PesoMedio,
 TotalItem,
 Quantidade,
 Price,
 Subtotal,
 QuantidadeWrapper 
} from './styles';


interface Props extends TouchableOpacityProps{
    cli:ClienteDTO;    
}

export function ItensCarrinho({cli}:Props) {

const {user}                 = useAuth();
const [loading,setLoading]   = useState(true); 
const [total,setTotal]       = useState('0'); 
const [carrinho,setCarrinho] = useState<CarrinhoProps[]>([]);
const dataKey                = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;

async function getShoppingBag() {
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];

    const expansiveTotal = currentData.reduce((acumullator:number,expensive:CarrinhoProps)=>{                              
        return acumullator + Number(expensive.subtotal.replace(/[^0-9,]*/g, '').replace(',', '.'));
   },0);

  
    setCarrinho(currentData);  
    setLoading(false);  
    setTotal(parseFloat(String(expansiveTotal)).toLocaleString('pt-br',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}

useEffect(()=>{
    getShoppingBag();
},[]);

 return(
   <Container>
       {loading 
                ?<Load/> 
                :carrinho.map((item:CarrinhoProps) =>{
                            return <Content key={Number(item.codigo)}>
                                <ItemCarrinho>
                                    <ProdutoWrapper>
                                        <Nome>{item.nomeprod} ({item.unidade})</Nome>
                                        <DetailsItem>
                                            <Peso>Peso: {item.peso} {item.unidade}</Peso>
                                            <PesoMedio>Media KG: {item.peso_medio}</PesoMedio>
                                            <Price>Preço: {item.preco}</Price>
                                        </DetailsItem>
                                    </ProdutoWrapper>                
                                    <TotalItem>
                                        <QuantidadeWrapper>
                                            <Quantidade>{item.quantidade}</Quantidade>
                                        </QuantidadeWrapper>
                                        <Subtotal>R$ {item.subtotal}</Subtotal>
                                    </TotalItem>                               
                                </ItemCarrinho>                                         
                            </Content>
                    })            
            }
   </Container>
  );
}