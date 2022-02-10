import React,{useState} from 'react'; 
import { useNavigation } from '@react-navigation/native';
import {StatusBar,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '../../components/Form/Button';
import { InputLogin } from '../../components/Form/InputLogin';
import { InputPassword } from '../../components/Form/PasswordInput';
import { useAuth } from '../../hooks/auth';

import {
 Container,
 Header,
 Title,
 SubTitle,
 Footer,
 Form
} from './styles';

import * as Yup from 'yup';

export function Login() {

const {signIn} = useAuth();

const theme = useTheme();
const [email,setEmail] = useState('');
const [senha,setSenha] = useState('');

type NavigationProps = {
    navigate:(screen:string) => void;
 }

const navegation = useNavigation<NavigationProps>();

async function handlerLogin(){
    try {
        const scheme = Yup.object().shape({
            email:Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido!'),
            senha:Yup.string().required('A senha é obrigatório')
        });
    
        await scheme.validate({email,senha})
               
        const password = senha;

       await signIn({email,password});

    } catch (error) {
        
        if(error instanceof Yup.ValidationError){
            Alert.alert('Opa!',error.message);
        }else{
            Alert.alert('Erro na autenticação','Ocorreu um erro ao fazer login,verifique as credencias!');
        }
    }
}

function handlerNewAccount(){
    navegation.navigate('SignUpFirstStep');
}

 return(
   <KeyboardAvoidingView
    behavior="position"
    enabled
    style={{backgroundColor:theme.colors.primary}}   
   >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <Container>
            <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
            <Header>
                <Title>
                    Controle seus {'\n'}
                    pedidos de forma{'\n'}
                    muito simples
                </Title>
                <SubTitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível.
                </SubTitle>
            </Header>

                <Form>
                    <InputLogin 
                        iconName="mail"
                        placeholder="E-Mail"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />

                    <InputPassword
                        iconName="lock"
                        placeholder="Senha"
                        onChangeText={setSenha}
                        value={senha}
                    />
                </Form>

                <Footer>
                    <Button
                        title="Login"
                        onPress={handlerLogin}
                        enable={false}
                    />

                    <Button
                        title="Criar usuario"
                        style={{backgroundColor:theme.colors.primary,marginTop:8}}
                        onPress={handlerNewAccount}
                        ligth
                    />
                </Footer>

        </Container>
    </TouchableWithoutFeedback>
   </KeyboardAvoidingView>  
  );
}