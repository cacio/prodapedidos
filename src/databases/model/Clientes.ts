import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Clientes extends Model{
    static table = 'clientes';

    @field('CODIGO')
    CODIGO!:string;

    @field('CNPJ_CPF')
    CNPJ_CPF!:string;

    @field('NOME')
    NOME!:string;

    @field('ENDERECO')
    ENDERECO!:string;

    @field('BAIRRO')
    BAIRRO!:string;

    @field('CEP')
    CEP!:string;

    @field('CIDADE')
    CIDADE!:string;

    @field('ESTADO')
    ESTADO!:string;

    @field('TELEFONE')
    TELEFONE!:string;

    @field('INSCRICAO')
    INSCRICAO!:string;

    @field('ATIVO')
    ATIVO!:string;

    @field('CONTA_CTB')
    CONTA_CTB!:string;

    @field('MOSTRA_FATURAS')
    MOSTRA_FATURAS!:string;

    @field('PRAZO1')
    PRAZO1!:number;

    @field('PRAZO2')
    PRAZO2!:number;

    @field('PRAZO3')
    PRAZO3!:number;

    @field('PRAZO4')
    PRAZO4!:number;

    @field('PRAZO5')
    PRAZO5!:number;

    @field('COND_VENDAS')
    COND_VENDAS!:string;

    @field('REPRESENTANTE')
    REPRESENTANTE!:string;

    @field('FANTASIA')
    FANTASIA!:string;

    @field('RESTRICAO')
    RESTRICAO!:string;

    @field('TABELA_PRECOS')
    TABELA_PRECOS!:string;

    @field('CONTATO')
    CONTATO!:string;

    @field('E_MAIL')
    E_MAIL!:string;

    @field('FAX')
    FAX!:string;

    @field('COND_PAG')
    COND_PAG!:string;

    @field('LIMITE')
    LIMITE!:string;

    @field('SEGMENTO')
    SEGMENTO!:string;

    @field('GERARBOLETO')
    GERARBOLETO!:string;

    @field('PESSOA')
    PESSOA!:string;

    @field('END_ENTREGA')
    END_ENTREGA!:string;

    @field('BAIRRO_ENTREGA')
    BAIRRO_ENTREGA!:string;

    @field('CIDADE_ENTREGA')
    CIDADE_ENTREGA!:string;

    @field('UF_ENTREGA')
    UF_ENTREGA!:string;

    @field('CEP_ENTREGA')
    CEP_ENTREGA!:string;

    @field('END_COB')
    END_COB!:string;

    @field('BAIRRO_COB')
    BAIRRO_COB!:string;

    @field('CIDADE_COB')
    CIDADE_COB!:string;

    @field('UF_COB')
    UF_COB!:string;

    @field('CEP_COB')
    CEP_COB!:string;

    @field('CELULAR')
    CELULAR!:string;

    @field('REGI')
    REGI!:string;

    @field('PAIS')
    PAIS!:string;

    @field('E_MAILNFE')
    E_MAILNFE!:string;

    @field('BOLETAO')
    BOLETAO!:string;

    @field('PLACAVEICULO')
    PLACAVEICULO!:string;

    @field('PLACAVEICULOUF')
    PLACAVEICULOUF!:string;

    @field('ANTT')
    ANTT!:string;

    @field('GERALOGIN')
    GERALOGIN!:string;

    @field('BLOQUEADO_SN')
    BLOQUEADO_SN!:string;

    @field('MOTIVO_BLOQUEIO')
    MOTIVO_BLOQUEIO!:string;

    @field('OBS')
    OBS!:string;

    @field('OBS_SAINOTA')
    OBS_SAINOTA!:string;

    @field('foto')
    foto!:string;

    @field('cnpj_emp')
    cnpj_emp!:string;


}

export {Clientes}