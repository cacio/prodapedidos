import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { BackButton } from '../../../components/BackButton';
import {KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import * as Yup from 'yup';


import {
 Container,
 Header,
 Steps,
 Title,
 SubTitle,
 Form,
 FormTitle
} from './styles';
import { Bullet } from '../../../components/Bullet';
import { InputLogin } from '../../../components/Form/InputLogin';
import { Button } from '../../../components/Form/Button';
import { useTheme } from 'styled-components/native';


export function SignUpFirstStep() {

  const [nome,setNome]                   = useState('');
  const [email,setEmail]                 = useState('');
  const [codrepre,setCodrepre]           = useState('');
  const [driverLicense,setDriverLicense] = useState('');

  const theme = useTheme();
  type NavigationProps = {
    navigate:(screen:string,{}?) => void;
 }

  const navegation  = useNavigation();
  const navegation2 = useNavigation<NavigationProps>();

  function handleNack(){
    navegation.goBack();
  }

  async function hanlerNextStep() {
    try {
      const scheme = Yup.object().shape({
        codrepre:Yup.string().required('Código do represetante é obrigatório'),
        email:Yup.string().email("E-Mail inválido").required('E-mail é obrigatório'),
        nome:Yup.string().required('Nome é obrigatório')        
      });

      const data = {nome,email,codrepre};
      await scheme.validate(data);

      navegation2.navigate('SignUpSecondStep',{user:data});
    } catch (error) {
      if(error instanceof Yup.ValidationError){
          Alert.alert('Opa!',error.message);
      }

    }
      
  }

 return(
  <KeyboardAvoidingView
    behavior="position"
    enabled
    style={{backgroundColor:theme.colors.primary}}   
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Container>
        <Header>
          <BackButton onPress={handleNack}/>
          <Steps>
              <Bullet active />
              <Bullet />
          </Steps>       
        </Header>

        <Title>
          Crie sua{'\n'}conta
          </Title>
        <SubTitle>
          Faça seu cadastro de{'\n'} 
          forma rápida e fácil
        </SubTitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
        <InputLogin
          iconName="user"
          placeholder="Nome"
          onChangeText={setNome}
          value={nome}
        />

        <InputLogin
          iconName="mail"
          placeholder="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <InputLogin
          iconName="credit-card"
          placeholder="Código Representante"
          keyboardType="numeric"
          onChangeText={setCodrepre}
          value={codrepre}
        />
      
      </Form>
        <Button title="Proximo" onPress={hanlerNextStep}/>
      </Container>
    </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  );
}