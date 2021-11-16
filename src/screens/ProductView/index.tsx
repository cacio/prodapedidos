import React,{useEffect,useState} from 'react'; 
import { useRoute,useNavigation } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
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

export function ProductView() {
    const [loading,setLoading] = useState(true); 
    const [product,setProduct] = useState<ProdutoDTO[]>([]); 
    const route  = useRoute();
    const cli    = route.params as ClienteDTO;
    const photoPadrao = `https://ui-avatars.com/api/?name=${cli.NOME}&length=1`;
    const theme = useTheme();

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;        
     }

    const navigator = useNavigation<NavigationProps>();

    function handlerOpenCarrinho(){
        console.log('teste');
    }
    
    function handlerDetailsProduct(product:ProdutoDTO){    
        
        const data = {
            cli:cli,
            product
        }

        navigator.navigate('DetailsProduct',data);

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

        fechtProduto();
        
    },[])

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
   </Container>
  );
}