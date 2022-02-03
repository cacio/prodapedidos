import React,{useState,useEffect} from 'react'; 
import { InputFilter } from '../../components/Form/InputFilter';
import {PedidoCard} from '../../components/PedidoCard';
import { database } from '../../databases';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { Pedido as modelPedido } from '../../databases/model/Pedido';
import { PedidoDetalhe as modelPedidoDetalhe } from '../../databases/model/PedidoDetalhe';
import { Q } from '@nozbe/watermelondb';
import {format,addDays } from 'date-fns';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation,useRoute,useIsFocused } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { Load } from '../../components/Load';

import {
 Container,
 Header,
 HeaderNavegation,
 PrevHome,
 NavIcon,
 NavTitle,
 InfoTotalsDays,
 Totalday,
 TotaldayValor,
 TotaldayTitle,
 LengthDay,
 LengthDayValor,
 LengthDayText,
 FilterForm,
 IconWrapper,
 Iconfilter,
 Field,
 ButtonTypeFilter,
 IconTypeFilter,
 Separador,
 ContentStatus,
 Status,
 TipoStatus,
 StatusText,
 PedidoFeitoList,
 ButtonEnvPed,
 TextEnvPed
} from './styles';

export interface StatusProps{
    id:string;
    tipo:string;
    nome:string;    
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


export function MeusPedidos() {
    const [selpedido,setSelpedido] = useState<BoxYesNot[]>([]);
    const [loading,setLoading] = useState(true);
    const [vtotalgeral,setVtotalgeral] = useState(0);
    const [pedidos,setPedidos] = useState<PedidoProps[]>([]);
    const [btnhide,setBtnHide] = useState(false);
    const theme = useTheme();
    const screenIsFocus = useIsFocused();

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;
        goBack:()=>void;
     }
    
    const navigator = useNavigation<NavigationProps>();

    const dataStatus:StatusProps[] = [
        {
            id:'1',
            tipo:'P',
            nome:'Pedente'    
        },
        {
            id:'2',
            tipo:'S',
            nome:'Sincronizado'    
        },
        {
            id:'3',
            tipo:'PR',
            nome:'Pedente Restrições'    
        }

    ];

   function handlerSelectionPed(item:BoxYesNot){

        const itemn = {
            key:item.key,
            name:item.name,
        };

        let dataFormatted:BoxYesNot[] = [];
                
        const itemnovo = selpedido.filter((items:BoxYesNot)=>
            items.key != item.key         
        );         

        const colectionNewPed = itemnovo;  
        
        const selnovo = selpedido.filter((items:BoxYesNot)=>
            items.key === item.key         
        );
        
       
        
        if(selnovo[0]){            
             dataFormatted =[ 
                ...colectionNewPed              
            ];
        }else{            
            dataFormatted =[ 
                ...colectionNewPed,
                itemn
            ];
        }

        setSelpedido(dataFormatted);

       
               
    }

    

    function handlerClicadoPed(ped:PedidoProps){
        navigator.navigate('DetailsPedido',{ped:ped});
    }


    async function FilterStatusPedidos(tipo:String) {

            const pedidoCollection  = database.get<modelPedido>('pedido');
            const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
            const collectionCliente = database.get<modelClientes>('clientes');

            const  data:PedidoProps[]  = [];             
            const newTipo = tipo ? String(tipo): '0';

            const listaPedido       = await pedidoCollection.query(
                Q.where('status',newTipo)
            ).fetch();
            const detalhepedido     = await detalheCollection.query().fetch();
            const datacli           = await collectionCliente.query().fetch();
            let totalgeral = 0;
            listaPedido.forEach(async (item:modelPedido)=>{
                
                const cliente  = datacli.filter((itemcli:modelClientes)=>itemcli.CODIGO == item.codigo_cliente);

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
                
                data.push({
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
                
            });

            setPedidos(data);
            setVtotalgeral(totalgeral);
        
    }


    useEffect(()=>{
        let isMouted = true;
        async function ListPeidos() {
            try {
                const pedidoCollection  = database.get<modelPedido>('pedido');
                const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
                const collectionCliente = database.get<modelClientes>('clientes');

                const  data:PedidoProps[]  = [];             
                const dataDay =  String(format(new Date(),'Y-MM-dd')); 

                const listaPedido       = await pedidoCollection.query(
                    Q.where('data_pedido',dataDay)
                ).fetch();
                const detalhepedido     = await detalheCollection.query().fetch();
                const datacli           = await collectionCliente.query().fetch();
                let totalgeral = 0;
                listaPedido.forEach(async (item:modelPedido)=>{
                    
                    const cliente  = datacli.filter((itemcli:modelClientes)=>itemcli.CODIGO == item.codigo_cliente);

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
                    
                    data.push({
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
                    
                });
                if(isMouted){
                    setPedidos(data);
                    setVtotalgeral(totalgeral);
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

        ListPeidos();
    },[screenIsFocus])

    useEffect(()=>{        
        if(selpedido.length > 0){
            setBtnHide(true);
        }else{
            setBtnHide(false);
        }
    },[selpedido])

 return(
   <Container>
       <Header>
                <HeaderNavegation>
                    <PrevHome onPress={()=>{}}>                    
                        <NavIcon name="arrow-left" />
                    </PrevHome>
                    <NavTitle>
                        Pedidos Feitos
                    </NavTitle>
                </HeaderNavegation>
                
                <InfoTotalsDays>      
                    <Totalday>                 
                       <TotaldayValor>R$ {parseFloat(String(vtotalgeral)).toLocaleString('pt-br',
                                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotaldayValor>
                        <TotaldayTitle>VALOR TOTAL DO DIA</TotaldayTitle>
                    </Totalday>
                     <LengthDay>                        
                         <LengthDayValor>{pedidos.length}</LengthDayValor>
                         <LengthDayText>TOTAL PEDIDO DIA</LengthDayText>
                     </LengthDay>
                </InfoTotalsDays>

                <FilterForm>
                    <IconWrapper>
                        <Iconfilter name="filter"/>
                    </IconWrapper>   
                    <Field>
                       <InputFilter placeholder="Buscar" placeholderTextColor="#fff" />
                    </Field> 
                    <ButtonTypeFilter onPress={()=>{}}>
                        <IconTypeFilter name="sliders"/>
                    </ButtonTypeFilter>                    
                </FilterForm>
                <Separador></Separador>

                <ContentStatus
                    data={dataStatus}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=> 
                    <Status colors={Number(item.id)} key={item.id} onPress={()=>FilterStatusPedidos(item.id)}>
                        <TipoStatus>{item.tipo}</TipoStatus>
                        <StatusText>{item.nome}</StatusText>
                    </Status>                    
                }   
                />
                
            </Header>
            {loading ? <Load/> :    
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
                        onLongPress={()=>handlerSelectionPed({key:item.id,name:'selecionado'})}
                   />
                }
            />
            }

           {
            btnhide ?   
                <ButtonEnvPed>                        
                        <Ionicons name="ios-cloud-upload-outline" size={32} color={theme.colors.shape}/>
                        <TextEnvPed>ENVIAR PEDIDOS</TextEnvPed>
                </ButtonEnvPed> : null
            }
   </Container>
  );
}