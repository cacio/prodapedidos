import React from 'react'; 
import {TouchableOpacityProps} from 'react-native';
import { Produtos as modelProdutos } from '../../databases/model/Produtos';

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
 ProductWrapper,
 LabelDetails
} from './styles';


interface Props extends TouchableOpacityProps{
    data:modelProdutos
}

export function ProdutoCard({data,...rest}:Props) {
 return(
   <Container {...rest}>
       <Product>
           <ProductWrapper>
                <Nome>({data.codigo}) - {data.decricao}</Nome>
                <Unit>({data.unidade})</Unit>
                <Price>R$ {parseFloat(String(data.preco_venda)).toLocaleString('pt-br',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Price>
           </ProductWrapper>
           <Details>
               <LabelDetails>
                    <Estoque>Estoque: {data.estoque_atual}</Estoque>
               </LabelDetails>
               <LabelDetails>
                    <Pc>{data.pecas_estoque} PC</Pc>
               </LabelDetails>
               <LabelDetails>
                    <PesoMedio>{data.peso_medio} {data.unidade}</PesoMedio>
               </LabelDetails>
           </Details>
       </Product>
   </Container>
  );
}