import React from 'react';
import {Button} from '../../components/Form/Button';
import { FlatList } from "react-native-gesture-handler";
import { opcoescliente } from '../../Utils/optionsfilterclientes';
import {Container,Header,Title,Footer,Options,Icon,Name,Separator} from './styles';

interface BoxOption{
    key:string;
    name:string;
}

interface Props{
    boxoptions:BoxOption;
    setBoxOptions:(boxoptions: BoxOption)=>void;
    closeSelectdBox:()=>void;
    title:string;    
}


export function OptionsFilter({boxoptions,setBoxOptions,closeSelectdBox,title}:Props){

    function handleOptionSelect(boxoptions: BoxOption){
        setBoxOptions(boxoptions);
    }    

    return (
        <Container>
            <Header>
                <Title>
                    {title}
                </Title>
            </Header>  

            {
                opcoescliente.map(item=>{
                    return(
                        <Options
                            onPress={()=>handleOptionSelect(item)}
                            isActive={boxoptions.key === item.key} 
                            key={item.key}               
                        >
                            <Icon name={boxoptions.key === item.key ? 'check-circle' : item.icon}/>
                            <Name>{item.name}</Name>
                        </Options>
                        
                    )
                })
            }
           

            <Footer>
                <Button title="Selecionar" onPress={closeSelectdBox}/>
            </Footer>

        </Container>
    )
}