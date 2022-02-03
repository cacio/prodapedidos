import React,{useEffect,useState,useRef} from 'react'; 
import { LogBox } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
 Container,
 Header,
 HeaderNavegation,
 PrevHome,
 NavIcon,
 NavTitle,
 FilterForm,
 IconWrapper,
 Iconfilter,
 Field,
 ButtonTypeFilter,
 IconTypeFilter,
 Separador,
 DetailsCli,
 ImageCli,
 NomeCli,
 FantasiaCli,
 DetailWrapper,
 ProdutoList,
 MyCarButton
} from './styles';

import { InputFilter } from '../../components/Form/InputFilter';
import { ProdutoCard } from '../../components/ProdutoCard';
import { useTheme } from 'styled-components';
import { Load } from '../../components/Load';
import { ShoppingBag } from '../ShoppingBag';
import { useAuth } from '../../hooks/auth';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { database } from '../../databases';
import { Q } from '@nozbe/watermelondb';
interface Params{
    cli:modelClientes
}

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export function ProductView() {
    const perPage = 5;
    const {user}               = useAuth();
    const [loading,setLoading] = useState(true); 
    const [product,setProduct] = useState<modelProdutos[]>([]);     
    const [carrinhoLength,setCarrinhoLength] = useState([]);
    const [searchText,setSearchText] = useState('');
    const [page,setPage]             = useState(1);
    const route  = useRoute();
    
    const { cli }    = route.params as Params;
    
    const photoPadrao = `https://ui-avatars.com/api/?name=${cli.NOME}&length=1`;
    const theme = useTheme();
    const modalizeRef      = useRef<Modalize>(null);
   

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;        
     }

    const navigator = useNavigation<NavigationProps>();

    function handlerOpenCarrinho(){
        modalizeRef.current?.open();
    }
    
    function handlerDetailsProduct(product:modelProdutos){            
        const data = {
            cli:cli,
            product
        }
        navigator.navigate('DetailsProduct',data);
    }

    function handlerOpenModalize(){
        modalizeRef.current?.open();
    }

    function handlerCloseModalize(){
        modalizeRef.current?.close();
    }

    let isMouted = true;

    async function fechtProduto() {
        try {
            
            const colectionProdutos = database.get<modelProdutos>('produtos');
            const dataproduto = await colectionProdutos.query(
             /*   Q.skip(perPage),
                Q.take(page)*/
                
            ).fetch();
            
                         
            if(isMouted){
                setProduct(dataproduto);   
                setPage(page + 1);
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
        async function getLengthCarrinho() {
            const dataKey     = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;
            const data        = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            setCarrinhoLength(currentData);                
        }    

        
        getLengthCarrinho();
        
    },[carrinhoLength.length])


    useEffect(()=>{
        if(searchText === ''){
            fechtProduto();
        }else{
            setProduct(
                product.filter((item:modelProdutos)=>{
                    if(item.decricao.toLowerCase().indexOf(searchText) > -1){
                        return true;
                    }else if(item.codigo.indexOf(searchText) > -1){
                        return true;
                    }else{return false;} 
                })
            );
        }
        

    },[searchText])

 return(
   <Container>
       <Header>
                <HeaderNavegation>
                    <PrevHome onPress={()=>{}}>                    
                        <NavIcon name="arrow-left" />
                    </PrevHome>
                    <NavTitle>
                        Meus Pedidos
                    </NavTitle>
                </HeaderNavegation>
                
                <DetailsCli>
                    <ImageCli source={{uri:cli.foto==='' ? photoPadrao:cli.foto}} />
                    <DetailWrapper>
                        <NomeCli>{cli.NOME}</NomeCli> 
                        <FantasiaCli>{cli.FANTASIA}</FantasiaCli>
                    </DetailWrapper>
                </DetailsCli>
                
                <FilterForm>
                    <IconWrapper>
                        <Iconfilter name="filter"/>
                    </IconWrapper>   
                    <Field>
                       <InputFilter 
                            placeholder="Buscar produto" 
                            placeholderTextColor="#fff" 
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </Field> 
                    <ButtonTypeFilter onPress={()=>{}}>
                        <IconTypeFilter name="chevron-down"/>
                    </ButtonTypeFilter>                    
                </FilterForm>
                <Separador/>
            </Header>

            {loading ? <Load/> : 
              <ProdutoList
                data={product}
                keyExtractor={item => item.id}
                renderItem={({item})=> <ProdutoCard  onPress={()=>handlerDetailsProduct(item)} data={item}  />}
                //onEndReached={fechtProduto}
                //onEndReachedThreshold={0.1}
                //ListFooterComponent={loading ? <Load/> :null }
              />  
            }

            <MyCarButton onPress={handlerOpenCarrinho}>
                <Ionicons name="cart" size={32} color={theme.colors.shape}/>
            </MyCarButton>

            <Modalize ref={modalizeRef}>
                <ShoppingBag cli={cli} tipo='novo'/>
            </Modalize>

   </Container>
  );
}