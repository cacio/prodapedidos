import React,{useState,useCallback} from 'react';
import { Modal, Platform,Alert } from 'react-native';
import {useForm} from 'react-hook-form';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import {useNavigation} from '@react-navigation/native';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { opcoes } from '../../Utils/opcoes';
import { impliente } from '../../Utils/importacliente';

import { InputForm } from '../../components/Form/inputForm';
import { Button } from '../../components/Form/Button';
import { SelectButton } from '../../components/Form/SelectButton';

import { Container,Header,Title,Form,Fields, Content,ButtonDate,DateTitle,DateIcon } from './styles';
import { BoxSelected } from '../BoxSelected';
import { useFocusEffect } from '@react-navigation/core';

interface DataListProps{
    key?:string,
    name?:string;
}

interface FormData {
    name:string;
    serie:string;
    limitediasbloqueiocliente:string;
    percentlimiteprecovenda:string;
    limitediasentrega:string;
}

const schema = yup.object().shape({
    name:yup.string().required("Nome é obrigatorio !"),
    serie:yup.number().typeError("Informe um valor númerico").positive("o valor não pode ser negativo").required("o valor é obrigatório"),
    limitediasbloqueiocliente:yup.number().typeError("Informe um valor númerico").positive("o valor não pode ser negativo").required("o valor é obrigatório"),
    percentlimiteprecovenda:yup.number().typeError("Informe um valor númerico").positive("o valor não pode ser negativo").required("o valor é obrigatório"),
    limitediasentrega:yup.number().typeError("Informe um valor númerico").positive("o valor não pode ser negativo").required("o valor é obrigatório"),
});

