import React,{useRef,useState,useEffect} from 'react';
import {Text,Modal,Alert} from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { DuplicReceber as modelDuplicReceber } from '../../databases/model/DuplicReceber';
import { Q } from '@nozbe/watermelondb';
import { formatDistance,differenceInBusinessDays,differenceInCalendarDays,differenceInDays,addMonths } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Container,
    Header,
    HeaderNavegation,
    NavIcon,
    NavTitle,
    CountCli,
    CountName,
    CiliTitle,
    PrevHome,
    FilterForm,
    IconWrapper,
    Iconfilter,
    Field,
    ButtonTypeFilter,
    IconTypeFilter,
    Separador,
    ClientLista,
    ContentButtons,
    ButtonFatura,
    ButtonDetalhe,
    DetalheText,
    FatutaText,
    IconBotton
} from './styles';

import { InputFilter } from '../../components/Form/InputFilter';
import { OptionsFilter } from '../OptionsFilter';
import { ClienteCard} from '../../components/ClienteCard';
import { Load } from '../../components/Load';
import { useAuth } from '../../hooks/auth';
import { database } from '../../databases';
import { DuplicataCard } from '../../components/DuplicataCard';
import { ClienteProfile } from '../ClienteProfile';

interface DuplicataProps{
    id:string
}

