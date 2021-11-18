import React from 'react'; 
import { RFValue } from 'react-native-responsive-fontsize';
import VazioCarrinho from '../../assets/empty-cart.svg';
import {
 Container,
 Header,
 Titulo
} from './styles';

export function CarrinhoEmpty() {
 return(
    <Container>

        <Header>
              <Titulo>Seu carrinho de compras{'\n'}esta vazio 😲!</Titulo>  
        </Header>

        <VazioCarrinho  
          width={RFValue(374)}
          height={RFValue(294)}
        />

   </Container>
  );
}