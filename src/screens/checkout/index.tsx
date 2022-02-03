import React,{useState,useEffect} from 'react'; 
import { Alert, Platform } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useRoute,useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {format,addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Q } from '@nozbe/watermelondb';

import { InputForm } from '../../components/Form/inputForm';
import {
 Container,
 Header,
 DadosCliente,
 ContentImage,
 ImagemCli,
 DetailWrapper,
 TitloCli,
 Nomecli,
 EnderecoCli,
 Content,
 DataEntrega,
 IconContainer,
 IconeData,
 Title,
 LabelName,
 FormaPagamento,
 IconPagament,
 DetailsFormaPagamento,
 Prazos,
 TitleForma,
 IconContainerForma,
 ContentCarrinho,
 TitleCarrinho,
 DetailsCarrinho,
 Footer,
 TotalItens,
 TotalPrice,
 ContentFooter,
 Observacao
} from './styles';

import { ClienteDTO } from '../../dtos/ClienteDTO';
import { ItensCarrinho } from '../../components/ItensCarrinho';
import { useAuth } from '../../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Form/Button';
import { database } from '../../databases';
import { Pedido } from '../../databases/model/Pedido';
import { CondicoesPagamento as modelCondicoesPagamento } from '../../databases/model/CondicoesPagamento';
import { PedidoDetalhe } from '../../databases/model/PedidoDetalhe';
import { CarrinhoDTO as CarrinhoProps } from '../../dtos/CarrinhoDTO';
import { Pedido as modelPedido } from '../../databases/model/Pedido';

interface ParansData{
    cli:ClienteDTO;
    tipo:string;
    idped:string;
}

export function checkout() {
const route                                          = useRoute();
const {user}                                         = useAuth();
const {cli,tipo,idped}                               = route.params as ParansData;
const [SelectedDateTime,setSelectedDateTime]         = useState(addDays(new Date(),1));     
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [total,setTotal]                               = useState('0');
const [obs,setObs] = useState('');
const [condpag,setCondpag]                           = useState(cli.COND_PAG);

type NavigationProps = {
    navigate:(screen:string,{}?) => void;
 }

const navegation2 = useNavigation<NavigationProps>();

const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState:{ errors }
} = useForm();

function hendlerOpenDatetimPickerForAndroid(){    
    setDatePickerVisibility(oldState => !oldState);
}

function hideDatePicker(){
    setDatePickerVisibility(false);
}

function handleConfirm(dateTime:Date | undefined) {
    if(Platform.OS === 'android'){
        setDatePickerVisibility(oldState => !oldState);
    }

    if(dateTime)
        setSelectedDateTime(dateTime);            
    
    hideDatePicker();
};


