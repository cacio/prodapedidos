import React from 'react';
import { HighlightCard,TransactionCardProps } from '../../components/HighlightCard';
import { MenuCard,TransactionCardMenuProps } from '../../components/MenuCard';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/core';

import { Container,Header,UserInfo,Photo,User,UserGreeting,UserName,UserWrapper,Icon,HighlightCards,MenuDashboard,Title,MenuDashboardList,LogoutButton} from './styles';

export interface DataCliListProps extends TransactionCardProps {
    id:string;
};

export interface DataListMenuCard extends TransactionCardMenuProps{
    id:string;
}

export function Dashboard(){
    
    const {signOut,user} = useAuth();
    
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

    

    const data: DataListMenuCard[] = [
        {
            id:'1',
            category:{
                icon:'shopping-cart',
                name:'shopping-cart'
            },
            title:"FAZER PEDIDO", 
            subtitle:"TOTAL DE CLIENTES :", 
            total:"1550"
        },
        {
            id:'2',
            category:{
                icon:'shopping-cart',
                name:'shopping-cart'
            },
            title:"MEUS PEDIDOS", 
            subtitle:"TOTAL : ", 
            total:"R$ 17.400,00"
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

    function handlerSelctedMenu(menu:String){
        if(menu == '1'){
            navigator.navigate('Clientes');
        }
    }

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri:user.photo}}/>
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
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>  <MenuCard data={item} onPress={()=>handlerSelctedMenu(item.id)} />}                    
                />
               
            </MenuDashboard>
        </Container>
    );
}