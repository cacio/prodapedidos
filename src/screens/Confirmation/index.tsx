import React from 'react'; 
import { useTheme } from 'styled-components';
import { useWindowDimensions, StatusBar } from 'react-native';
import LogoConfirmacao from '../../assets/BackgroundConfirmation.svg';
import Feito from '../../assets/Feito.svg';
import { Button } from '../../components/Form/Button';

import {
 Container,
 Content,
 Title,
 Message,
 Footer
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';

interface Params{
    title:string;
    message:string;
    nextScreenRoute:string;
    buttontitle:string;
}

export function Confirmation() {
    
    const { width } = useWindowDimensions();
    const theme = useTheme();
    type NavigationProps = {
        navigate:(screen:string) => void;
     }
    
    const navegation2 = useNavigation<NavigationProps>();
    const route = useRoute();    
      
    const { title,message,nextScreenRoute,buttontitle } = route.params as Params;

    function handlerConfirmation(){
        navegation2.navigate(nextScreenRoute);
    }

 return(
   <Container>
       <StatusBar 
        barStyle = "light-content"
        translucent
        backgroundColor="transparent"
      />
       <LogoConfirmacao width={width} style={{position:'absolute',top:67}}/>
       <Content>     
           <Feito/>
            <Title>
                {title}
            </Title>

            <Message>
                {message}
            </Message>

        </Content>

        <Footer>
            <Button title={buttontitle} style={{backgroundColor:theme.colors.success}} onPress={handlerConfirmation}/>
        </Footer>

   </Container>
  );
}