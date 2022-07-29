import React,{useEffect,useState} from 'react'; 
import { Text } from 'react-native';
import { InputForm } from '../../components/Form/inputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {getBottomSpace} from 'react-native-iphone-x-helper';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { CondicoesPagamento as modelCondicoesPagamento } from '../../databases/model/CondicoesPagamento';
import { Pedido as modelPedido } from '../../databases/model/Pedido';
import { PedidoDetalhe as modelPedidoDetalhe } from '../../databases/model/PedidoDetalhe';

import { MaskCnpjCpf,mphone,formatarCep,formataCampo } from '../../Utils/mask';

import { database } from '../../databases';
import { Q } from '@nozbe/watermelondb';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/core';

import {
 Container,
 Header,
 HeaderNavegation, 
 Title,
 Content,
 PrevHome,
 NavIcon,
 LabelName,
 InputObs,
 Hr,
 Ttile,
 Options,
 Option,
 OptionTitile,
 Section,
 PedidoFeitoList,
 Form
} from './styles';
import { SelectButton } from '../../components/Form/SelectButton';
import { PedidoCard } from '../../components/PedidoCard';

interface ClienteProps{
    id:string;
}

interface Props{
    data:ClienteProps,
    closeSelectdBox:()=>void;
}

export interface PedidoProps{
    id:string;
    codreta:string;
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

export interface StatusProps{
    id:string;
    tipo:string;
    nome:string;    
}

export function ClienteProfile({data,closeSelectdBox}:Props) {
    
    const [selpedido,setSelpedido] = useState<BoxYesNot[]>([]);
    const [obs,setObs] = useState('');
    const [option,setOption]   = useState<'datacli' | 'dataped'>('datacli');
    const [formapagamento,setFormapaGamento] = useState({
        key:'selecione',
        name:'Sem forma de pagamento',
    });
    const [vtotalgeral,setVtotalgeral] = useState(0);
    const [pedidos,setPedidos] = useState<PedidoProps[]>([]);

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;
        goBack:()=>void;
     }
    
