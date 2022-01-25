import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class CondicoesPagamento extends Model{
    static table = 'condicoes_pagamento';

    @field('codigo')
    codigo!:string;

    @field('descricao')
    decricao!:string;

    @field('cnpj_emp')
    cnpj_emp!:string;

}

export {CondicoesPagamento}