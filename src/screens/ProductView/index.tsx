import React,{useEffect,useState,useRef} from 'react'; 
import { useRoute,useNavigation } from '@react-navigation/native';
import {Text} from 'react-native';
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
import { ClienteDTO } from '../../dtos/ClienteDTO';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import { ProdutoDTO } from '../../dtos/ProdutoDTO';
import { Load } from '../../components/Load';
import { ShoppingBag } from '../ShoppingBag';
import { useAuth } from '../../hooks/auth';
import { CarrinhoEmpty } from '../../components/CarrinhoEmpty';


export function ProductView() {
    const {user}               = useAuth();
    const [loading,setLoading] = useState(true); 
    const [product,setProduct] = useState<ProdutoDTO[]>([]);     
    const [carrinhoLength,setCarrinhoLength] = useState([]);
    const route  = useRoute();
    const cli    = route.params as ClienteDTO;
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
    
    function handlerDetailsProduct(product:ProdutoDTO){            
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

    useEffect(()=>{
        async function fechtProduto() {
            try {
                const response = await api.get('/produtos');
                const data     = response.data;
                setProduct(data);   
                setLoading(false); 
               // console.log(data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        async function getLengthCarrinho() {
            const dataKey     = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;
            const data        = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            setCarrinhoLength(currentData);    

            
        }    

        fechtProduto();
        getLengthCarrinho();

        
    },[carrinhoLength.length])

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
              />  
            }

            <MyCarButton onPress={handlerOpenCarrinho}>
                <Ionicons name="cart" size={32} color={theme.colors.shape}/>
            </MyCarButton>

            <Modalize ref={modalizeRef}>
                <ShoppingBag cli={cli}  />
            </Modalize>

   </Container>
  );
}