async function TotaisShopping(){
    const dataKey                = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];

    const expansiveTotal = currentData.reduce((acumullator:number,expensive:CarrinhoProps)=>{                              
        return acumullator + Number(expensive.subtotal.replace(/[^0-9,]*/g, '').replace(',', '.'));
   },0);

          
    setTotal(parseFloat(String(expansiveTotal)).toLocaleString('pt-br',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

}

async function getCondicoesPagamento(){
    const colectionCondicoesPagamento  = database.get<modelCondicoesPagamento>('condicoes_pagamento');
    const datacondicoespagamento = await colectionCondicoesPagamento.query(
        Q.where('codigo',cli.COND_PAG)
    ).fetch();

    setCondpag(datacondicoespagamento[0].decricao);
    
}

async function handlerInsertpedido(){

    try {
        
        const dataKey                = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;
        const dataPed                = await AsyncStorage.getItem(dataKey);
        const currentData            = dataPed ? JSON.parse(dataPed) : [];

        const data = {
            pedido_id:uuidv4(),
            CODIGO_RETAGUARDA:'',
            data_pedido:format(new Date(),'Y-MM-dd',{
                locale:ptBR,
            }),
            codigo_cliente:cli.CODIGO,
            data_entrega: format(SelectedDateTime,'Y-MM-dd',{
                locale:ptBR,
            }),
            hora_pedido:format(new Date(),'HH:mm:ss',{
                locale:ptBR,
            }),
            codigo_usuario:user.id,
            codigo_vendedor:user.codrepre,
            status:'1',
            prazo1:cli.PRAZO1,
            prazo2:cli.PRAZO2,
            prazo3:cli.PRAZO3,
            prazo4:cli.PRAZO4,
            prazo5:cli.PRAZO5,
            obs:getValues('obs'),
            valor_desconto:0,
            id_tabela_preco:'0',
            retirada:'1',
            cnpj_emp:user.cnpj_emp
        }

       const pedidoCollection = database.get<Pedido>('pedido');

        await database.write(async ()=>{
            await pedidoCollection.create((newPedido)=>{
                newPedido.pedido_id         = data.pedido_id;
                newPedido.CODIGO_RETAGUARDA = data.CODIGO_RETAGUARDA;
                newPedido.data_pedido       = data.data_pedido;
                newPedido.codigo_cliente    = data.codigo_cliente;
                newPedido.data_entrega      = data.data_entrega;
                newPedido.hora_pedido       = data.hora_pedido;
                newPedido.codigo_usuario    = data.codigo_usuario;
                newPedido.codigo_vendedor   = data.codigo_vendedor;
                newPedido.status            = data.status;
                newPedido.prazo1            = String(data.prazo1);
                newPedido.prazo2            = String(data.prazo2);
                newPedido.prazo3            = String(data.prazo3);
                newPedido.prazo4            = String(data.prazo4);
                newPedido.prazo5            = String(data.prazo5);
                newPedido.obs               = data.obs;
                newPedido.valor_desconto    = String(data.valor_desconto);
                newPedido.id_tabela_preco   = data.id_tabela_preco;
                newPedido.retirada          = data.retirada;
                newPedido.cnpj_emp          = data.cnpj_emp; 

            })
        });

        const pedidodetalhe = database.get<PedidoDetalhe>('pedidodetalhe');
       
        await database.write(async ()=>{
            currentData.map( async (item:CarrinhoProps)=>{            
                await pedidodetalhe.create((newPedidoDetalhe)=>{
                    newPedidoDetalhe.pedido_id = data.pedido_id;
                    newPedidoDetalhe.qtd       = String(item.quantidade);
                    newPedidoDetalhe.preco     = String(item.preco);
                    newPedidoDetalhe.cod_prod  = String(item.codigo);
                    newPedidoDetalhe.pc        = item.peso;
                    newPedidoDetalhe.desconto  = '0';
                    newPedidoDetalhe.obs       = String(item.obs);
                    newPedidoDetalhe.tipo_pc_qtd = String(item.tipo);
                })
            });
        });
        

        await AsyncStorage.removeItem(dataKey);
        
        navegation2.navigate('Confirmation',{      
            nextScreenRoute:'home',
            title:'Pedido Criado com sucesso!',
            message:`Seu pedido foi criado\nagora clique para voltar a fazer mais pedidos`,
            buttontitle:"Voltar"
          });

    } catch (error) {
        Alert.alert("Não foi possivel gravar seu pedido");
    }

}


async function handlerAlterarPedido(){

    try {
        const dataKey                = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;
        const dataPed                = await AsyncStorage.getItem(dataKey);
        const currentData            = dataPed ? JSON.parse(dataPed) : [];
        const data = {            
            data_pedido:format(new Date(),'Y-MM-dd',{
                locale:ptBR,
            }),
            codigo_cliente:cli.CODIGO,
            data_entrega: format(SelectedDateTime,'Y-MM-dd',{
                locale:ptBR,
            }),
            hora_pedido:format(new Date(),'HH:mm:ss',{
                locale:ptBR,
            }),
            codigo_usuario:user.id,
            codigo_vendedor:user.codrepre,
            status:'1',
            prazo1:cli.PRAZO1,
            prazo2:cli.PRAZO2,
            prazo3:cli.PRAZO3,
            prazo4:cli.PRAZO4,
            prazo5:cli.PRAZO5,
            obs:getValues('obs'),
            valor_desconto:0,
            id_tabela_preco:'0',
            retirada:'1',
            cnpj_emp:user.cnpj_emp
        }
        await database.write(async ()=>{
            const pedidos = await database.get<modelPedido>('pedido').find(idped);
            await pedidos.update(()=>{
                pedidos.data_pedido       = data.data_pedido;
                pedidos.codigo_cliente    = data.codigo_cliente;
                pedidos.data_entrega      = data.data_entrega;
                pedidos.hora_pedido       = data.hora_pedido;
                pedidos.codigo_usuario    = data.codigo_usuario;
                pedidos.codigo_vendedor   = data.codigo_vendedor;
                pedidos.status            = data.status;
                pedidos.prazo1            = String(data.prazo1);
                pedidos.prazo2            = String(data.prazo2);
                pedidos.prazo3            = String(data.prazo3);
                pedidos.prazo4            = String(data.prazo4);
                pedidos.prazo5            = String(data.prazo5);
                pedidos.obs               = data.obs;
                pedidos.valor_desconto    = String(data.valor_desconto);
                pedidos.id_tabela_preco   = data.id_tabela_preco;
                pedidos.retirada          = data.retirada;
                pedidos.cnpj_emp          = data.cnpj_emp;
            })
        });
        
        const pedidoCollection  = database.get<modelPedido>('pedido');
        const listaPedido = await pedidoCollection.query(
            Q.where('id',idped)
        ).fetch();

        const pedidodetalhe = database.get<PedidoDetalhe>('pedidodetalhe');

        await database.write(async ()=>{

            const listdet = await pedidodetalhe.query(
                Q.where('pedido_id',listaPedido[0].pedido_id)
            ).fetch();

            listdet.forEach(async (item:PedidoDetalhe)=>{
                const pedidosdet = await database.get<PedidoDetalhe>('pedidodetalhe').find(item.id);
                await pedidosdet.destroyPermanently();
            })
        });


        await database.write(async ()=>{
            currentData.map( async (item:CarrinhoProps)=>{            
                await pedidodetalhe.create((newPedidoDetalhe)=>{
                    newPedidoDetalhe.pedido_id = listaPedido[0].pedido_id;
                    newPedidoDetalhe.qtd       = String(item.quantidade);
                    newPedidoDetalhe.preco     = String(item.preco);
                    newPedidoDetalhe.cod_prod  = String(item.codigo);
                    newPedidoDetalhe.pc        = item.peso;
                    newPedidoDetalhe.desconto  = '0';
                    newPedidoDetalhe.obs       = String(item.obs);
                    newPedidoDetalhe.tipo_pc_qtd = String(item.tipo);
                })
            });
        });
        

        await AsyncStorage.removeItem(dataKey);
        
        navegation2.navigate('Confirmation',{      
            nextScreenRoute:'MeusPedidos',
            title:'Pedido Criado com sucesso!',
            message:`Seu pedido foi Alterado\nagora clique para voltar a fazer mais pedidos`,
            buttontitle:"Voltar"
          });

    } catch (error) {
        console.log(error);
        Alert.alert("Não foi possivel alterar");
    }

}

async function getDadosAlteracao() {
    //console.log('teste');
    const pedidoCollection  = database.get<modelPedido>('pedido');
    const listaPedido = await pedidoCollection.query(
        Q.where('id',idped)
    ).fetch();
      const dateformat = new Date(listaPedido[0].data_entrega);
       console.log(dateformat);
    
    setSelectedDateTime(addDays(dateformat,1));
    setValue('obs',listaPedido[0].obs);

}

useEffect(()=>{
    TotaisShopping();
    getCondicoesPagamento();

    if(tipo === 'alterar'){
        getDadosAlteracao();
    }

},[])


 return(
   <Container>
       <Header>
           <DadosCliente>
               <ContentImage>
                   <ImagemCli source={{uri:cli.foto == '' ? `https://ui-avatars.com/api/?name=${cli.NOME}&length=1`:cli.foto}} />
               </ContentImage>
               <DetailWrapper>
                    <TitloCli>Entregar em:</TitloCli>
                   <Nomecli>{cli.NOME}{'\n'}({cli.FANTASIA})</Nomecli>
                   <EnderecoCli>{cli.ENDERECO}</EnderecoCli>
               </DetailWrapper>
           </DadosCliente>
       </Header>

       <Content
        showsVerticalScrollIndicator={false}     
        contentContainerStyle={{          
            paddingBottom:60
        }}   
       >

            <LabelName>Data Entrega:</LabelName>
            <DataEntrega onPress={hendlerOpenDatetimPickerForAndroid}>
                <IconContainer>
                    <IconeData name="calendar"/>
                </IconContainer>
                <Title>{`${format(SelectedDateTime,'dd/MM/Y')}`}</Title>
            </DataEntrega>

            <LabelName>Forma Pagamento:</LabelName>    
            <FormaPagamento>
                <IconContainerForma>
                    <IconPagament name="payment" />
                </IconContainerForma>    
                <DetailsFormaPagamento>
                    <TitleForma>{condpag}</TitleForma>
                    <Prazos>Prazos: {cli.PRAZO1}/{cli.PRAZO2}/{cli.PRAZO3}/{cli.PRAZO4}/{cli.PRAZO5}</Prazos>
                </DetailsFormaPagamento>    
            </FormaPagamento>
            
            <ContentCarrinho>
                <TitleCarrinho>ITENS DO CARRINHO</TitleCarrinho>
                <DetailsCarrinho
                    showsVerticalScrollIndicator={true}               
                >
                    <ItensCarrinho cli={cli} />
                </DetailsCarrinho>
            </ContentCarrinho>

            <LabelName>Obs:</LabelName>
           
            <InputForm
                    name="obs"
                    control={control} 
                    multiline={true}    
                    numberOfLines={5}                                                              
                    placeholder="Observação geral do pedido"
                    autoCapitalize="sentences"
                    autoCorrect={false}   
                    error={errors.obs && errors.obs.message}  
                    textAlignVertical='top'                       
                />

            <Footer>                
                <ContentFooter>
                    <TotalItens>Total:</TotalItens>
                    <TotalPrice>R$ {total}</TotalPrice>
                </ContentFooter>              
            </Footer>

            <Button title={tipo == 'alterar' ? "FAZER ALTERAÇÃO PEDIDO":"FAZER PEDIDO"} onPress={tipo == 'alterar' ? handlerAlterarPedido : handlerInsertpedido} />
       </Content> 
       
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={SelectedDateTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      
   </Container>
  );
}