export function Clientes(){
    const {user} = useAuth();
    const [searchText,setSearchText] = useState('');
    const [loading,setLoading] = useState(true); 
    const [openmodal,setOpenmodal] = useState(false); 
    const [clients,setclients] = useState<modelClientes[]>([]);
    const [optionfilter,setOptionfilter] = useState({
        key:'1',
        name:'Nome Fantasia',
    });

    const [buttonCli,setSuttonCli] = useState({
        id:'',
        tipo:''
    });

    const modalizeRef      = useRef<Modalize>(null);
    const modalizedadoscli = useRef<Modalize>(null);
    const screenIsFocus   = useIsFocused();

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;        
     }

    

    const navigator = useNavigation<NavigationProps>();

    function HandlerPrevHome(){        
        navigator.navigate('home');
    }

    function handlerOpenFilterModalize(){
        modalizeRef.current?.open();
    }

    function handlerCloseFilterModalize(){
        modalizeRef.current?.close();
    }

    async function handlerBoxdadosCliemte(clients:modelClientes){
        const tDate      = new Date();
        const startDate  = new Date(tDate.getFullYear(),tDate.getMonth(),tDate.getDate());
        const dataKey    = '@prodapedido:config';
        const response   = await AsyncStorage.getItem(dataKey);                    
        const dataconfig = response ? JSON.parse(response) : [];
       // console.log(dataconfig[0].limitediasbloqueiocliente);
        
        const duplicrecerberCollection = database.get<modelDuplicReceber>('duplic_receber');
        const dataduplicreceber        = await duplicrecerberCollection.query(Q.where('cod_cli',clients.CODIGO)).fetch(); 
        let   iCont     = 0;
        dataduplicreceber.forEach((items:modelDuplicReceber)=>{

                const ndup            = items.ndup;
                const vlrdup          = items.vlrdup;
                const vencdup         = new  Date(items.vencdup.split('T')[0]);
                const forma_pagamento = items.forma_pagamento;                
                const diasdiferenca   =  differenceInDays(startDate, vencdup);

                if(diasdiferenca > dataconfig[0].limitediasbloqueiocliente){
                    iCont++;
                }

        });
       
        console.log(clients.ATIVO)
        if(clients.ATIVO === 'S'){
            if(iCont > 0){
                setSuttonCli({
                    id:clients.CODIGO,
                    tipo:'financ'
                });
                
                setOpenmodal(true);
                
                Alert.alert(
                    'MENSAGEM FINANCEIRO EM ABERTO',
                    `Cliente possui título(s) vencido(s)! Para maiores informações, consulte o financeiro:${'\n'}${'\n'}*para prosseguir o pedido clique no botão [ABRIR PEDIDOS] abaixo`,
                    [                      
                      {
                        text:'Fechar',
                        onPress:()=>{}
                      }
                    ]
                  );    

            }else{
                navigator.navigate('ProuctView',{cli:clients});
            }
        }else{
            Alert.alert(
                'Cliente Bloqueado!',
                `Motivo do bloqueio:${'\n'}${clients.MOTIVO_BLOQUEIO}`,
                [                      
                  {
                    text:'Fechar',
                    onPress:()=>{}
                  }
                ]
              );
        }

    }

    function CloseBox(){
        setOpenmodal(false)       
    }

    function OpenBox(clients:modelClientes,tipo:'financ'|'view'){
        setSuttonCli({
            id:clients.CODIGO,
            tipo:tipo
        });

        setOpenmodal(true) 
    }

    let isMouted = true;
    async function fecthClient() {
            
        try {
           
            const clienteCollection = database.get<modelClientes>('clientes');
            const cliente = await clienteCollection.query().fetch();
           
           /* await database.write(async ()=>{
                const cliSelected = await clienteCollection.find('qc5f4sv4sh1b9v4r')
                await cliSelected.destroyPermanently();                
            });*/

            
            if(isMouted){
               setclients(cliente);
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

    useEffect(()=>{
        if(buttonCli.id != ''){
            //modalizedadoscli.current?.open();
            setOpenmodal(true);
        }
    },[buttonCli])

    useEffect(()=>{  
        setOpenmodal(false);
        setLoading(true);
        if(searchText === ''){
            fecthClient();
        }else{
            
            setclients(
                clients.filter((item:modelClientes)=>{
                    if(optionfilter.key === '1'){
                        return (item.FANTASIA.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
                    }else if(optionfilter.key === '2'){
                        return (item.NOME.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
                    }else{
                        return (item.CNPJ_CPF.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
                    }
                })
            );


        }

        //fecthClients();
    },[searchText,screenIsFocus]);
 
    
    return(
        <Container>
            <Header>
                <HeaderNavegation>
                    <PrevHome onPress={()=>HandlerPrevHome()}>                    
                        <NavIcon name="arrow-left" />
                    </PrevHome>
                    <NavTitle>
                        Meus Pedidos
                    </NavTitle>
                </HeaderNavegation>
                
                <CountCli>      
                    <CountName>                 
                        Clientes Disponíveis
                    </CountName>
                     <CiliTitle>                        
                        🤓 {clients.length} Clientes
                     </CiliTitle>
                </CountCli>

                <FilterForm>
                    <IconWrapper>
                        <Iconfilter name="filter"/>
                    </IconWrapper>   
                    <Field>
                       <InputFilter 
                            placeholder="Buscar Cliente" 
                            placeholderTextColor="#fff" 
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </Field> 
                    <ButtonTypeFilter onPress={handlerOpenFilterModalize}>
                        <IconTypeFilter name="sliders"/>
                    </ButtonTypeFilter>                    
                </FilterForm>
                <Separador></Separador>
            </Header>

            <Modalize ref={modalizeRef}>                
                <OptionsFilter
                    boxoptions={optionfilter}
                    setBoxOptions={setOptionfilter}
                    closeSelectdBox={handlerCloseFilterModalize}
                    title="Filtrar por ?"
                />
            </Modalize>
            
            {loading ? <Load/> : 
                <ClientLista                             
                    data={clients}
                    keyExtractor={item => item.CODIGO}
                    renderItem={({item})=> <ClienteCard onPress={()=>handlerBoxdadosCliemte(item)}  setbuttonselected={setSuttonCli}  data={item}  /> }                    
                    renderHiddenItem={({item})=>
                        <ContentButtons>
                            <ButtonFatura onPress={()=>OpenBox(item,'financ')}>
                                <IconBotton name="monetization-on" /> 
                                <FatutaText>Financeiro</FatutaText>
                            </ButtonFatura>
                            <ButtonDetalhe onPress={()=>OpenBox(item,'view')}>
                            <IconBotton name="wysiwyg" /> 
                                <DetalheText>
                                    Editar
                                </DetalheText>
                            </ButtonDetalhe>
                        </ContentButtons>
                    }
                    leftOpenValue={0}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}                    
                  
                />
            }
             {/*<Modalize ref={modalizedadoscli}>                
               
               {
                buttonCli.tipo == 'financ' ? 
                    <DuplicataCard 
                        data={
                            buttonCli                            
                        } 
                        closeSelectdBox={CloseBox} 
                    /> 
                    : <Text>teste dados</Text>
               }
             </Modalize>
            */}
             <Modal 
                visible={openmodal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => {                    
                    setOpenmodal(!openmodal);
                  }}
                >
              {
                buttonCli.tipo == 'financ' ? 
                    <DuplicataCard 
                        data={
                            buttonCli
                        }
                        closeSelectdBox={CloseBox} 
                    /> 
                    : <ClienteProfile
                        data={
                            buttonCli
                        }
                        closeSelectdBox={CloseBox}
                    />
               }
             </Modal>
        </Container>

        
    );
}