import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AplleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {SignInSocialButton} from '../../components/SignInSocialButton';
import {Container,Header,TitileWrapper,Title,SignInTitle,Footer,FooterWrapper} from './styles';

export function SignIn(){
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
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={()=>{}}/>   
                <SignInSocialButton title="Entrar com Apple" svg={AplleSvg} onPress={()=>{}}/>
                </FooterWrapper>               
            </Footer>
        </Container>
    )
}