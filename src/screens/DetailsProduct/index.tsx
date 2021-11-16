import React,{useState,useRef,useEffect,useCallback} from 'react'; 
import { useRoute,useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { opcoestipoquantidade } from '../../Utils/tipoquantidade';
import {OptionsFilter} from '../../screens/TipoQuantidade';
import { SelectButton } from '../../components/Form/SelectButton';
import { InputForm } from '../../components/Form/inputForm';
import { Button } from '../../components/Form/Button';

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
 FooterContent 
} from './styles';
import { ClienteDTO } from '../../dtos/ClienteDTO';
import { ProdutoDTO } from '../../dtos/ProdutoDTO';
import { RFValue } from 'react-native-responsive-fontsize';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import { useAuth } from '../../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object().shape({      
    qtd:yup.number().typeError("Informe um valor númerico").positive("o valor não pode ser negativo"),
    price:yup.number().typeError("Informe um valor númerico").positive("o valor não pode ser negativo")
});

interface DataListProps{
    key?:string,
    name?:string;
}

interface CarrinhoData{
    tipo: string;
    quantidade:string;
    codprod:string;
    nomeprod:string;
    preco:string;
    peso: string;
    subtotal:string;
}

interface ParansData{
    cli:ClienteDTO;
    product:ProdutoDTO;
}

export function DetailsProduct() {

    const {user}        = useAuth();

    const route         = useRoute();
    const {product,cli} = route.params as ParansData; 
    const dataKey       = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;

    const [quantidade,setQuantidade] = useState('1');
    const [preco,setPreco]           = useState(String(product.preco_venda));
    const [peso,setPeso]             = useState(0);
    const [subtotal,setSubtotal]     = useState('0');
    const [tipoqtd,setTipoqtd] = useState({
        key:'1',
        name:'PESO (kg)',
    });

    const modalizeRef      = useRef<Modalize>(null);

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;        
     }

    const navigator = useNavigation<NavigationProps>();
    const nav       = useNavigation();
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

    async function hendleAdicionaCarrinho(){
        
        const newProdutoCarrinho = {
              tipo: tipoqtd.key,
              quantidade:quantidade,
              codprod:product.id,
              nomeprod:product.descricao,
              preco:preco,
              peso: peso,
              subtotal:subtotal

        }

        try {
            
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
           
            const expensive = currentData.filter((expensive:CarrinhoData)=>
                expensive.codprod !== product.id
            );

            
            const currentData2 = expensive ? expensive : currentData;
            

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
               
                 if(Number(text) >0){

                    const qtd   = Number(text);
                    const priceFormatted = String(preco).replace(",", ".");
                    const price = Number(priceFormatted);  
                    
                    const total = (price * qtd);                    
                    const totalFormatted = convertToReal(total);
                    setPeso(qtd);
                    setSubtotal(totalFormatted);

                 }   
            }else if(tipoqtd.key === '2'){
                if(Number(text) >0){
                    const qtd   = Number(text);
                    const priceFormatted = String(preco).replace(",", ".");
                    const price = Number(priceFormatted);  
                    
                    const total = (qtd * product.peso_medio) * price;     
                    const qtdpc = (qtd * product.peso_medio);               
                    const totalFormatted = convertToReal(total);
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
                   const totalFormatted = convertToReal(total);
                   setPeso(qtd);
                   setSubtotal(totalFormatted);

                }   
           }else if(tipoqtd.key === '2'){
            if(Number(String(text).replace(",", ".")) >0){
                console.log(text);
                const qtd   = Number(quantidade);
                const priceFormatted = String(text).replace(",", ".");
                const price = Number(priceFormatted);  
                
                const total = (qtd * product.peso_medio) * price;     
                const qtdpc = (qtd * product.peso_medio);               
                const totalFormatted = convertToReal(total);
                setPeso(qtdpc);
                setSubtotal(totalFormatted);
            }
        }

        }
    }


    function convertToReal(number:Number, options = {moneySign:true}) {
        const { moneySign = true } = options;
    
        if(Number.isNaN(number) || !number) return "need a number as the first parameter";
    
        if(typeof number === "string") { // n1
            number = Number(number);
        }
    
        let res;
    
        const config = moneySign ? {style: 'currency', currency: 'BRL'} : {minimumFractionDigits: 2};
    
        moneySign
        ? res = number.toLocaleString('pt-BR', config)
        : res = number.toLocaleString('pt-BR', config)
    
        //const needComma = number => number <= 1000;
        //if(needComma(number)) {
            res = res.toString().replace(".", ",");
        //}
    
        return res; // n2
    }

    useEffect(()=>{
        async function getAlterProductCarrinho() {
            
            const response = await AsyncStorage.getItem(dataKey);            
            const data     = response ? JSON.parse(response) : [];
            
           const expensive =  JSON.stringify(data.filter((expensive:CarrinhoData)=>
                expensive.codprod === product.id
            ));

            const dataProd  = JSON.parse(expensive);
            
            if(dataProd.length > 0){
                
                const tipos     = opcoestipoquantidade.find((element:DataListProps) => element.key === dataProd[0].tipo);
                
                setTipoqtd(tipos!);
                setQuantidade(dataProd[0].quantidade);
                setPreco(dataProd[0].preco);
                setPeso(dataProd[0].peso);
                setSubtotal(dataProd[0].subtotal);
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
               const totalFormatted = convertToReal(total);
               setPeso(qtd);
               setSubtotal(totalFormatted);

           
       }else if(tipoqtd.key === '2'){
           
               const qtd   = Number(quantidade);
               const priceFormatted = String(preco).replace(",", ".");
               const price = Number(priceFormatted);  
               
               const total = (qtd * product.peso_medio) * price;     
               const qtdpc = (qtd * product.peso_medio);               
               const totalFormatted = convertToReal(total);
               setPeso(qtdpc);
               setSubtotal(totalFormatted);
           
       }
    },[tipoqtd]);
 return(
   <Container>
        <Header>
            <Title>
                Detalhe Produto
            </Title>
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
                         onChangeText={setQuantidade}
                         defaultValue={String(quantidade)}
                         error={errors.qtd && errors.qtd.message}
                    />
                </ContentQuantidade>    
            </HeaderOpcoes>

            <DetailsProducts>
                <ContentProduct>
                    <Nome>{product.descricao}</Nome>
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
                            onChangeText={setPreco}
                            defaultValue={String(preco)}                            
                            style={{width:RFValue(108), marginStart:2,marginTop:8, padding:0,backgroundColor:"#f1f1f1",fontSize:RFValue(18)}}
                            error={errors.price && errors.price.message}
                        />  
                    </ContentInputPrice>
                </ContentProduct>
                <Details>
                    <Estoque>Estoque: {product.estoque_atual} Kg</Estoque>
                    <Pc>{product.pecas_estoque} PC</Pc>
                    <PesoMedio>KG Médio: {product.peso_medio}</PesoMedio>
                </Details>
                
            </DetailsProducts>
            <Footer>
                <TotalItens>Peso item: {peso} kg</TotalItens>
                <TotalPrice>{subtotal}</TotalPrice>
            </Footer>   
            
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