    const navigator = useNavigation<NavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState:{ errors }
    } = useForm();

    function handlerOptionChange(optionSelected:'datacli' | 'dataped'){
        setOption(optionSelected);
    }

    function handlerClicadoPed(ped:PedidoProps){
        navigator.navigate('DetailsPedido',{ped:ped});
    }

   async function LoaderData(){
        try {
            const clienteCollection = database.get<modelClientes>('clientes');
            const cliente = await clienteCollection.query(Q.where('CODIGO',data.id)).fetch();

            const colectionCondicoesPagamento  = database.get<modelCondicoesPagamento>('condicoes_pagamento');
            const datacondicoespagamento = await colectionCondicoesPagamento.query(
                Q.where('codigo',cliente[0].COND_PAG)
            ).fetch();



            setValue('codigo',cliente[0].CODIGO);
            setValue('nome',cliente[0].NOME);
            setValue('fantasia',cliente[0].FANTASIA);
            setValue('cnpjcpf',MaskCnpjCpf(cliente[0].CNPJ_CPF));
            setValue('insc',cliente[0].INSCRICAO);
            setValue('telefone',mphone(cliente[0].TELEFONE));    
            setValue('email',cliente[0].E_MAIL); 
            
            if(datacondicoespagamento.length > 0){
                setFormapaGamento({
                    key:cliente[0].COND_PAG,
                    name:datacondicoespagamento[0].decricao,
                });
            }

            setValue('prazos',`${cliente[0].PRAZO1}/${cliente[0].PRAZO2}/${cliente[0].PRAZO3}/${cliente[0].PRAZO4}/${cliente[0].PRAZO5}`); 
            setValue('limite',parseFloat(String(cliente[0].LIMITE)).toLocaleString('pt-br',
            { minimumFractionDigits: 2, maximumFractionDigits: 2 })); 

            setObs(`${cliente[0].OBS}${'\n'}${cliente[0].MOTIVO_BLOQUEIO}`);

            setValue('cep',formataCampo(cliente[0].CEP,'00000-000'));     
            setValue('endereco',cliente[0].ENDERECO); 
            setValue('bairro',cliente[0].BAIRRO); 
            setValue('cidade',`${cliente[0].CIDADE}/${cliente[0].ESTADO}`);    
        } catch (error) {
            console.log(error);
        }
    }

   async function LoaderDataPedido(){
        try {
            
    
            const pedidoCollection  = database.get<modelPedido>('pedido');
            const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
            const clienteCollection = database.get<modelClientes>('clientes');
            const cliente = await clienteCollection.query(Q.where('CODIGO',data.id)).fetch();
            
            const  dataP:PedidoProps[]  = []; 

            const listaPedido       = await pedidoCollection.query(
                Q.where('codigo_cliente',cliente[0].CODIGO)
            ).fetch();

            const detalhepedido     = await detalheCollection.query().fetch();
            let totalgeral = 0;

            listaPedido.forEach(async (item:modelPedido)=>{
                let subtotal  = 0; 
                let vDesconto = 0; 
                let vTotFinal = 0;

                detalhepedido.forEach((itemd:modelPedidoDetalhe)=>{
                    if(itemd.pedido_id === item.pedido_id ){
                        const valor =  (Number(itemd.preco.replace(",",".")) * Number(itemd.qtd));
                        const valordesc = Number(itemd.desconto);
                        const vTotalFinal = Number(valor) - Number(itemd.desconto);
                        subtotal +=valor;
                        vDesconto +=valordesc;
                        vTotFinal +=vTotalFinal;

                        totalgeral += vTotalFinal;
                    }
                })    
                
                dataP.push({
                    id:item.id,
                    tipo:item.status,
                    nomecli:cliente[0].NOME,
                    nomefant:cliente[0].FANTASIA,
                    dtemissao:item.data_pedido,
                    dtentrega:item.data_entrega,
                    total:String(subtotal),
                    totaldesc:String(vDesconto),
                    totalfinal:String(vTotFinal),
                    codreta:item.CODIGO_RETAGUARDA
                })

            })

            setPedidos(dataP);
            setVtotalgeral(totalgeral);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        LoaderData();
        LoaderDataPedido();
    },[data.id])

 return(
   <Container>
       <Header>
            <HeaderNavegation>
                
                <PrevHome onPress={closeSelectdBox}>                    
                    <NavIcon name="arrow-left" />
                </PrevHome>
                <Title>
                    Dados Cliente
                </Title>
            </HeaderNavegation>
        </Header>

        <Content>

        <Options>
            <Option active={option == 'datacli'} onPress={()=>handlerOptionChange('datacli')}>
                <OptionTitile active={option == 'datacli'}>Dados</OptionTitile>
            </Option>
            
            <Option active={option == 'dataped'} onPress={()=>handlerOptionChange('dataped')}>
                <OptionTitile active={option == 'dataped'}>Pedidos feitos</OptionTitile>
            </Option>

        </Options> 

        {
            option === 'datacli' ?
            <Section>
                <Form
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{                    
                        paddingBottom:getBottomSpace() + 250
                    }}
                >
                    <LabelName>Código:</LabelName>
                    <InputForm
                        name="codigo"
                        control={control}                                                                   
                        placeholder="Código"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.codigo && errors.codigo.message}     
                    />

                    <LabelName>Nome:</LabelName>
                    <InputForm
                    name="nome"
                    control={control}                                                                   
                    placeholder="Nome"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.nome && errors.nome.message}     
                    />

                    <LabelName>Nome Fantasia:</LabelName>
                    <InputForm
                    name="fantasia"
                    control={control}                                                                   
                    placeholder="Fantasia"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.fantasia && errors.fantasia.message}     
                    />

                    <LabelName>CPF/CNPJ:</LabelName>
                    <InputForm
                    name="cnpjcpf"
                    control={control}                                                                   
                    placeholder="CPF/CNPJ"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.cnpjcpf && errors.cnpjcpf.message}     
                    />

                    <LabelName>Inscrição Estadual:</LabelName>
                    <InputForm
                    name="insc"
                    control={control}                                                                   
                    placeholder="Inscrição Estadual"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.insc && errors.insc.message}     
                    />

                    <LabelName>Telefone:</LabelName>
                    <InputForm
                    name="telefone"
                    control={control}                                                                   
                    placeholder="Telefone"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.telefone && errors.telefone.message}     
                    />

                    <LabelName>E-Mail:</LabelName>
                    <InputForm
                    name="email"
                    control={control}                                                                   
                    placeholder="E-Mail"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.email && errors.email.message}     
                    />

                    <LabelName>Forma de Pagamento:</LabelName>
                    <SelectButton title={formapagamento.name} onPress={()=>{}}/>

                    <LabelName>Prazos 1/2/3/4/5:</LabelName>
                    <InputForm
                    name="prazos"
                    control={control}                                                                   
                    placeholder="Prazos"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.prazos && errors.prazos.message}     
                    />

                    <LabelName>Limite:</LabelName>
                    <InputForm
                    name="limite"
                    control={control}                                                                   
                    placeholder="Limite"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.limite && errors.limite.message}     
                    />

                <LabelName>Observação:</LabelName>
                <InputObs multiline={true} numberOfLines={4} value={obs} />

                <Hr>
                        <Ttile>Endereço Cliente</Ttile>
                </Hr>

                <LabelName>Cep:</LabelName>
                <InputForm
                    name="cep"
                    control={control}                                                                   
                    placeholder="Cep"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.cep && errors.cep.message}     
                    />

                <LabelName>Endereço:</LabelName>
                <InputForm
                    name="endereco"
                    control={control}                                                                   
                    placeholder="Endereço"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.endereco && errors.endereco.message}     
                    />

                <LabelName>Bairro:</LabelName>
                <InputForm
                    name="bairro"
                    control={control}                                                                   
                    placeholder="Bairro"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.bairro && errors.bairro.message}     
                    />

                <LabelName>Cidade/UF:</LabelName>
                <InputForm
                    name="cidade"
                    control={control}                                                                   
                    placeholder="Cidade/UF"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.cidade && errors.cidade.message}     
                    />
                </Form>
            </Section>
            :
            <Section>
                <PedidoFeitoList
                    data={pedidos}
                    keyExtractor={items=>items.id}
                    renderItem={({item})=>
                    <PedidoCard 
                            key={item.id}
                            dados={item}
                            boxyesnot={selpedido}
                            setBoxYesNot={setSelpedido}
                            onPress={()=>handlerClicadoPed(item)}                       
                            onLongPress={()=>{}}
                    />
                    }
                                       
                />
             </Section>
        }

        </Content>

   </Container>
  );
}