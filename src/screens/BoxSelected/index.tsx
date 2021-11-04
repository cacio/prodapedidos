import React from 'react';
import {Button} from '../../components/Form/Button';
//import {Button} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { opcoes } from '../../Utils/opcoes';
import { impliente } from '../../Utils/importacliente';
import {Container,Header,Title,Footer,Options,Icon,Name,Separator} from './styles';

interface BoxYesNot{
    key:string;
    name:string;
}

interface Props{
    boxyesnot:BoxYesNot;
    setBoxYesNot:(boxyesnot: BoxYesNot)=>void;
    closeSelectdBox:()=>void;
    title:string;
    typeopt:string;
}


export function BoxSelected({boxyesnot,setBoxYesNot,closeSelectdBox,title,typeopt}:Props){

    function handleOptionSelect(boxyesnot: BoxYesNot){
        setBoxYesNot(boxyesnot);
    }    

    return (
        <Container>
            <Header>
                <Title>
                    {title}
                </Title>
            </Header>  

            <FlatList
                data={typeopt === '1' ? opcoes:impliente}
                keyExtractor={(item)=>item.key}
                renderItem={({item})=>(
                    <Options
                        onPress={()=>handleOptionSelect(item)}
                        isActive={boxyesnot.key === item.key}                                          
                    >
                        <Icon name={item.icon}/>
                        <Name>{item.name}</Name>
                    </Options>
                )}
                ItemSeparatorComponent={()=><Separator/>}
            />

            <Footer>
                <Button title="Selecionar" onPress={closeSelectdBox}/>
            </Footer>

        </Container>
    )
}