export function Config(){
    
    const [SelectedDateTime,setSelectedDateTime] = useState(new Date());     
    const [showDatePicker,serShowDatePicker] = useState(Platform.OS == 'ios');

    type NavigationProps = {
        navigate:(screen:string) => void;
     }

    const navigator = useNavigation<NavigationProps>();

    const [pecas,setPecas] = useState({
        key:'selecione',
        name:'Selecione pecas',
    });

    const [desconto,setDesconto] = useState({
        key:'selecione',
        name:'Selecione Desconto',
    });

    const [tabpreco,setTabpreco] = useState({
        key:'selecione',
        name:'Selecione Tabela Preço',
    });

    const [importacliente,setImportacliente] = useState({
        key:'selecione',
        name:'Selecione Importa cliente',
    });

    const [precomenor,setPrecomenor] = useState({
        key:'selecione',
        name:'Selecione Preço menor',
    });

    const [limitecliente,setLimitecliente] = useState({
        key:'selecione',
        name:'Selecione Limite Cliente',
    });

    const [bloqueioqtd,setBloqueioqtd] = useState({
        key:'selecione',
        name:'Selecione Bloquear QTD',
    });


    const [PecasModalOpen,setPecasModalOpen] = useState(false);
    const [DescontoModalOpen,setDescontoModalOpen] = useState(false);
    const [TabPrecoModalOpen,setTabPrecoModalOpen] = useState(false);
    const [impclienteModalOpen,setImpclienteModalOpen] = useState(false);
    const [precomenorModalOpen,setPrecomenorModalOpen] = useState(false);
    const [limiteclienteModalOpen,setLimiteclienteModalOpen] = useState(false);
    const [bloqueioqtdModalOpen,setBloqueioqtdModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState:{ errors }
    } = useForm({
        resolver: yupResolver(schema)
    });


    function handlerOpenBox(box:'pecas'|'desconto'|'preco'|'cliente'|'precomenor'|'limitecliente'|'bloqueioqtd'){
        if(box === 'pecas'){
            setPecasModalOpen(true);
        }else if(box === 'desconto'){
            setDescontoModalOpen(true);
        }else if(box === 'preco'){
            setTabPrecoModalOpen(true);
        }else if(box === 'cliente'){
            setImpclienteModalOpen(true);
        }else if(box === 'precomenor'){
            setPrecomenorModalOpen(true);
        }else if(box === 'limitecliente'){
            setLimiteclienteModalOpen(true);
        }else if(box === 'bloqueioqtd'){
            setBloqueioqtdModalOpen(true);
        }

    }

    function handlerCloseBox(box:'pecas'|'desconto'|'preco'|'cliente'|'precomenor'|'limitecliente'|'bloqueioqtd'){
        if(box === 'pecas'){
            setPecasModalOpen(false);
        }else if(box === 'desconto'){
            setDescontoModalOpen(false);
        }else if(box === 'preco'){
            setTabPrecoModalOpen(false);
        }else if(box === 'cliente'){
            setImpclienteModalOpen(false);
        }else if(box === 'precomenor'){
            setPrecomenorModalOpen(false);
        }else if(box === 'limitecliente'){
            setLimiteclienteModalOpen(false);
        }else if(box === 'bloqueioqtd'){
            setBloqueioqtdModalOpen(false);
        }
    }


    async function hendleConfiguracao(form: FormData){

        if(desconto.key === 'selecione'){
            return  Alert.alert("Selecione se vai aparecer o desconto nos pedidos");
        }

        if(pecas.key === 'selecione'){
            return  Alert.alert("Selecione se vai aparecer as peças");
        }

        if(tabpreco.key === 'selecione'){
            return  Alert.alert("Selecione se vai aparecer tabela de preço");
        }

        if(importacliente.key === 'selecione'){
            return  Alert.alert("Selecione se vai importar todos od clientes ou somente o do vendedor!");
        }

        if(precomenor.key === 'selecione'){
            return  Alert.alert("Selecione se vai validar preço a menor!");
        }

        if(limitecliente.key === 'selecione'){
            return  Alert.alert("Selecione se vai validar limiete do cliente!");
        }

        if(bloqueioqtd.key === 'selecione'){
            return  Alert.alert("Selecione se vai ocultar as quantidades no pedido!");
        }

        
        const newConfiguracao ={
            name:form.name,
            serie:form.serie,
            desconto:desconto.key,
            pecas:pecas.key,
            tabpreco:tabpreco.key,
            percentlimiteprecovenda: form.percentlimiteprecovenda,
            limitediasbloqueiocliente:form.limitediasbloqueiocliente,
            limitediasentrega:form.limitediasentrega,
            importacliente:importacliente.key,
            precomenor:precomenor.key,
            limitecliente:limitecliente.key,
            bloqueioqtd:bloqueioqtd.key,
            limitehorapedido:SelectedDateTime

        }
        
        try {
            
            const dataKey = '@prodapedido:config';
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted =[ 
                ...currentData,
                newConfiguracao                
            ];
            
            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));

            Alert.alert("Configurado com sucesso!");

            navigator.navigate('Ínicio');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar!");
        }
        
    }

    function handlerChangeTime(event:Event,dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            serShowDatePicker(oldState => !oldState);
        }

        if(dateTime)
            setSelectedDateTime(dateTime);            
            
    }

    function hendlerOpenDatetimPickerForAndroid(){
        serShowDatePicker(oldState => !oldState);
    }

    useFocusEffect(useCallback(()=>{
        async function loadData(){
            const dataKey = '@prodapedido:config';
            const response = await AsyncStorage.getItem(dataKey);            
            const data = response ? JSON.parse(response) : [];
               
            if(!data){
                const pecas     = opcoes.find((element:DataListProps) => element.key === data[0].pecas);
                const desconto  = opcoes.find((element:DataListProps) => element.key === data[0].desconto);
                const tabpreco  = opcoes.find((element:DataListProps) => element.key === data[0].tabpreco);
                const importcli = impliente.find((element:DataListProps) => element.key === data[0].importacliente);
                const precomenor= opcoes.find((element:DataListProps) => element.key === data[0].precomenor);
                const limitecli = opcoes.find((element:DataListProps) => element.key === data[0].limitecliente);
                const bloqueioqtd = opcoes.find((element:DataListProps) => element.key === data[0].bloqueioqtd);
                const datalimite = new Date(data[0].limitehorapedido);

                setValue('name',`${data[0].name}`);
                setValue('serie',`${data[0].serie}`);
                setValue('percentlimiteprecovenda',`${data[0].percentlimiteprecovenda}`);
                setValue('limitediasbloqueiocliente',`${data[0].limitediasbloqueiocliente}`);
                setValue('limitediasentrega',`${data[0].limitediasentrega}`);

                setPecas(pecas!);
                setDesconto(desconto!);
                setTabpreco(tabpreco!);
                setImportacliente(importcli!);
                setPrecomenor(precomenor!);
                setLimitecliente(limitecli!);
                setBloqueioqtd(bloqueioqtd!);
                setSelectedDateTime(datalimite);
            }
         }

         async function removeAll(){
            const dataKey = '@prodapedido:config';
            await AsyncStorage.removeItem(dataKey);            
        }

         loadData();
         //removeAll();

    },[]));

    return(
        <Container>
            <Header>
                <Title>Configuração</Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{                    
                    paddingBottom:useBottomTabBarHeight()
                }}
            >
                <Form>
                    <Fields>

                        <InputForm
                            name="name"
                            control={control}                                                                   
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="serie"
                            control={control}                                                                   
                            placeholder="Serie"
                            keyboardType="numeric"
                            error={errors.serie && errors.serie.message}
                        />

                        <SelectButton title={pecas.name} onPress={()=>handlerOpenBox('pecas')}/>
                        <SelectButton title={desconto.name} onPress={()=>handlerOpenBox('desconto')}/>
                        <SelectButton title={tabpreco.name} onPress={()=>handlerOpenBox('preco')}/>

                        <InputForm
                            name="limitediasbloqueiocliente"
                            control={control}                                                                   
                            placeholder="Limite de dias para Bloqueio Cliente"
                            keyboardType="numeric"
                            error={errors.limitediasbloqueiocliente && errors.limitediasbloqueiocliente.message}
                        />
                        
                        <SelectButton title={importacliente.name} onPress={()=>handlerOpenBox('cliente')}/>
                        <SelectButton title={precomenor.name} onPress={()=>handlerOpenBox('precomenor')}/>
                        <SelectButton title={limitecliente.name} onPress={()=>handlerOpenBox('limitecliente')}/>

                        <InputForm
                            name="percentlimiteprecovenda"
                            control={control}                                                                   
                            placeholder="Percentual Limite Maximo Preço Venda"
                            keyboardType="numeric"
                            error={errors.percentlimiteprecovenda && errors.percentlimiteprecovenda.message}
                        />

                        <InputForm
                            name="limitediasentrega"
                            control={control}                                                                   
                            placeholder="Limite Dias Entrega"
                            keyboardType="numeric"
                            error={errors.limitediasentrega && errors.limitediasentrega.message}
                        />
                            
                        <SelectButton title={bloqueioqtd.name} onPress={()=>handlerOpenBox('bloqueioqtd')}/>    

                        {showDatePicker && (<DateTimePicker 
                            value={SelectedDateTime}
                            mode='time'
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}                            
                            onChange={handlerChangeTime}
                           
                        />)}
                        {
                                Platform.OS === 'android' && (
                                <ButtonDate onPress={hendlerOpenDatetimPickerForAndroid}>
                                    <DateIcon name="calendar"/>
                                    <DateTitle>                                
                                        {`${format(SelectedDateTime,'H:mm')}`}
                                    </DateTitle>
                                </ButtonDate>

                            )
                        }
                    </Fields>
                    <Button onPress={handleSubmit(hendleConfiguracao)} title="Enviar" />
                </Form>
            </Content>

           

            <Modal visible={PecasModalOpen}>
                <BoxSelected
                    boxyesnot={pecas}
                    setBoxYesNot={setPecas}
                    closeSelectdBox={()=>handlerCloseBox('pecas')}
                    title="Peças"
                    typeopt="1"                    
                />
            </Modal>

            <Modal visible={DescontoModalOpen}>
                <BoxSelected
                    boxyesnot={desconto}
                    setBoxYesNot={setDesconto}
                    closeSelectdBox={()=>handlerCloseBox('desconto')}
                    title="Desconto"
                    typeopt="1"
                />
            </Modal>

            <Modal visible={TabPrecoModalOpen}>
                <BoxSelected
                    boxyesnot={tabpreco}
                    setBoxYesNot={setTabpreco}
                    closeSelectdBox={()=>handlerCloseBox('preco')}
                    title="Tabela de preço"
                    typeopt="1"
                />
            </Modal>


            <Modal visible={impclienteModalOpen}>
                <BoxSelected
                    boxyesnot={importacliente}
                    setBoxYesNot={setImportacliente}
                    closeSelectdBox={()=>handlerCloseBox('cliente')}
                    title="Importa Clientes"
                    typeopt="2"
                />
            </Modal>

            <Modal visible={precomenorModalOpen}>
                <BoxSelected
                    boxyesnot={precomenor}
                    setBoxYesNot={setPrecomenor}
                    closeSelectdBox={()=>handlerCloseBox('precomenor')}
                    title="Valida Preço Menor"
                    typeopt="1"
                />
            </Modal>

            <Modal visible={limiteclienteModalOpen}>
                <BoxSelected
                    boxyesnot={limitecliente}
                    setBoxYesNot={setLimitecliente}
                    closeSelectdBox={()=>handlerCloseBox('limitecliente')}
                    title="Valida Limite Cliente"
                    typeopt="1"
                    
                />
            </Modal>

            <Modal visible={bloqueioqtdModalOpen}>
                <BoxSelected
                    boxyesnot={bloqueioqtd}
                    setBoxYesNot={setBloqueioqtd}
                    closeSelectdBox={()=>handlerCloseBox('bloqueioqtd')}
                    title="Bloquear QTD"
                    typeopt="1"
                />
            </Modal>

        </Container>
    );
}