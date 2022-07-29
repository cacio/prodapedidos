import React,{useState} from 'react'; 
import {useTheme} from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { MaskCnpjCpf } from '../../../Utils/mask';
import {
 Container,
 IconContaine,
 InputText
} from './styles';

interface InputProps extends TextInputProps{
    mask:"cnpj"|"cpf"|"cep"|"phone";
    iconName:React.ComponentProps<typeof Feather>['name'];
    inputMaskChange:any;
    values?:string;
}

export function InputMask({mask,iconName,inputMaskChange,values,...rest}:InputProps) {
    const theme = useTheme();
    const [isFocus,setIsFocus] = useState(false);
    const [isField,setIsField] = useState(false);

    function handleInputIsFocus(){
        setIsFocus(true)
    }

    function handleIsInputBlur(){
        setIsFocus(false);
        setIsField(!!values);
    }

    function handleChange(text:string){
        
        const value = MaskCnpjCpf(text);
        inputMaskChange(value);
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
        isFocused={isFocus}
        onChangeText={(text)=>handleChange(text)}
        {...rest}
       />

   </Container>
  );
}