import React,{useState,useEffect} from 'react'; 
import { BackButton } from '../../components/BackButton';
import { useNavigation,useRoute} from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { Text } from 'react-native';
import { database } from '../../databases';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { Pedido as modelPedido } from '../../databases/model/Pedido';
import { PedidoDetalhe as modelPedidoDetalhe } from '../../databases/model/PedidoDetalhe';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';
import { Q } from '@nozbe/watermelondb';
import { Load } from '../../components/Load';
import { Feather } from '@expo/vector-icons';

import {
 Container,
 Header,
 HeaderTop,
 Content,
 Options,
 Option,
 OptionTitile,
 Section,
 PedidoListDetalis,
 ContentItem,
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
 QuantidadeWrapper,
 Footer,
 ContentFooter,
 TotalItens,
 TotalPrice,
 EditarButton,
 EditarText,
 RemoveButton,
 RemoveText,
 ContentButtons
} from './styles';

interface PedidoProps{
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

interface ParansData{
    ped:PedidoProps
}

export interface DetalisProps{
    cod_prod:string;
    nome_prod:string;
    desconto:string;
    id: string;
    obs: string;
    pc: string;
    pedido_id: string;
    preco: string;
    qtd: string;
    tipo_pc_qtd: string;
    unidade:string;
    subtotal:string;
    peso_medio:string;
    peso:string;
}

export function DetailsPedido() {
 const route = useRoute();
 const {ped} = route.params as ParansData; 
 const theme = useTheme();

 const [detalhePedido,setDetalhePedido] = useState<DetalisProps[]>([]);
 const [option,setOption]   = useState<'dataDetals' | 'dataRestri'>('dataDetals')
 const [loading,setLoading] = useState(true); 
 const [total ,setTotal]    = useState(0);
 const [cliente,setCliente] = useState<modelClientes[]>([]);
 

 type NavigationProps = {
    navigate:(screen:string,{}?) => void;
    goBack:()=>void;
 }

 const navigator = useNavigation<NavigationProps>();

 function handleBack(){
   navigator.goBack();
 }
 
 function handlerOptionChange(optionSelected:'dataDetals' | 'dataRestri'){
    setOption(optionSelected);
  }

  function handlerAlteracao(idped:string){
   // const data = { cli:cliente,idped:idped}
    navigator.navigate('ProductAlterView',{ cli:cliente[0],idped:idped});

  }

  useEffect(()=>{

    async function ColetaDadosPed() {
        const pedidoCollection  = database.get<modelPedido>('pedido');
        const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
        const collectionCliente = database.get<modelClientes>('clientes');
        const collectionProduto = database.get<modelProdutos>('produtos');
        let data:DetalisProps[] = [];
        
        const Produtos = await collectionProduto.query().fetch();
        
        const listaPedido = await pedidoCollection.query(
            Q.where('id',ped.id)
        ).fetch();
        
        const Clienteum = await collectionCliente.query(
            Q.where('codigo',listaPedido[0].codigo_cliente)
        ).fetch();    

        const detalhePedidos = await detalheCollection.query(
            Q.where('pedido_id',listaPedido[0].pedido_id)
        ).fetch();
           
        let total = 0;
        detalhePedidos.forEach(async (itens:modelPedidoDetalhe)=>{
            
            const xprod  =  Produtos.filter((itemp:modelProdutos)=>itemp.codigo == itens.cod_prod);
            const subtot = Number(itens.preco.replace(",", ".")) * Number(itens.qtd);
            const peso   = itens.tipo_pc_qtd == '1' ? subtot : (Number(itens.qtd) * Number(xprod[0].peso_medio));

            total = total + subtot;

            data.push({
                cod_prod:itens.cod_prod,
                nome_prod:xprod[0].decricao,
                desconto:itens.desconto,
                id: itens.id,
                obs: itens.obs,
                pc: itens.pc,
                pedido_id: itens.pedido_id,
                preco: itens.preco,
                qtd: itens.qtd,
                tipo_pc_qtd: itens.tipo_pc_qtd,
                unidade:xprod[0].unidade,
                subtotal:String(subtot),
                peso_medio:xprod[0].peso_medio,
                peso:String(peso)
            });

        });  

        setDetalhePedido(data);
        setTotal(total);
        setCliente(Clienteum);
        setLoading(false);
    }
    ColetaDadosPed();
  },[])

 return(
   <Container>
       <Header>
           <HeaderTop>
                <BackButton color={theme.colors.shape} onPress={handleBack} />
                <ContentButtons>
                    <EditarButton onPress={()=>handlerAlteracao(ped.id)}>
                        <Feather name='edit-2' size={24} color={theme.colors.secundary}/>
                        <EditarText>Alterar</EditarText>
                    </EditarButton>
                    <RemoveButton>
                        <Feather name='x' size={24} color={theme.colors.attention}/>
                        <RemoveText>Remover</RemoveText>
                    </RemoveButton>
                </ContentButtons>
           </HeaderTop>
       </Header>

       <Content>

       <Options>
            <Option active={option == 'dataDetals'} onPress={()=>handlerOptionChange('dataDetals')}>
                <OptionTitile active={option == 'dataDetals'}>Dados</OptionTitile>
            </Option>
            
            <Option active={option == 'dataRestri'} onPress={()=>handlerOptionChange('dataRestri')}>
                <OptionTitile active={option == 'dataRestri'}>Restrições</OptionTitile>
            </Option>

        </Options>    

        {
            option === 'dataDetals' ?
              <Section>
                  {
                      loading ? <Load/>:
                        <PedidoListDetalis
                            data={detalhePedido}
                            keyExtractor={item => item.id}
                            renderItem={({item})=>
                                <ContentItem>
                                    <ItemCarrinho>
                                        <ProdutoWrapper>
                                            <Nome>{item.nome_prod} ({item.unidade})</Nome>
                                            <DetailsItem>
                                                <Peso>Peso: {item.peso} {item.unidade}</Peso>
                                                <PesoMedio>Media KG: {item.peso_medio}</PesoMedio>
                                                <Price>Preço: {item.preco}</Price>
                                            </DetailsItem>
                                        </ProdutoWrapper>                
                                        <TotalItem>
                                            <QuantidadeWrapper>
                                                <Quantidade>{item.qtd}</Quantidade>
                                            </QuantidadeWrapper>
                                            <Subtotal>R$ {parseFloat(String(item.subtotal)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Subtotal>
                                        </TotalItem>                               
                                    </ItemCarrinho> 
                                </ContentItem> 
                            }
                        />
                                            
                  }
                  {
                      loading ? <Load/>:
                        <Footer>                            
                                <ContentFooter>
                                    <TotalItens>Sub Total:</TotalItens>
                                    <TotalPrice>R$ {parseFloat(String(total)).toLocaleString('pt-br',
                            { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalPrice>
                                </ContentFooter>              
                        </Footer>
                    }
              </Section>  
            :
             <Section>
                <Text>Restrições</Text>
             </Section>
        }


       </Content> 

   </Container>
  );
}