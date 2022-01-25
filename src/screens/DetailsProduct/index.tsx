import React,{useState,useRef,useEffect} from 'react'; 
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
 FooterContent,
 ContentObs,
 TitleObs,
 InputObs 
} from './styles';
import { CarrinhoDTO as CarrinhoData } from '../../dtos/CarrinhoDTO';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';
import { Clientes as modelClientes } from '../../databases/model/Clientes';

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
interface ParansData{
    cli:modelClientes;
    product:modelProdutos;
}

export function DetailsProduct() {

    const {user}        = useAuth();

    const route         = useRoute();
    const {product,cli} = route.params as ParansData; 
    
    const dataKey       = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;

    const [quantidade,setQuantidade] = useState('1');
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
              codigo:product.codigo,
              nomeprod:product.decricao,
              preco:preco,
              peso: peso,
              subtotal:subtotal,
              unidade:product.unidade,
              peso_medio:product.peso_medio,
              obs:obs   
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
                    const totalFormatted = parseFloat(String(total)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    setPeso(qtd);
                    setSubtotal(totalFormatted);

                 }   
            }else if(tipoqtd.key === '2'){
                if(Number(text) >0){
                    const qtd   = Number(text);
                    const priceFormatted = String(preco).replace(",", ".");
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
                setObs(dataProd[0].obs)
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