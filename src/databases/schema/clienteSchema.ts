import { tableSchema } from '@nozbe/watermelondb';


const clienteSchema = tableSchema({
    name:'clientes', 
    columns: [
        {
            name:'CODIGO',
            type:'string'
        },
        {
            name:'CNPJ_CPF',
            type:'string'
        },
        {
            name:'NOME',
            type:'string'
        },
        {
            name:'ENDERECO',
            type:'string'
        },
        {
            name:'BAIRRO',
            type:'string'
        },
        {
            name:'CEP',
            type:'string'
        },
        {
            name:'CIDADE',
            type:'string'
        },
        {
            name:'ESTADO',
            type:'string'
        },
        {
            name:'TELEFONE',
            type:'string'
        },
        {
            name:'INSCRICAO',
            type:'string'
        },
        {
            name:'ATIVO',
            type:'string'
        },
        {
            name:'CONTA_CTB',
            type:'string'
        },
        {
            name:'MOSTRA_FATURAS',
            type:'string'
        },
        {
            name:'PRAZO1',
            type:'number'
        },
        {
            name:'PRAZO2',
            type:'number'
        },
        {
            name:'PRAZO3',
            type:'number'
        },
        {
            name:'PRAZO4',
            type:'number'
        },
        {
            name:'PRAZO5',
            type:'number'
        },
        {
            name:'COND_VENDAS',
            type:'string'
        },
        {
            name:'REPRESENTANTE',
            type:'string'
        },
        {
            name:'FANTASIA',
            type:'string'
        },
        {
            name:'RESTRICAO',
            type:'string'
        },
        {
            name:'TABELA_PRECOS',
            type:'string'
        },
        {
            name:'CONTATO',
            type:'string'
        },
        {
            name:'E_MAIL',
            type:'string'
        },
        {
            name:'FAX',
            type:'string'
        },
        {
            name:'COND_PAG',
            type:'string'
        },
        {
            name:'LIMITE',
            type:'string'
        },
        {
            name:'SEGMENTO',
            type:'string'
        },
        {
            name:'GERARBOLETO',
            type:'string'
        },
        {
            name:'PESSOA',
            type:'string'
        },
        {
            name:'END_ENTREGA',
            type:'string'
        },
        {
            name:'BAIRRO_ENTREGA',
            type:'string'
        },
        {
            name:'CIDADE_ENTREGA',
            type:'string'
        },
        {
            name:'UF_ENTREGA',
            type:'string'
        },
        {
            name:'CEP_ENTREGA',
            type:'string'
        },
        {
            name:'END_COB',
            type:'string'
        },
        {
            name:'BAIRRO_COB',
            type:'string'
        },
        {
            name:'CIDADE_COB',
            type:'string'
        },
        {
            name:'UF_COB',
            type:'string'
        },
        {
            name:'CEP_COB',
            type:'string'
        },
        {
            name:'CELULAR',
            type:'string'
        },
        {
            name:'REGI',
            type:'string'
        },
        {
            name:'PAIS',
            type:'string'
        },
        {
            name:'E_MAILNFE',
            type:'string'
        },
        {
            name:'BOLETAO',
            type:'string'
        },
        {
            name:'PLACAVEICULO',
            type:'string'
        },
        {
            name:'PLACAVEICULOUF',
            type:'string'
        },
        {
            name:'ANTT',
            type:'string'
        },
        {
            name:'GERALOGIN',
            type:'string'
        },
        {
            name:'BLOQUEADO_SN',
            type:'string'
        },
        {
            name:'MOTIVO_BLOQUEIO',
            type:'string'
        },
        {
            name:'OBS',
            type:'string'
        },
        {
            name:'OBS_SAINOTA',
            type:'string'
        },
        {
            name:'foto',
            type:'string'
        }
    ]
});

export {clienteSchema}