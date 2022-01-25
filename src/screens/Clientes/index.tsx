import React,{useRef,useState,useEffect} from 'react';
import {Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
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
    ClientLista
} from './styles';

import { InputFilter } from '../../components/Form/InputFilter';
import { OptionsFilter } from '../OptionsFilter';
import { ClienteCard} from '../../components/ClienteCard';
import { Load } from '../../components/Load';
import { useAuth } from '../../hooks/auth';
import { database } from '../../databases';

export function Clientes(){
    const {user} = useAuth();

    const [loading,setLoading] = useState(true); 
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

    function handlerBoxdadosCliemte(clients:modelClientes){
        navigator.navigate('ProuctView',{cli:clients});

    }

    useEffect(()=>{
        if(buttonCli.id != ''){
            modalizedadoscli.current?.open();
        }
    },[buttonCli])

    useEffect(()=>{  
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
        fecthClient();
        //fecthClients();
    },[]);
 
    
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
                        Clientes{'\n'}
                        Disponíveis
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
                       <InputFilter placeholder="Buscar Cliente" placeholderTextColor="#fff" />
                    </Field> 
                    <ButtonTypeFilter onPress={handlerOpenFilterModalize}>
                        <IconTypeFilter name="chevron-down"/>
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
                />
            }
             <Modalize ref={modalizedadoscli}>                
               <Text>{buttonCli.id} -  {buttonCli.tipo}</Text>
             </Modalize>
            
             
        </Container>

        
    );
}