import React,{useState} from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {ActivityIndicator,Alert} from 'react-native';
import {useTheme} from 'styled-components';

import AplleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {useAuth} from '../../hooks/auth';

import {SignInSocialButton} from '../../components/SignInSocialButton';
import {Container,Header,TitileWrapper,Title,SignInTitle,Footer,FooterWrapper} from './styles';

export function SignIn(){
    const [isloading,setIsloading] = useState(false);
    const {signInWithGoogle,signInWithApple} = useAuth();
    const theme = useTheme();

    async function handlersignInWithGoogle(){
        try {            
           setIsloading(true);
           return await signInWithGoogle();            
        } catch (error) {
            setIsloading(false);
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta google!');       
        }

    }

    async function handlersignInWithApple(){
        try {
            setIsloading(true);
          return  await signInWithApple();
            
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta Apple!');
            setIsloading(false);
        }
        
    }

    return (
        <Container>
            <Header>
                <TitileWrapper>
                    <LogoSvg
                         width={RFValue(200)}
                         height={RFValue(50)}
                    />
                    <Title>
                        Controle seus {'\n'}
                        pedidos de forma{'\n'}
                        muito simples
                    </Title>
                </TitileWrapper>

                <SignInTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixoversion 
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handlersignInWithGoogle}/>   
                    <SignInSocialButton title="Entrar com Apple" svg={AplleSvg} onPress={handlersignInWithApple}/>
                </FooterWrapper>   
                {isloading && <ActivityIndicator color={theme.colors.shape} style={{marginTop:18}} />}            
            </Footer>
        </Container>
    )
}