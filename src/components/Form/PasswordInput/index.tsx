import React,{useState} from 'react'; 
import {useTheme} from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
 Container,
 IconContaine,
 InputText 
} from './styles';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps{
    iconName:React.ComponentProps<typeof Feather>['name'];
    value?:string;
}

export function InputPassword({iconName,value,...rest}:InputProps) {
    const theme = useTheme();
    const [isPasswordVisible,setisPasswordVisible] = useState(true);
    const [isFocus,setIsFocus] = useState(false);
    const [isField,setIsField] = useState(false);

    function handlerPasswordVisibilityChange(){
        setisPasswordVisible(prevState => !prevState);
    }
    
    

    function handleInputIsFocus(){
        setIsFocus(true)
    }

    function handleIsInputBlur(){
        setIsFocus(false);
        setIsField(!!value);
    }

 return(
   <Container>
       <IconContaine isFocused={isFocus}>
            <Feather
                name={iconName}
                size={24}
                color={(isFocus || isField) ?  theme.colors.secundary : theme.colors.text}  
            />
        </IconContaine>
       <InputText 
        onFocus={handleInputIsFocus}
        onBlur={handleIsInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocus}
       {...rest}
       />

        <BorderlessButton onPress={handlerPasswordVisibilityChange}>
            <IconContaine isFocused={isFocus}>
                <Feather
                        name={isPasswordVisible ? "eye": 'eye-off'}
                        size={24}
                        color={theme.colors.text} 
                    />
            </IconContaine>
        </BorderlessButton>

   </Container>
  );
}