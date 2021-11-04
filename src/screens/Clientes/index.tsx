import React,{useRef,useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { Modalize } from 'react-native-modalize';
import {VirtualizedList} from 'react-native';
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
    Separador
} from './styles';

import { InputFilter } from '../../components/Form/InputFilter';
import { OptionsFilter } from '../OptionsFilter';

export function Clientes(){
    const [optionfilter,setOptionfilter] = useState({
        key:'selecione',
        name:'Selecione',
    });
    const modalizeRef = useRef<Modalize>(null);
    

    type NavigationProps = {
        navigate:(screen:string) => void;
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
                        🤓 32 Clientes
                     </CiliTitle>
                </CountCli>

                <FilterForm>
                    <IconWrapper>
                        <Iconfilter name="filter"/>
                    </IconWrapper>   
                    <Field>
                       <InputFilter placeholder="Filtrar por nome, razão social, cnpj " placeholderTextColor="#fff" />
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
            
             
        </Container>

        
    );
}