import React,{useRef,useState,useEffect} from 'react';
import {Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import  {api}  from '../../services/api';
import {ClienteDTO} from '../../dtos/ClienteDTO';
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

export function Clientes(){
    const [loading,setLoading] = useState(true); 
    const [clients,setclients] = useState<ClienteDTO[]>([]);
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

    function handlerBoxdadosCliemte(clients:ClienteDTO){
        navigator.navigate('ProuctView',clients);

    }

    useEffect(()=>{
        if(buttonCli.id != ''){
            modalizedadoscli.current?.open();
        }
    },[buttonCli])

    useEffect(()=>{  
        
        async function fecthClient() {
            try {
                const response = await api.get("/cliente?_limit=7");
                const data     = response.data;
                setclients(data);  
                setLoading(false);
            } catch (error) {
                console.log(error);                
                setLoading(false);
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