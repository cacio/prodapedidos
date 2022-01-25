import React,{useState} from 'react'; 
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import {KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import {
 Container,
 Header,
 HeaderTop,
 HeaderTitle,
 PhotoContainer,
 Photo,
 LogoutButton,
 PhotoButton,
 Content,
 Options,
 Option,
 OptionTitile,
 Section
} from './styles';
import { InputLogin } from '../../components/Form/InputLogin';
import { InputPassword } from '../../components/Form/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Form/Button';

export function Profile() {
  const {user,signOut,updateUser} = useAuth();  
  const [option,setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar,setAvatar] = useState(user.photo);
  const [name,setName] = useState(user.name);
  const [codrepre,setCodrepre] = useState(user.codrepre);
  

  const theme = useTheme();
  
  type NavigationProps = {
    navigate:(screen:string) => void;
    goBack:()=>void;
 }

  const navigator = useNavigation<NavigationProps>();

  function handleBack(){
    navigator.goBack();
  }

  function handlerOptionChange(optionSelected:'dataEdit' | 'passwordEdit'){
    setOption(optionSelected);
  }

  async function handlerSelectAvatar(){
    const result  = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,4],
      quality:1,
    });

    if(result.cancelled){
      return;
    }

    if(result.uri){
      setAvatar(result.uri);
    }

  }

async function handlerUserUpdate(){

  try {
    
    const schema = Yup.object().shape({
      name:Yup.string().required('Nome é obrigatorio'),      
    });

    const data = {name};

    await schema.validate(data);

    await updateUser({
      id:user.id,
      user_id:user.user_id,
      name,
      email:user.email,
      photo:avatar,
      codrepre:codrepre,
      cnpj_emp:user.cnpj_emp,
      token:user.token
    });
    Alert.alert('Perfil atualizado');
  } catch (error) {

    if(error instanceof Yup.ValidationError){
      Alert.alert('Opa',error.message);
    }else{
      Alert.alert('Não foi possivel atualizar o perfil!');
    }

    
  }

}

async function handlerSignOut(){
  Alert.alert(
    'Tem certeza ?',
    'Se você sair irá precisar de internet para conectar-se novamente.',
    [
      {
        text:'Cancelar',
        onPress:()=>{},
        style:'cancel'
      },
      {
        text:'Sair',
        onPress:()=>signOut()
      }
    ]
  );

  
}

 return(
   <KeyboardAvoidingView behavior='position' enabled>
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
            <Header>
                <HeaderTop>
                    <BackButton color={theme.colors.shape} onPress={handleBack} />
                    <HeaderTitle>
                      Editar Perfil
                    </HeaderTitle>
                    <LogoutButton onPress={handlerSignOut}>
                        <Feather name='power' size={24} color={theme.colors.shape}/>
                    </LogoutButton>
                </HeaderTop>
                <PhotoContainer>
                    { !!avatar && <Photo source={{uri:avatar}} />}
                    <PhotoButton onPress={handlerSelectAvatar}>
                      <Feather name='camera' size={24} color={theme.colors.shape}/>
                    </PhotoButton>
                </PhotoContainer>
            </Header>

            <Content>
                <Options>
                    <Option active={option == 'dataEdit'} onPress={()=>handlerOptionChange('dataEdit')}>
                        <OptionTitile active={option == 'dataEdit'}>Dados</OptionTitile>
                    </Option>
                    
                    <Option active={option == 'passwordEdit'} onPress={()=>handlerOptionChange('passwordEdit')}>
                        <OptionTitile active={option == 'passwordEdit'}>Trocar Senha</OptionTitile>
                    </Option>

                </Options>
                {
                  option === 'dataEdit' ?
                  <Section>
                    <InputLogin 
                      iconName='user' 
                      placeholder='Nome' 
                      autoCapitalize='none' 
                      autoCorrect={false}
                      defaultValue={user.name}
                      onChangeText={setName}
                    />
                    <InputLogin 
                      iconName='mail' 
                      editable={false}
                      defaultValue={user.email}
                    />

                    <InputLogin 
                      iconName='credit-card' 
                      editable={false}
                      defaultValue={user.codrepre}
                      onChangeText={setCodrepre}
                    />

                  </Section>
                    :
                  <Section>
                    <InputPassword 
                      iconName='lock' 
                      placeholder='Senha Atual' 
                      autoCapitalize='none' 
                      autoCorrect={false}
                    />

                    <InputPassword 
                      iconName='lock' 
                      placeholder='Nova Senha' 
                      autoCapitalize='none' 
                      autoCorrect={false}
                    />

                  <InputPassword 
                      iconName='lock' 
                      placeholder='Repetir Senha' 
                      autoCapitalize='none' 
                      autoCorrect={false}
                    />
                    

                  </Section>
                }

                <Button title='Salvar alterações' onPress={()=>{handlerUserUpdate()}} />
            </Content>

      </Container>
    </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  );
}