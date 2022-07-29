import React,{useState,useEffect,useRef} from 'react'; 
import { Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { InputFilter } from '../../components/Form/InputFilter';
import { PedidoCard } from '../../components/PedidoCard';
import { database } from '../../databases';
import { Clientes as modelClientes } from '../../databases/model/Clientes';
import { Pedido as modelPedido } from '../../databases/model/Pedido';
import { PedidoDetalhe as modelPedidoDetalhe } from '../../databases/model/PedidoDetalhe';
import { Q } from '@nozbe/watermelondb';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useIsFocused } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { Modalize } from 'react-native-modalize';


import { Load } from '../../components/Load';
import ImgEmpty from '../../assets/empty.svg';

import {
 Container,
 Header,
 HeaderNavegation,
 PrevHome,
 NavIcon,
 NavTitle,
 InfoTotalsDays,
 Totalday,
 TotaldayValor,
 TotaldayTitle,
 LengthDay,
 LengthDayValor,
 LengthDayText,
 FilterForm,
 IconWrapper,
 Iconfilter,
 Field,
 ButtonTypeFilter,
 IconTypeFilter,
 Separador,
 ContentStatus,
 Status,
 TipoStatus,
 StatusText,
 PedidoFeitoList,
 ButtonEnvPed,
 TextEnvPed,
 EmptyListPed,
 EmptyText,
 EmptySubtitleText,
 ButtonNovoPed,
 TitleButon,
 OptionFiltro,
 OptionButton,
 OptionText,
 IconChecked,
 TitleText,
 DatasOption,
 DataFilter,
 IconContainer,
 IconeData,
 TitleData,
 TitleTipoData,
 ContantData,
 OptionStatusContent,
 OptionStatus,
 OptionStatusValue,
 OptionStatusText,
 ContentFiltro
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../components/Form/Button';

export interface StatusProps{
    id:string;
    tipo:string;
    nome:string;    
}
export interface PedidoProps{
    id:string;
    codreta:string;
    tipo:string;
    nomecli:string;
    nomefant:string;
    dtemissao:string;
    dtentrega:string;
    total:string;
    totaldesc:string;
    totalfinal:string;
}

interface BoxYesNot{
    key:string;
    name:string;
}

interface SelectOptionStatus{
    key:string;   
}

export function MeusPedidos() {
    const [selpedido,setSelpedido]     = useState<BoxYesNot[]>([]);
    const [loading,setLoading]         = useState(true);
    const [vtotalgeral,setVtotalgeral] = useState(0);
    const [pedidos,setPedidos]         = useState<PedidoProps[]>([]);
    const [btnhide,setBtnHide]         = useState(false);
    const [option,setOption]           = useState<'dtemissao' | 'dtentrega'>('dtemissao')
    const [dataincial,setDataincial]   = useState(new Date()); 
    const [datafinal,setDatafinal]     = useState(new Date()); 
    const [optionstatus,setOptionstatus] = useState<SelectOptionStatus[]>([]);
    const [isDatePickerVisible, setDatePickerVisibility]   = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [searchText,setSearchText] = useState('');
    const [acaobusca,setAcaobusca] = useState(false);
    const theme                = useTheme();
    const screenIsFocus        = useIsFocused();
    const modalizeRef          = useRef<Modalize>(null);

    type NavigationProps = {
        navigate:(screen:string,{}?) => void;
        goBack:()=>void;
     }
    
    const navigator = useNavigation<NavigationProps>();
    
    function handleBack(){
        navigator.goBack();        
    }

    function HandlerFazerPedido(){        
        navigator.navigate('Clientes');
    }

    function handlerOpenFilterModalize(){
        modalizeRef.current?.open();
    }

    function handlerCloseFilterModalize(){
        modalizeRef.current?.close();
    }

    function handlerOptionChange(optionSelected:'dtemissao' | 'dtentrega'){
        setOption(optionSelected);
      }

     function hanblerOptionChangeStatus(item:SelectOptionStatus){

        const itemn = {
            key:item.key,            
        };

        let dataFormatted:SelectOptionStatus[] = [];

        const itemnovo = optionstatus.filter((items:SelectOptionStatus)=>
                items.key != item.key         
        ); 
        
        const colectionNewPed = itemnovo;  
        
        const selnovo = optionstatus.filter((items:SelectOptionStatus)=>
            items.key === item.key         
        );
        
        
        if(selnovo[0]){            
             dataFormatted =[ 
                ...colectionNewPed              
            ];
        }else{            
            dataFormatted =[ 
                ...colectionNewPed,
                itemn
            ];
        }
        
        setOptionstatus(dataFormatted);    
     }

     function tpstatus(item:Number){
         
        const selnovo = optionstatus.filter((items:SelectOptionStatus)=>
            items.key === String(item)
        );
                
        if(selnovo[0]){            
            return true
        }else{        
            return false
        }

     }

    const dataStatus:StatusProps[] = [
        {
            id:'1',
            tipo:'P',
            nome:'Pedente'    
        },
        {
            id:'2',
            tipo:'S',
            nome:'Sincronizado'    
        },
        {
            id:'3',
            tipo:'PR',
            nome:'Pedente Restrições'    
        }

    ];

   function handlerSelectionPed(item:BoxYesNot){

        const itemn = {
            key:item.key,
            name:item.name,
        };

        let dataFormatted:BoxYesNot[] = [];
                
        const itemnovo = selpedido.filter((items:BoxYesNot)=>
            items.key != item.key         
        );         

        const colectionNewPed = itemnovo;  
        
        const selnovo = selpedido.filter((items:BoxYesNot)=>
            items.key === item.key         
        );
        
       
        
        if(selnovo[0]){            
             dataFormatted =[ 
                ...colectionNewPed              
            ];
        }else{            
            dataFormatted =[ 
                ...colectionNewPed,
                itemn
            ];
        }

        setSelpedido(dataFormatted);
              
    }    

    function handlerClicadoPed(ped:PedidoProps){
        navigator.navigate('DetailsPedido',{ped:ped});
    }

    function hendlerOpenDatetimPickerForAndroid(){    
        setDatePickerVisibility(oldState => !oldState);
    }

    function hendlerOpenDatetimPickerForAndroid2(){    
        setDatePickerVisibility2(oldState => !oldState);
    }

    function hideDatePicker(){
        setDatePickerVisibility(false);
    }

    function hideDatePicker2(){
        setDatePickerVisibility2(false);
    }
    
    function handleDataInicial(dateTime:Date | undefined) {
        if(Platform.OS === 'android'){
            setDatePickerVisibility(oldState => !oldState);
        }
    
        if(dateTime)
            setDataincial(dateTime);            
        
        hideDatePicker();
    };

    function handleDataFinal(dateTime:Date | undefined) {
        if(Platform.OS === 'android'){
            setDatePickerVisibility2(oldState => !oldState);
        }
    
        if(dateTime)
            setDatafinal(dateTime);            
        
        hideDatePicker2();
    };

    async function handlerFiltrar(){
        let isMouted = true;
        try {
            setLoading(true);
            const pedidoCollection     = database.get<modelPedido>('pedido');
            const detalheCollection    = database.get<modelPedidoDetalhe>('pedidodetalhe');
            const collectionCliente    = database.get<modelClientes>('clientes');
            const  data:PedidoProps[]  = [];  

            let vl:any[] = [];
            let integrantes = "";
            let x  = 0;
            let sinal = ", ";    
            const size = optionstatus.length;

            const itemnovo = optionstatus.forEach((items:SelectOptionStatus)=>{                
                
                if(x === size-1){
                    sinal = "";
                }else if(x === size){
                    sinal = ".";
                } 
                
                integrantes += `'${items.key}'`+sinal;
               // vl.push(String(items.key))         
               x++; 
            }); 
            
            
            const dataFormatt = {
                option,
                dataincial:String(format(dataincial,'Y-MM-dd')),
                datafinal:String(format(datafinal,'Y-MM-dd')),                 
            }

            let listaPedido;

            if(size > 0){
                const sql = `select * from pedido where ${dataFormatt.option === 'dtemissao' ? 'data_pedido' :'data_entrega'} between '${dataFormatt.dataincial}' and '${dataFormatt.datafinal}' and status in(${integrantes})`;
                listaPedido = await pedidoCollection.query(
                    Q.unsafeSqlQuery(sql),                
                ).fetch();
                
            }else{
                const sql = `select * from pedido where ${dataFormatt.option === 'dtemissao' ? 'data_pedido' :'data_entrega'} between '${dataFormatt.dataincial}' and '${dataFormatt.datafinal}' `;
                listaPedido = await pedidoCollection.query(
                    Q.unsafeSqlQuery(sql),                
                ).fetch();
                
            }
            
                const detalhepedido     = await detalheCollection.query().fetch();
                const datacli           = await collectionCliente.query().fetch();
                let totalgeral = 0;
                listaPedido.forEach(async (item:modelPedido)=>{
                    
                    const cliente  = datacli.filter((itemcli:modelClientes)=>itemcli.CODIGO == item.codigo_cliente);

                    let subtotal  = 0; 
                    let vDesconto = 0; 
                    let vTotFinal = 0; 

                    detalhepedido.forEach((itemd:modelPedidoDetalhe)=>{
                        if(itemd.pedido_id === item.pedido_id ){
                            const valor =  (Number(itemd.preco.replace(",",".")) * Number(itemd.qtd));
                            const valordesc = Number(itemd.desconto);
                            const vTotalFinal = Number(valor) - Number(itemd.desconto);
                            subtotal +=valor;
                            vDesconto +=valordesc;
                            vTotFinal +=vTotalFinal;

                            totalgeral += vTotalFinal;
                        }
                    })    
                    
                    data.push({
                        id:item.id,
                        tipo:item.status,
                        nomecli:cliente[0].NOME,
                        nomefant:cliente[0].FANTASIA,
                        dtemissao:item.data_pedido,
                        dtentrega:item.data_entrega,
                        total:String(subtotal),
                        totaldesc:String(vDesconto),
                        totalfinal:String(vTotFinal),
                        codreta:item.CODIGO_RETAGUARDA
                    })
                    
                });
                if(isMouted){
                    setPedidos(data);
                    setVtotalgeral(totalgeral);
                    handlerCloseFilterModalize();
                    setAcaobusca(true);
                }

                setLoading(false);            

        } catch (error) {
            console.log(error);
        }finally{
            if(isMouted){
                setLoading(false);
            }
        }

    }


    async function FilterStatusPedidos(tipo:String) {

            const pedidoCollection  = database.get<modelPedido>('pedido');
            const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
            const collectionCliente = database.get<modelClientes>('clientes');

            const  data:PedidoProps[]  = [];             
            const newTipo = tipo ? String(tipo): '0';

            const listaPedido       = await pedidoCollection.query(
                Q.where('status',newTipo)
            ).fetch();
            const detalhepedido     = await detalheCollection.query().fetch();
            const datacli           = await collectionCliente.query().fetch();
            let totalgeral = 0;
            listaPedido.forEach(async (item:modelPedido)=>{
                
                const cliente  = datacli.filter((itemcli:modelClientes)=>itemcli.CODIGO == item.codigo_cliente);

                let subtotal  = 0; 
                let vDesconto = 0; 
                let vTotFinal = 0; 

                detalhepedido.forEach((itemd:modelPedidoDetalhe)=>{
                    if(itemd.pedido_id === item.pedido_id ){
                        const valor =  (Number(itemd.preco.replace(",",".")) * Number(itemd.qtd));
                        const valordesc = Number(itemd.desconto);
                        const vTotalFinal = Number(valor) - Number(itemd.desconto);
                        subtotal +=valor;
                        vDesconto +=valordesc;
                        vTotFinal +=vTotalFinal;

                        totalgeral += vTotalFinal;
                    }
                })    
                
                data.push({
                    id:item.id,
                    tipo:item.status,
                    nomecli:cliente[0].NOME,
                    nomefant:cliente[0].FANTASIA,
                    dtemissao:item.data_pedido,
                    dtentrega:item.data_entrega,
                    total:String(subtotal),
                    totaldesc:String(vDesconto),
                    totalfinal:String(vTotFinal),
                    codreta:item.CODIGO_RETAGUARDA
                })
                
            });

            setPedidos(data);
            setVtotalgeral(totalgeral);
        
    }


    useEffect(()=>{
        let isMouted = true;
        async function ListPeidos() {
            try {
                const pedidoCollection  = database.get<modelPedido>('pedido');
                const detalheCollection = database.get<modelPedidoDetalhe>('pedidodetalhe');
                const collectionCliente = database.get<modelClientes>('clientes');

                const  data:PedidoProps[]  = [];             
                const dataDay =  String(format(new Date(),'Y-MM-dd')); 

                const listaPedido       = await pedidoCollection.query(
                    Q.where('data_pedido',dataDay)
                ).fetch();
                const detalhepedido     = await detalheCollection.query().fetch();
                const datacli           = await collectionCliente.query().fetch();
                let totalgeral = 0;
                listaPedido.forEach(async (item:modelPedido)=>{
                    
                    const cliente  = datacli.filter((itemcli:modelClientes)=>itemcli.CODIGO == item.codigo_cliente);

                    let subtotal  = 0; 
                    let vDesconto = 0; 
                    let vTotFinal = 0; 

                    detalhepedido.forEach((itemd:modelPedidoDetalhe)=>{
                        if(itemd.pedido_id === item.pedido_id ){
                            const valor =  (Number(itemd.preco.replace(",",".")) * Number(itemd.qtd));
                            const valordesc = Number(itemd.desconto);
                            const vTotalFinal = Number(valor) - Number(itemd.desconto);
                            subtotal +=valor;
                            vDesconto +=valordesc;
                            vTotFinal +=vTotalFinal;

                            totalgeral += vTotalFinal;
                        }
                    })    
                    
                    data.push({
                        id:item.id,
                        tipo:item.status,
                        nomecli:cliente[0].NOME,
                        nomefant:cliente[0].FANTASIA,
                        dtemissao:item.data_pedido,
                        dtentrega:item.data_entrega,
                        total:String(subtotal),
                        totaldesc:String(vDesconto),
                        totalfinal:String(vTotFinal),
                        codreta:item.CODIGO_RETAGUARDA
                    })
                    
                });
                if(isMouted){
                    setPedidos(data);
                    setVtotalgeral(totalgeral);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }finally{
                if(isMouted){
                    setLoading(false);
                }
            }
            
        }
        if(searchText === ''){
            if(acaobusca == false){
                ListPeidos();
            }else{
                handlerFiltrar();
            }
            
        }else{
            if(searchText != ''){
                setPedidos(
                   pedidos.filter((item:PedidoProps)=>{
                        return (item.nomecli.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
                   })
                );
            }
        }

    },[searchText,screenIsFocus])

    /*useEffect(()=>{
        if(searchText != ''){
            setPedidos(
               pedidos.filter((item:PedidoProps)=>{
                    return (item.nomecli.indexOf(searchText) > -1)
               })
            );
        }
    },[searchText])*/

    useEffect(()=>{        
        if(selpedido.length > 0){
            setBtnHide(true);
        }else{
            setBtnHide(false);
        }
    },[selpedido])

 return(
   <Container>
       <Header>
                <HeaderNavegation>
                    <PrevHome onPress={handleBack}>                    
                        <NavIcon name="arrow-left" />
                    </PrevHome>
                    <NavTitle>
                        Pedidos Feitos
                    </NavTitle>
                </HeaderNavegation>
                
                <InfoTotalsDays>      
                    <Totalday>                 
                       <TotaldayValor>R$ {parseFloat(String(vtotalgeral)).toLocaleString('pt-br',
                                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotaldayValor>
                        <TotaldayTitle>VALOR TOTAL DO DIA</TotaldayTitle>
                    </Totalday>
                     <LengthDay>                        
                         <LengthDayValor>{pedidos.length}</LengthDayValor>
                         <LengthDayText>TOTAL PEDIDO DIA</LengthDayText>
                     </LengthDay>
                </InfoTotalsDays>

                <FilterForm>
                    <IconWrapper>
                        <Iconfilter name="filter"/>
                    </IconWrapper>   
                    <Field>
                       <InputFilter 
                            placeholder="Buscar" 
                            placeholderTextColor="#fff" 
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </Field> 
                    <ButtonTypeFilter onPress={()=>handlerOpenFilterModalize()}>
                        <IconTypeFilter name="sliders"/>
                    </ButtonTypeFilter>                    
                </FilterForm>
                <Separador></Separador>

                <ContentStatus
                    data={dataStatus}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=> 
                    <Status colors={Number(item.id)} key={item.id} onPress={()=>FilterStatusPedidos(item.id)}>
                        <TipoStatus>{item.tipo}</TipoStatus>
                        <StatusText>{item.nome}</StatusText>
                    </Status>                    
                }   
                />
                
            </Header>
            {loading ? <Load/> :    
                <PedidoFeitoList
                    data={pedidos}
                    keyExtractor={items=>items.id}
                    renderItem={({item})=>
                    <PedidoCard 
                            key={item.id}
                            dados={item}
                            boxyesnot={selpedido}
                            setBoxYesNot={setSelpedido}
                            onPress={()=>handlerClicadoPed(item)}                        
                            onLongPress={()=>handlerSelectionPed({key:item.id,name:'selecionado'})}
                    />
                    }
                    ListEmptyComponent={
                        <EmptyListPed>
                            <ImgEmpty 
                                width={RFValue(374)}                                
                            />

                            <EmptyText>
                                Não a pedidos adicionado
                            </EmptyText>
                            <EmptySubtitleText>
                                Clique no icone a baixo para fazer pedido :D
                            </EmptySubtitleText>
                            <ButtonNovoPed onPress={()=>HandlerFazerPedido()}>
                                <TitleButon>
                                    Fazer Pedido ?
                                </TitleButon>
                            </ButtonNovoPed>
                        </EmptyListPed>
                    }
                   
                />
            }

           {
            btnhide ?   
                <ButtonEnvPed>                        
                        <Ionicons name="ios-cloud-upload-outline" size={32} color={theme.colors.shape}/>
                        <TextEnvPed>ENVIAR PEDIDOS</TextEnvPed>
                </ButtonEnvPed> : null
            }

            <Modalize ref={modalizeRef} adjustToContentHeight={true}>
                <ContentFiltro>                
                <TitleText>Tipo data:</TitleText>
                <OptionFiltro>
                    <OptionButton active={option == 'dtemissao'} onPress={()=>handlerOptionChange('dtemissao')}>
                        {option == 'dtemissao' ? <IconChecked name="checkcircle"/> :null}
                        <OptionText active={option == 'dtemissao'}>                            
                            Data Emissão
                        </OptionText>
                    </OptionButton>
                    <OptionButton active={option == 'dtentrega'} onPress={()=>handlerOptionChange('dtentrega')}>
                        {option == 'dtentrega' ? <IconChecked name="checkcircle"/> :null}
                        <OptionText active={option == 'dtentrega'}>Data Entrega</OptionText>
                    </OptionButton>
                </OptionFiltro>

                <DatasOption>  
                    <ContantData>
                        <TitleTipoData>Data Inicial</TitleTipoData>
                        <DataFilter onPress={hendlerOpenDatetimPickerForAndroid}>                                                                    
                            <IconContainer>
                                <IconeData name="calendar"/>
                            </IconContainer>
                            <TitleData>{`${format(dataincial,'dd/MM/Y')}`}</TitleData>
                        </DataFilter>
                    </ContantData>   
                    <ContantData>
                        <TitleTipoData>Data Fim</TitleTipoData>
                        <DataFilter onPress={hendlerOpenDatetimPickerForAndroid2}>
                            <IconContainer>
                                <IconeData name="calendar"/>
                            </IconContainer>
                            <TitleData>{`${format(datafinal,'dd/MM/Y')}`}</TitleData>
                        </DataFilter>
                    </ContantData>                                
                </DatasOption>
                
                    <OptionStatusContent>
                    {
                         
                        dataStatus.map((items:StatusProps,index)=>{

                            return <OptionStatus 
                                        colors={Number(items.id)} 
                                        key={items.id} 
                                        onPress={()=>hanblerOptionChangeStatus({key:items.id})}  
                                        active={tpstatus(Number(items.id))}
                                        >
                                    <OptionStatusValue>{items.tipo}</OptionStatusValue>
                                    <OptionStatusText>{items.nome}</OptionStatusText>
                                </OptionStatus>
                                                                    
                        })
                    }
                    </OptionStatusContent>
                
                     {
                         loading ? <Load/> :<Button title='Filtrar' onPress={()=>handlerFiltrar()} />
                     }   
                    
                </ContentFiltro>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={dataincial}
                    onConfirm={handleDataInicial}
                    onCancel={hideDatePicker}
                />

                <DateTimePickerModal
                    isVisible={isDatePickerVisible2}
                    mode="date"
                    date={datafinal}
                    onConfirm={handleDataFinal}
                    onCancel={hideDatePicker2}
                />

            </Modalize>

   </Container>
  );
}