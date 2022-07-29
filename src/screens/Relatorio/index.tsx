import React from 'react'; 
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useRoute,useNavigation } from '@react-navigation/native';

import {
 Container,
 Header,
 HeaderNavegation, 
 Title,
 Content,
 TextDev
} from './styles';

export function Relatorio() {
    const theme     = useTheme();
    const nav       = useNavigation();
   
    function handleNack(){
       nav.goBack();
    }
   
    return(
      <Container>
          <Header>
               <HeaderNavegation>
                   <BackButton color={theme.colors.shape} onPress={handleNack} />
                   <Title>
                       Relatórios
                   </Title>
               </HeaderNavegation>
           </Header> 
           <Content>
               <TextDev>Em desenvolvimento</TextDev>
           </Content>
      </Container>
     );
}