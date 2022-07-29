import React,{useState,useEffect,useRef} from 'react'; 
import { useRoute,useNavigation } from '@react-navigation/native';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { Pedido as modelPedido } from '../../databases/model/Pedido';
import { PedidoDetalhe as modelPedidoDetalhe } from '../../databases/model/PedidoDetalhe';
import { CarrinhoDTO as CarrinhoData } from '../../dtos/CarrinhoDTO';
import { database } from '../../databases';
import { Modalize } from 'react-native-modalize';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Q } from '@nozbe/watermelondb';
import { v4 as uuidv4 } from 'uuid';

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
import { Load } from '../../components/Load';
import { ProdutoCard } from '../../components/ProdutoCard';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { ShoppingBag } from '../ShoppingBag';

interface Params{
    cli:modelClientes,
    idped:string
}

export function ProductAlterView() {
    const {user}           = useAuth();
    const route            = useRoute();
    const { cli,idped }    = route.params as Params;
    const photoPadrao      = `https://ui-avatars.com/api/?name=${cli.NOME}&length=1`;
    const [searchText,setSearchText] = useState('');
    const [loading,setLoading]       = useState(true); 
    const [product,setProduct]       = useState<modelProdutos[]>([]); 
    const theme = useTheme();

    let isMouted = true;

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;
        goBack:()=>void;
     }
    
    const navigator = useNavigation<NavigationProps>();
    const modalizeRef      = useRef<Modalize>(null);

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

    async function fechtProduto() {
        try {
            
        const colectionProdutos = database.get<modelProdutos>('produtos');
        const dataproduto = await colectionProdutos.query().fetch();
        
                        
        if(isMouted){
            setProduct(dataproduto);               
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

async function handlerDadosAlteracao(){
    
    const dataKey       = `@prodapedido:transactions_user:${user.id}:cli:${cli.CODIGO}`;

    const pedidoCollection  = database.get<modelPedido>('pedido');
    const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
    const collectionProduto = database.get<modelProdutos>('produtos');
    
    const Produtos          = await collectionProduto.query().fetch();

    const listaPedido = await pedidoCollection.query(
        Q.where('id',idped)
    ).fetch();

    const detalhePedidos = await detalheCollection.query(
        Q.where('pedido_id',listaPedido[0].pedido_id)
    ).fetch();

    let newProdutoCarrinho:CarrinhoData[] = [];

    detalhePedidos.forEach(async (itens:modelPedidoDetalhe)=>{
            
        const xprod  =  Produtos.filter((itemp:modelProdutos)=>itemp.codigo == itens.cod_prod);
        const subtot = Number(itens.preco.replace(",", ".")) * Number(itens.qtd);
        const peso   = itens.tipo_pc_qtd == '1' ? subtot : (Number(itens.qtd) * Number(xprod[0].peso_medio));

        newProdutoCarrinho.push({
                id:uuidv4(),
                tipo: itens.tipo_pc_qtd,
                quantidade:itens.qtd,
                codprod:xprod[0].id,
                codigo:itens.cod_prod,
                nomeprod:xprod[0].decricao,
                preco:itens.preco,
                peso: String(peso),
                subtotal:parseFloat(String(subtot)).toLocaleString('pt-br',
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                unidade:xprod[0].unidade,
                peso_medio:xprod[0].peso_medio,
                obs:itens.obs   
        });       

    });  
    
    await AsyncStorage.setItem(dataKey,JSON.stringify(newProdutoCarrinho));
    handlerOpenCarrinho();
}

useEffect(()=>{
    handlerDadosAlteracao();
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
                <ShoppingBag cli={cli} tipo='alterar' idped={idped}  />
            </Modalize>

   </Container>
  );
}