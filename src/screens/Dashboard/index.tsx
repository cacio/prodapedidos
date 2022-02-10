import React,{useEffect,useState} from 'react';
import { HighlightCard,TransactionCardProps } from '../../components/HighlightCard';
import { MenuCard,TransactionCardMenuProps } from '../../components/MenuCard';
import { useAuth } from '../../hooks/auth';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import {useNetInfo} from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../databases';
import {format,addDays } from 'date-fns';

import { Container,Header,UserInfo,Photo,User,UserGreeting,UserName,UserWrapper,Icon,HighlightCards,MenuDashboard,Title,MenuDashboardList,LogoutButton} from './styles';
import { api } from '../../services/api';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { Pedido as modelPedido } from '../../databases/model/Pedido';
import { PedidoDetalhe as modelPedidoDetalhe } from '../../databases/model/PedidoDetalhe';
import { Q } from '@nozbe/watermelondb';
import { number } from 'yup';
import { Load } from '../../components/Load';

export interface DataCliListProps extends TransactionCardProps {
    id:string;
};

export interface DataListMenuCard extends TransactionCardMenuProps{
    id:string;
}
interface PedidoTot{
    total:number;
}


export function Dashboard(){
    
    const {signOut,user} = useAuth();
    const netInfo = useNetInfo();
    const [menu,setMenu] = useState<DataListMenuCard[]>([]);
    const [datacli,setDatacli] = useState<DataCliListProps[]>([])
    const [detalhes,setDestalhes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [loadingCard,setLoadingCard] = useState(true); 
    const screenIsFocus = useIsFocused();
    type NavigationProps = {
        navigate:(screen:string) => void;
     }

    const navigator = useNavigation<NavigationProps>();

    /*const datacli: DataCliListProps[] = 
            [
                {
                    id:'1',
                    type:"up", 
                    nome:"Cacio renato da silva", 
                    fantasia:"cacio", 
                    amount : "R$ 17.400,00",
                    lastTransaction:"Última compra dia 13 de abril",
                },
                {
                    id:'2',
                    type:"up", 
                    nome:"Jorge da Rosa", 
                    fantasia:"Mercado do Jorge", 
                    amount : "R$ 19.400,00",
                    lastTransaction:"Última compra dia 13 de abril",
                },
                {
                    id:'3',
                    type:"up", 
                    nome:"Mercado e varejo do cristofer", 
                    fantasia:"Mercadinho do Cristofer", 
                    amount : "R$ 17.400,00",
                    lastTransaction:"Última compra dia 13 de abril",
                },

            ];*/

    

    

    function handlerSelctedMenu(menu:String){
        if(menu == '1'){
            navigator.navigate('Clientes');
        }else if(menu == '2'){
            navigator.navigate('MeusPedidos');
        }
    }

    function Perfil(){        
        navigator.navigate('Profile');
    }

  
    async function offlineSyncronize() {
           
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) =>{
                console.log("lastPulledAt: ",lastPulledAt);
                const reponse = await api.get(`clientes/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const {changes, latestVersion} = reponse.data;
                console.log(" ## recebendo dados ## ");
                console.log(lastPulledAt, latestVersion,changes);

                return {changes,timestamp:latestVersion};

            },
            pushChanges: async ({changes}) =>{
                const usuarios = changes.usuarios;
                console.log("### mandando pro backend ###");
                if(usuarios.updated.length > 0){
                    
                    console.log(usuarios);
                    await api.post('usuarios/async',usuarios);
                }
                
            }

        });   

    }
    async function TotalPedidoDia(){

        const dataHoje = String(format(new Date(),'Y-MM-dd'));
        
        
        const pedidoCollection = database.get<modelPedido>('pedido');
        const totalPedido      = await pedidoCollection.query(
            Q.where('data_pedido',dataHoje)
        ).fetch();

        const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
        const detalhepedido     = await detalheCollection.query().fetch();

        let totalgeral  = 0;
        
        totalPedido.map(async (item:modelPedido)=>{

            //const detalhepedido  = await item.detalhe.fetch();
           
            detalhepedido.forEach((itemd:modelPedidoDetalhe)=>{
                if(itemd.pedido_id === item.pedido_id ){
                    const valor =  (Number(itemd.preco.replace(",",".")) * Number(itemd.qtd));
                    const valordesc = Number(itemd.desconto);
                    const vTotalFinal = Number(valor) - Number(itemd.desconto);         

                    totalgeral += vTotalFinal;
                }
            })    
                                      
            
        });
        
       return totalgeral;                 
    }


    async function CardsVendidoMes() {
           
        const dataHoje  = new Date();
        const dataIni   = String(format(new Date(),'Y-MM')+'-01');
        const ultimoDia = String(format(new Date(dataHoje.getFullYear(), dataHoje.getMonth() + 1, 0),'Y-MM-dd'));
        const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
        const clienteCollection = database.get<modelClientes>('clientes');
        const pedidoCollection  = database.get<modelPedido>('pedido');
        const PedidosMes        = await pedidoCollection.query(
            Q.where('data_pedido',Q.gte(dataIni)),
            Q.sortBy('codigo_cliente', Q.desc),
            
        ).fetch();
         
        const clientes          = await clienteCollection.query().fetch();
        const detalhepedido     = await detalheCollection.query().fetch();
        let xcli     = "";
        let xcli2     = "";    
        let contador = 0;    
        let arr:DataCliListProps[]  = [];
        let total = 0;
        let codcli = "";
        PedidosMes.forEach(async (itens:modelPedido)=>{

            
            if(itens.codigo_cliente != xcli2){
                xcli2 = itens.codigo_cliente;
                
                if(contador > 0){
                    
                    const lastTransaction = new Date(
                        Math.max.apply(Math,PedidosMes
                            .map(transaction => transaction.codigo_cliente == codcli ? addDays(new Date(transaction.data_pedido),1).getTime():0)));
                    const getcliente = clientes.filter(itemcli=>itemcli.CODIGO == codcli);                
                    arr.push({
                        id:String(contador),
                        type:"up", 
                        nome:getcliente[0].NOME, 
                        fantasia:getcliente[0].FANTASIA, 
                        amount : `R$ ${parseFloat(String(total)).toLocaleString('pt-br',
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                        lastTransaction:`Última compra dia ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{month:'long'})}`,
                    });
                }
                total = 0;
                codcli = "";
            }


            if(itens.codigo_cliente != xcli){
                xcli = itens.codigo_cliente;
                                
            }

            detalhepedido.forEach((itemd:modelPedidoDetalhe)=>{
                if(itemd.pedido_id === itens.pedido_id ){
                    
                    const valor =  (Number(itemd.preco.replace(",",".")) * Number(itemd.qtd));
                    const valordesc = Number(itemd.desconto);
                    const vTotalFinal = Number(valor) - Number(itemd.desconto);         

                    total += vTotalFinal;
                }
            }) 
            codcli =itens.codigo_cliente; 
            contador++;
        });
        const lastTransaction = new Date(
            Math.max.apply(Math,PedidosMes
                .map(transaction => transaction.codigo_cliente == xcli ? addDays(new Date(transaction.data_pedido),1).getTime():0)));
                const getcliente = clientes.filter(itemcli=>itemcli.CODIGO == xcli);
         if(getcliente[0]){
            arr.push({
                id:String(contador),
                type:"up", 
                nome:getcliente[0].NOME, 
                fantasia:getcliente[0].FANTASIA,  
                amount : `R$ ${parseFloat(String(total)).toLocaleString('pt-br',
                { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lastTransaction:`Última compra dia ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{month:'long'})}`,
            });
        }       
        
        if(PedidosMes.length == 0){
            arr.push({
                id:'1',
                type:"up", 
                nome:'NENHUMA COMPRA', 
                fantasia:'NENHUMA COMPRA',  
                amount : 'R$ 0,00',
                lastTransaction:`Nenhuma compra feita`
            });
        }

        setDatacli(arr);
        setLoadingCard(false);
    }

    useEffect(()=>{
       
        let isMouted = true;
        async function DadosMenu(){


            const clienteCollection = database.get<modelClientes>('clientes');
            const legnhtcliente = await clienteCollection.query().fetchCount();
                        
            const totaldia = await TotalPedidoDia();
            
            const collectionMenu =  [
                {
                    id:'1',
                    category:{
                        icon:'shopping-cart',
                        name:'shopping-cart'
                    },
                    title:"FAZER PEDIDO", 
                    subtitle:"TOTAL DE CLIENTES :", 
                    total:String(legnhtcliente)
                },
                {
                    id:'2',
                    category:{
                        icon:'shopping-cart',
                        name:'shopping-cart'
                    },
                    title:"MEUS PEDIDOS", 
                    subtitle:"TOTAL : ", 
                    total:"R$ "+parseFloat(String(totaldia)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                },
                {
                    id:'3',
                    category:{
                        icon:'user-plus',
                        name:'user-plus'
                    },
                    title:"CADASTRO CLIENTES", 
                    subtitle:"CADASTRAR OS CLIENTES", 
                    total:""
                },
                {
                    id:'4',
                    category:{
                        icon:'box',
                        name:'box'
                    },
                    title:"PRODUTOS", 
                    subtitle:"TOTAL PRODUTOS :", 
                    total:"597"
                },
                {
                    id:'5',
                    category:{
                        icon:'dollar-sign',
                        name:'dollar-sign'
                    },
                    title:"CLIENTE PARA COBRAR", 
                    subtitle:"TOTAL PARA COBRAR :", 
                    total:"597"
                },
                
                {
                    id:'6',
                    category:{
                        icon:'pie-chart',
                        name:'pie-chart'
                    },
                    title:"RELATÓRIOS", 
                    subtitle:"GERAR RELATÓRIOS", 
                    total:""
                }
            ];
            if(isMouted){
                setMenu(collectionMenu);
            }

            setLoading(false); 
        }
        //TotalPedidoDia();
        DadosMenu();
        CardsVendidoMes();
        
    },[screenIsFocus])

    useEffect(()=>{
        if(netInfo.isConnected === true){
            offlineSyncronize();
        }

    },[netInfo.isConnected]);

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo onPress={Perfil}>
                        <Photo source={{uri:user.photo ? user.photo : `https://ui-avatars.com/api/?name=${user.name}&length=1` }}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>{user.name}</UserName>
                        </User> 
                    </UserInfo>
                    <LogoutButton onPress={signOut}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>                
            </Header>

           {loadingCard ? <Load/> : 
            <HighlightCards
                data={datacli}
                keyExtractor={item => item.id}
                renderItem={({item})=> <HighlightCard data={item}/>}                
            />
           }

        {loading ? <Load/> :
            <MenuDashboard>                
                <MenuDashboardList 
                    data={menu}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>  <MenuCard data={item} onPress={()=>handlerSelctedMenu(item.id)} />}                    
                />
               
            </MenuDashboard>
        }
        </Container>
    );
}