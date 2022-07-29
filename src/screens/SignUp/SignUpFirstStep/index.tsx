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
import { InputMask } from '../../../components/Form/InputMask';
import { api } from '../../../services/api';


export function SignUpFirstStep() {

  const [nome,setNome]                   = useState('');
  const [email,setEmail]                 = useState('');
  const [codrepre,setCodrepre]           = useState('');
  const [driverLicense,setDriverLicense] = useState('');
  const [cnpjcpf,setCnpjcpf]             = useState('');

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
        codrepre:Yup.string().length(5,"Deve conter 5 números").required('Código do represetante é obrigatório'),
        email:Yup.string().email("E-Mail inválido").required('E-mail é obrigatório'),
        nome:Yup.string().required('Nome é obrigatório'),
        cnpjcpf:Yup.string().required('CNPJ da empresa é obrigatório')        
      });

      const data = {nome,email,codrepre,cnpjcpf};
      await scheme.validate(data);
      
      const vdata = await api.post('/usuarios/verifica',{
                  cnpj_emp:cnpjcpf.replace(/\D/g, ""),
                  cod_repre:codrepre
                  }
                 );
      const {message,status}  = vdata.data;
      
      if(status == 'error'){
        Alert.alert('Opa!',message);
      }else{
        navegation2.navigate('SignUpSecondStep',{user:data});
      }
      
    } catch (error) {
      if(error instanceof Yup.ValidationError){
          Alert.alert('Opa!',error.message);
      }
      //console.log(error);
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
        
        <InputMask
          iconName="briefcase"
          mask='cnpj'
          maxLength={18}
          placeholder="CNPJ Empresa"
          keyboardType="numeric"
          inputMaskChange={(text:string)=>setCnpjcpf(text)}
          values={cnpjcpf}        
          value={cnpjcpf}
        />

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
          maxLength={5}
          value={codrepre}
        />
      
      </Form>
        <Button title="Proximo" onPress={hanlerNextStep}/>
      </Container>
    </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  );
}