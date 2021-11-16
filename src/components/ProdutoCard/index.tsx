import React from 'react'; 
import {TouchableOpacityProps} from 'react-native';
import { ProdutoDTO } from '../../dtos/ProdutoDTO';

import {
 Container,
 Product,
 Nome,
 Unit,
 Price,
 Details,
 Estoque,
 Pc,
 PesoMedio,
 ProductWrapper
} from './styles';


interface Props extends TouchableOpacityProps{
    data:ProdutoDTO
}

export function ProdutoCard({data,...rest}:Props) {
 return(
   <Container {...rest}>
       <Product>
           <ProductWrapper>
                <Nome>({data.id}) - {data.descricao}</Nome>
                <Unit>({data.unidade})</Unit>
                <Price>R$ {data.preco_venda}</Price>
           </ProductWrapper>
           <Details>
               <Estoque>Estoque: {data.estoque_atual}</Estoque>
               <Pc>{data.pecas_estoque} PC</Pc>
               <PesoMedio>{data.peso_medio} {data.unidade}</PesoMedio>
           </Details>
       </Product>
   </Container>
  );
}