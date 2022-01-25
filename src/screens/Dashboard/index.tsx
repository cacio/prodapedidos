import React,{useEffect,useState} from 'react';
import { HighlightCard,TransactionCardProps } from '../../components/HighlightCard';
import { MenuCard,TransactionCardMenuProps } from '../../components/MenuCard';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/core';
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
    const [detalhes,setDestalhes] = useState([]);

    type NavigationProps = {
        navigate:(screen:string) => void;
     }

    const navigator = useNavigation<NavigationProps>();

    const datacli: DataCliListProps[] = 
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

            ];

    

    

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

    useEffect(()=>{
       
       
        async function DadosMenu(){


            const clienteCollection = database.get<modelClientes>('clientes');
            const legnhtcliente = await clienteCollection.query().fetchCount();
                        
            const totaldia = await TotalPedidoDia();
            console.log(totaldia);
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
    
            setMenu(collectionMenu);
        }
        //TotalPedidoDia();
        DadosMenu();

    },[])

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

            <HighlightCards
                data={datacli}
                keyExtractor={item => item.id}
                renderItem={({item})=> <HighlightCard data={item}/>}                
            />
                           

            <MenuDashboard>                
                <MenuDashboardList 
                    data={menu}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>  <MenuCard data={item} onPress={()=>handlerSelctedMenu(item.id)} />}                    
                />
               
            </MenuDashboard>
        </Container>
    );
}