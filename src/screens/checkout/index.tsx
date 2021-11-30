import React,{useState,useEffect} from 'react'; 
import { Platform } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {format } from 'date-fns';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { InputForm } from '../../components/Form/inputForm';
import {
 Container,
 Header,
 DadosCliente,
 ContentImage,
 ImagemCli,
 DetailWrapper,
 TitloCli,
 Nomecli,
 EnderecoCli,
 Content,
 DataEntrega,
 IconContainer,
 IconeData,
 Title,
 LabelName,
 FormaPagamento,
 IconPagament,
 DetailsFormaPagamento,
 Prazos,
 TitleForma,
 IconContainerForma,
 ContentCarrinho,
 TitleCarrinho,
 DetailsCarrinho,
 Footer,
 TotalItens,
 TotalPrice,
 ContentFooter,
 Observacao
} from './styles';

import { ClienteDTO } from '../../dtos/ClienteDTO';
import { ItensCarrinho } from '../../components/ItensCarrinho';
import { useAuth } from '../../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Form/Button';

interface ParansData{
    cli:ClienteDTO;
}

interface CarrinhoProps{
    tipo: String;
    quantidade:String;
    codprod:String;
    nomeprod:String;
    preco:String;
    peso: string;
    subtotal:string;
    unidade:String;
    peso_medio:String;
}

export function checkout() {
const {user}                                         = useAuth();
const [SelectedDateTime,setSelectedDateTime]         = useState(new Date());     
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [total,setTotal]                               = useState('0');
const [obs,setObs] = useState('');

const route  = useRoute();
const {cli}   = route.params as ParansData;

const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState:{ errors }
} = useForm();

function hendlerOpenDatetimPickerForAndroid(){    
    setDatePickerVisibility(oldState => !oldState);
}

function hideDatePicker(){
    setDatePickerVisibility(false);
}

function handleConfirm(dateTime:Date | undefined) {
    if(Platform.OS === 'android'){
        setDatePickerVisibility(oldState => !oldState);
    }

    if(dateTime)
        setSelectedDateTime(dateTime);            
    
    hideDatePicker();
};


async function TotaisShopping(){
    const dataKey                = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];

    const expansiveTotal = currentData.reduce((acumullator:number,expensive:CarrinhoProps)=>{                              
        return acumullator + Number(expensive.subtotal.replace(/[^0-9,]*/g, '').replace(',', '.'));
   },0);

          
    setTotal(parseFloat(String(expansiveTotal)).toLocaleString('pt-br',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

}

useEffect(()=>{
    TotaisShopping();
},[])


 return(
   <Container>
       <Header>
           <DadosCliente>
               <ContentImage>
                   <ImagemCli source={{uri:cli.foto == '' ? `https://ui-avatars.com/api/?name=${cli.NOME}&length=1`:cli.foto}} />
               </ContentImage>
               <DetailWrapper>
                    <TitloCli>Entregar em:</TitloCli>
                   <Nomecli>{cli.NOME}{'\n'}({cli.FANTASIA})</Nomecli>
                   <EnderecoCli>{cli.ENDERECO}</EnderecoCli>
               </DetailWrapper>
           </DadosCliente>
       </Header>

       <Content
        showsVerticalScrollIndicator={false}     
        contentContainerStyle={{          
            paddingBottom:60
        }}   
       >

            <LabelName>Data Entrega:</LabelName>
            <DataEntrega onPress={hendlerOpenDatetimPickerForAndroid}>
                <IconContainer>
                    <IconeData name="calendar"/>
                </IconContainer>
                <Title>{`${format(SelectedDateTime,'dd/MM/Y')}`}</Title>
            </DataEntrega>

            <LabelName>Forma Pagamento:</LabelName>    
            <FormaPagamento>
                <IconContainerForma>
                    <IconPagament name="payment" />
                </IconContainerForma>    
                <DetailsFormaPagamento>
                    <TitleForma>{cli.COND_PAG}</TitleForma>
                    <Prazos>Prazos: {cli.PRAZO1}/{cli.PRAZO2}/{cli.PRAZO3}/{cli.PRAZO4}/{cli.PRAZO5}</Prazos>
                </DetailsFormaPagamento>    
            </FormaPagamento>
            
            <ContentCarrinho>
                <TitleCarrinho>ITENS DO CARRINHO</TitleCarrinho>
                <DetailsCarrinho
                    showsVerticalScrollIndicator={true}               
                >
                    <ItensCarrinho cli={cli} />
                </DetailsCarrinho>
            </ContentCarrinho>

            <LabelName>Obs:</LabelName>
           
            <InputForm
                    name="obs"
                    control={control} 
                    multiline={true}    
                    numberOfLines={5}                                                              
                    placeholder="obs"
                    autoCapitalize="sentences"
                    autoCorrect={false}   
                    error={errors.obs && errors.obs.message}                         
                />

            <Footer>                
                <ContentFooter>
                    <TotalItens>Total:</TotalItens>
                    <TotalPrice>R$ {total}</TotalPrice>
                </ContentFooter>              
            </Footer>

            <Button title="FAZER PEDIDO" onPress={()=>{}} />
       </Content> 
       
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={SelectedDateTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      
   </Container>
  );
}