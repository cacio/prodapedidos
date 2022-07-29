import React,{useState,useRef,useEffect} from 'react'; 
import { useRoute,useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { v4 as uuidv4 } from 'uuid';

import { opcoestipoquantidade } from '../../Utils/tipoquantidade';
import {OptionsFilter} from '../../screens/TipoQuantidade';
import { SelectButton } from '../../components/Form/SelectButton';
import { InputForm } from '../../components/Form/inputForm';
import { Button } from '../../components/Form/Button';
import { useTheme } from 'styled-components';

import {
 Container,
 Header,
 Title,
 Content,
 HeaderOpcoes,
 ContentSelected,
 ContentQuantidade,
 Label,
 DetailsProducts,
 ContentProduct,
 Nome,
 Unidade,
 ContentInputPrice,
 Details,
 Estoque,
 Pc,
 PesoMedio,
 Footer,
 TotalItens,
 TotalPrice,
 LabelPrice,
 FooterContent,
 ContentObs,
 TitleObs,
 InputObs,
 HeaderNavegation 
} from './styles';
import { CarrinhoDTO as CarrinhoData } from '../../dtos/CarrinhoDTO';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';
import { Clientes as modelClientes } from '../../databases/model/Clientes';

import { RFValue } from 'react-native-responsive-fontsize';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import { useAuth } from '../../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackButton } from '../../components/BackButton';



interface DataListProps{
    key?:string,
    name?:string;
}
interface ParansData{
    cli:modelClientes;
    product:modelProdutos;
    iditem:string;
}
interface FormData {
    qtd:number;
    price:number;  
}

const schema = yup.object().shape({      
    qtd:yup.number().transform((_, value) => {
        if (value.includes('.')) {
          return null;
        }
        return +value.replace(/,/, '.');
      }).typeError("Informe um valor númerico").positive("o valor não pode ser negativo").required("Quantidade é obrigatório"),
    price:yup.number().transform((_, value) => {
        if (value.includes('.')) {
          return null;
        }
        return +value.replace(/,/, '.');
      }).typeError("Informe um valor númerico").positive("o valor não pode ser negativo").required('Valor é obrigatório')
});

export function DetailsProduct() {

    const {user}        = useAuth();

    const route         = useRoute();
    const {product,cli,iditem} = route.params as ParansData; 
    
    const dataKey       = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;

    const [quantidade,setQuantidade] = useState(1);
    const [preco,setPreco]           = useState(parseFloat(product.preco_venda).toLocaleString('pt-br',
                                                { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    const [peso,setPeso]             = useState(0);
    const [subtotal,setSubtotal]     = useState('0');
    const [tipoqtd,setTipoqtd]       = useState({
        key:'1',
        name:'PESO (kg)',
    });

    const [obs,setObs]                = useState('');

    const modalizeRef      = useRef<Modalize>(null);
    const theme            = useTheme();
    type NavigationProps = {
        navigate:(screen:string,{}?) => void;        
     }

    const navigator = useNavigation<NavigationProps>();
    const nav       = useNavigation();

    function handleNack(){
        nav.goBack();
      }

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState:{ errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handlerOpenFilterModalize(){
        modalizeRef.current?.open();
    }

    function handlerCloseFilterModalize(){
        modalizeRef.current?.close();
    }

    async function hendleAdicionaCarrinho(form: FormData){
        
        const newProdutoCarrinho = {
              id:uuidv4(),  
              tipo: tipoqtd.key,
              quantidade:form.qtd,
              codprod:product.id,
              codigo:product.codigo,
              nomeprod:product.decricao,
              preco:form.price,
              peso: peso,
              subtotal:subtotal,
              unidade:product.unidade,
              peso_medio:product.peso_medio,
              obs:obs   
        }

        try {
            
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            let expensive = [];
            if(iditem){
                console.log('aqui1');
                 expensive = currentData.filter((expensive:CarrinhoData)=>            
                    expensive.id !== iditem && (expensive.codprod !== product.id || expensive.preco !== String(form.price))
                );
            }else{
                console.log('aqui');
                 expensive = currentData.filter((expensive:CarrinhoData)=>                            
                    (expensive.codprod !== product.id || String(expensive.preco) !== String(form.price))
                );
            }
            

            
            const currentData2 = expensive ? expensive : currentData;
            //console.log(currentData2);

            const dataFormatted =[ 
                ...currentData2,
                newProdutoCarrinho                
            ];
            
            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));

            Alert.alert("Adicionado com sucesso!");
            
            nav.goBack();
            
        } catch (error) {
            console.log(error);
        }
    }

    async function handlerSoma(text:string,tipo:'qtd'|'price'){
        
        if(tipo === 'qtd'){
            
            if(tipoqtd.key === '1'){
               
                 if(Number(String(text).replace(",", ".")) >0){

                    const qtd   = Number(String(text).replace(",", "."));
                    const priceFormatted = String(preco).replace(",", ".");
                    const price = Number(priceFormatted);  
                    
                    const total = (price * qtd);                    
                    const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    setPeso(qtd);
                    setSubtotal(totalFormatted);

                 }   
            }else if(tipoqtd.key === '2'){
                if(Number(String(text).replace(",", ".")) >0){
                    const qtd   = Number(String(text).replace(",", "."));
                    const priceFormatted = String(preco).replace(",", ".")
                    const price = Number(priceFormatted);  
                    
                    const total = (qtd * Number(product.peso_medio)) * price;     
                    const qtdpc = (qtd * Number(product.peso_medio));               
                    const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    setPeso(qtdpc);
                    setSubtotal(totalFormatted);
                }
            }

        }else if(tipo === 'price'){
           
            if(tipoqtd.key === '1'){
               
                if(Number(String(text).replace(",", ".")) >0){

                   const qtd   = Number(quantidade);
                   const priceFormatted = String(text).replace(",", ".");
                   const price = Number(priceFormatted);  
                   
                   const total = (price * qtd);                    
                   const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
                   { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                   setPeso(qtd);
                   setSubtotal(totalFormatted);

                }   
           }else if(tipoqtd.key === '2'){
            if(Number(String(text).replace(",", ".")) >0){
                console.log(text);
                const qtd   = Number(quantidade);
                const priceFormatted = String(text).replace(",", ".");
                const price = Number(priceFormatted);  
                
                const total = (qtd * Number(product.peso_medio)) * price;     
                const qtdpc = (qtd * Number(product.peso_medio));               
                const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
                { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                setPeso(qtdpc);
                setSubtotal(totalFormatted);
            }
        }

        }
    }


    useEffect(()=>{
        async function getAlterProductCarrinho() {
            
            const response = await AsyncStorage.getItem(dataKey);            
            const data     = response ? JSON.parse(response) : [];
            
           const expensive =  JSON.stringify(data.filter((expensive:CarrinhoData)=>
                expensive.id === iditem
            ));

            const dataProd  = JSON.parse(expensive);
            
            if(dataProd.length > 0){
                
                const tipos     = opcoestipoquantidade.find((element:DataListProps) => element.key === dataProd[0].tipo);
                
                setTipoqtd(tipos!);
                setQuantidade(dataProd[0].quantidade);
                setValue('qtd',`${dataProd[0].quantidade}`);
                setPreco(dataProd[0].preco);
                setValue('price',`${parseFloat(dataProd[0].preco).toLocaleString('pt-br',
                { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                setPeso(dataProd[0].peso);
                setSubtotal(dataProd[0].subtotal);
                setObs(dataProd[0].obs)
            }else{
                setValue('qtd','1');
                setValue('price',`${parseFloat(product.preco_venda).toLocaleString('pt-br',
                { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                
            }
        }
        
        async function removeAll(){            
            await AsyncStorage.removeItem(dataKey);            
        }
        
        getAlterProductCarrinho();
       
    },[]);
    useEffect(()=>{
        
        if(tipoqtd.key === '1'){
               
               const qtd   = Number(quantidade);
               const priceFormatted = String(preco).replace(",", ".");
               const price = Number(priceFormatted);  
               
               const total = (price * qtd);                    
               const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
               { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               setPeso(qtd);
               setSubtotal(totalFormatted);

           
       }else if(tipoqtd.key === '2'){
           
               const qtd   = Number(quantidade);
               const priceFormatted = String(preco).replace(",", ".");
               const price = Number(priceFormatted);  
               
               const total = (qtd * Number(product.peso_medio)) * price;     
               const qtdpc = (qtd * Number(product.peso_medio));               
               const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
               { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               setPeso(qtdpc);
               setSubtotal(totalFormatted);
           
       }
    },[tipoqtd]);
 return(
   <Container>
        <Header>
            <HeaderNavegation>
                <BackButton color={theme.colors.shape} onPress={handleNack} />
                <Title>
                    Detalhe Produto
                </Title>
            </HeaderNavegation>
        </Header> 

        <Content
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{                    
                 paddingBottom:getBottomSpace()
             }}
        >

            <HeaderOpcoes>
                <ContentSelected>
                    <Label>Tipo quantidade:</Label>
                    <SelectButton title={tipoqtd.name} onPress={handlerOpenFilterModalize} />
                </ContentSelected>
                <ContentQuantidade>
                    <Label>Quantidade:</Label>
                    <InputForm
                         name="qtd"
                         control={control}                                                                   
                         placeholder="Quantidade"
                         keyboardType="numeric"
                         textAlign="center"                         
                         onChange={({nativeEvent})=> handlerSoma(nativeEvent.text,'qtd')}                         
                         //onChangeText={setQuantidade}
                         //defaultValue={String(quantidade)}
                         error={errors.qtd && errors.qtd.message}
                    />
                </ContentQuantidade>    
            </HeaderOpcoes>

            <DetailsProducts>
                <ContentProduct>
                    <Nome>{product.decricao}</Nome>
                    <Unidade>({product.unidade})</Unidade>
                    <ContentInputPrice>
                        <LabelPrice>R$</LabelPrice>
                        <InputForm
                            name="price"
                            control={control}                                                                   
                            placeholder="Preço"
                            keyboardType="numeric"
                            textAlign="center"
                            onChange={({nativeEvent})=> handlerSoma(nativeEvent.text,'price')}                         
                            //onChangeText={setPreco}
                            //defaultValue={String(preco)}                            
                            style={{width:RFValue(108), marginStart:2,marginTop:8, padding:0,backgroundColor:"#f1f1f1",fontSize:RFValue(18)}}
                            error={errors.price && errors.price.message}
                        />  
                    </ContentInputPrice>
                </ContentProduct>
                <Details>
                    <Estoque>Estoque: {product.estoque_atual} Kg</Estoque>
                    <Pc>{product.pecas_estoque} PC</Pc>
                    <PesoMedio>KG Médio: {parseFloat(String(product.peso_medio)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</PesoMedio>
                </Details>
                
            </DetailsProducts>
            <Footer>
                <TotalItens>Peso item: {peso} kg</TotalItens>
                <TotalPrice>R$ {subtotal}</TotalPrice>
            </Footer>   
             
             <ContentObs>
                 <TitleObs>Observação</TitleObs>
                 <InputObs multiline={true} numberOfLines={4}  onChangeText={setObs} value={obs} />
             </ContentObs>

        </Content>     
        <FooterContent>
            <Button onPress={handleSubmit(hendleAdicionaCarrinho)} title="ADICIONAR" />
        </FooterContent>

        <Modalize ref={modalizeRef}>
            <OptionsFilter
                 boxoptions={tipoqtd}
                 setBoxOptions={setTipoqtd}
                 closeSelectdBox={handlerCloseFilterModalize}
                 title="Selecionar Tipo"
            />
        </Modalize>

   </Container>
  );
}