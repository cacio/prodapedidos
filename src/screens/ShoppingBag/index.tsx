import React,{useEffect,useState,useCallback} from 'react'; 
import { useFocusEffect } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacityProps} from 'react-native';
import { ClienteDTO } from '../../dtos/ClienteDTO';
import { CarrinhoDTO as CarrinhoProps } from '../../dtos/CarrinhoDTO';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';
import { useAuth } from '../../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Load } from '../../components/Load';
import {
 Container,
 Title,
 Header,
 Content,
 ItemCarrinho,
 ProdutoWrapper,
 Nome,
 DetailsItem,
 Peso,
 PesoMedio,
 TotalItem,
 Quantidade,
 Price,
 Subtotal,
 QuantidadeWrapper,
 Footer,
 TotalItens,
 TotalPrice,
 ContentFooter,
 ButtonContent,
 IconRemove,
 Icone
} from './styles';
import { Button } from '../../components/Form/Button';
import { api } from '../../services/api';
import { ProdutoDTO } from '../../dtos/ProdutoDTO';
import { CarrinhoEmpty } from '../../components/CarrinhoEmpty';
import { database } from '../../databases';
import { Q } from '@nozbe/watermelondb';


interface Props extends TouchableOpacityProps{
    cli:modelClientes;
    tipo:string;
    idped?:string;    
}


export function ShoppingBag({cli,tipo,idped}:Props) {
    const {user}                 = useAuth();
    const [loading,setLoading]   = useState(true); 
    const [total,setTotal]       = useState('0'); 
    const [product,setProduct] = useState<ProdutoDTO[]>([]); 
    const [carrinho,setCarrinho] = useState<CarrinhoProps[]>([]);
    const dataKey                = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;        
     }

    const navigator = useNavigation<NavigationProps>();

    async function EditaProdutoCarrinho(cod:string,iditem:string) {

        try {

            const colectionProdutos = database.get<modelProdutos>('produtos');
            const dataproduto = await colectionProdutos.query(
                Q.where('id',cod)
            ).fetch();

            const data = {
                cli:cli,
                product:dataproduto[0],
                iditem
            }

            navigator.navigate('DetailsProduct',data);
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

       
    }
    async function getShoppingBag() {
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];
        
        const expansiveTotal = currentData.reduce((acumullator:number,expensive:CarrinhoProps)=>{                              
            return acumullator + Number(expensive.subtotal.replace(/[^0-9,]*/g, '').replace(',', '.'));
       },0);

      
        setCarrinho(currentData);  
        setLoading(false);  
        setTotal(parseFloat(String(expansiveTotal)).toLocaleString('pt-br',
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }


    async function removeProductCarrinho(cod:string) {
        try {
            
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
           
            const expensive = currentData.filter((expensive:CarrinhoProps)=>
                expensive.id !== cod
            );

            
            const currentData2 = expensive ? expensive : currentData;
            

            const dataFormatted =[ 
                ...currentData2                              
            ];
            
            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));
            
            getShoppingBag();
            
        } catch (error) {
            console.log(error);
        }
    }

    function RedirectCheckout(){
        const data = {
            cli:cli,
            tipo:tipo,
            idped:idped         
        }
        navigator.navigate('checkout',data);
    }

   useEffect(()=>{
        getShoppingBag();
   },[]);


   useFocusEffect(useCallback(()=>{
        getShoppingBag();
    },[carrinho.length]));

 return( 
  
   <Container>
       
            <Header>
                <Title>Carrinho</Title>
            </Header>
            {loading 
                ?<Load/> 
                :carrinho.map((item:CarrinhoProps) =>{
                            //console.log(item.id);
                            return <Content key={item.id}>
                                <ItemCarrinho onPress={()=>EditaProdutoCarrinho(String(item.codprod),item.id)}>
                                    <ProdutoWrapper>
                                        <Nome>{item.nomeprod} ({item.unidade})</Nome>
                                        <DetailsItem>
                                            <Peso>Peso: {item.peso} {item.unidade}</Peso>
                                            <PesoMedio>Media KG: {item.peso_medio}</PesoMedio>
                                            <Price>Preço: {parseFloat(String(item.preco)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Price>
                                        </DetailsItem>
                                    </ProdutoWrapper>                
                                    <TotalItem>
                                        <QuantidadeWrapper>
                                            <Quantidade>{item.quantidade}</Quantidade>
                                        </QuantidadeWrapper>
                                        <Subtotal>R$ {item.subtotal}</Subtotal>
                                    </TotalItem>                               
                                </ItemCarrinho> 
                                <IconRemove onPress={()=>removeProductCarrinho(String(item.id))}>
                                        <Icone name="x-circle" />
                                </IconRemove>          
                            </Content>
                    })            
            }
            
            {carrinho.length > 0 ?
             <Footer>
                <ContentFooter>
                    <TotalItens>Total Itens:</TotalItens>
                    <TotalPrice>{carrinho.length}</TotalPrice>
                </ContentFooter> 
                <ContentFooter>
                    <TotalItens>Sub Total:</TotalItens>
                    <TotalPrice>R$ {total}</TotalPrice>
                </ContentFooter>              
            </Footer>
            : null
            }

            {
                carrinho.length === 0 ?
                <CarrinhoEmpty/> : null
            }

            {carrinho.length > 0 &&
            <ButtonContent>
                <Button onPress={()=>RedirectCheckout()} title={tipo === 'alterar' ? 'FINALIZAR ALTERAÇÃO':'FINALIZAR'} />
            </ButtonContent>
            }
            
   </Container>
    
  );
}