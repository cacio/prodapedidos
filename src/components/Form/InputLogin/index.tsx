import React,{useState} from 'react'; 
import {useTheme} from 'styled-components';
import { Feather } from '@expo/vector-icons';
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

export function InputLogin({iconName,value,...rest}:InputProps) {
    const theme = useTheme();
    const [isFocus,setIsFocus] = useState(false);
    const [isField,setIsField] = useState(false);

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
        isFocused={isFocus}
        {...rest}
       />
   </Container>
  );
}