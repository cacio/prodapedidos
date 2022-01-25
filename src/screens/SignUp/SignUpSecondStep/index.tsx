import React,{useState} from 'react';
import { useNavigation,useRoute } from '@react-navigation/native'; 
import { BackButton } from '../../../components/BackButton';
import {KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
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
import { InputPassword } from '../../../components/Form/PasswordInput';
import { Button } from '../../../components/Form/Button';
import { useTheme } from 'styled-components/native';
import { api } from '../../../services/api';

interface Params{
  user:{
    nome:string;
    email:string;
    codrepre:string
  }
}

export function SignUpSecondStep() {

  const [senha,setSenha]               = useState('');
  const [senhaConfirm,setSenhaConfirm] = useState('');

  const theme = useTheme();
  type NavigationProps = {
    navigate:(screen:string,{}?) => void;
 }

  const navegation2 = useNavigation<NavigationProps>();

  const navegation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;
 
  function handleNack(){
    navegation.goBack();
  }

  async function handleRegister() {
    if(!senha || !senhaConfirm){
      return Alert.alert('Informe a senha e a confirmação.')
    }

    if(senha != senhaConfirm){
      return Alert.alert('A senhas não são iguais')
    }


    await api.post('/usuarios',{
      name:user.nome,
      email:user.email,
      passwd:senha,
      photo:'',
      cnpj_emp:'99999999999999',
      cod_repre:user.codrepre
    }).then(()=>{
      
      navegation2.navigate('Confirmation',{      
        nextScreenRoute:'SignIn',
        title:'Conta Criada!',
        message:`gora você faz parte da\nplataforma de pedidos`,
        buttontitle:"Fazer login"
      });

    }).catch(()=>{
      Alert.alert('Opa',"Não foi possivel cadastrar!")
    });
    
    

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
              <Bullet />
              <Bullet active />
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
        <FormTitle>2. Senha</FormTitle>
        <InputPassword
          iconName="lock"
          placeholder="senha"
          onChangeText={setSenha}
          value={senha}
        />

      <InputPassword
          iconName="lock"
          placeholder="Repetir senha"
          onChangeText={setSenhaConfirm}
          value={senhaConfirm}
        />

      
      
      </Form>
        <Button title="Cadastrar" style={{backgroundColor:theme.colors.success}} onPress={handleRegister}/>
      </Container>
    </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  );
}