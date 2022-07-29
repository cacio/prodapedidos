import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class DuplicReceber extends Model{
    static table = 'duplic_receber';

    @field('codigo')
    codigo!:string;

    @field('ndup')
    ndup!:string;

    @field('vlrdup')
    vlrdup!:string;

    @field('vencdup')
    vencdup!:string;

    @field('cod_cli')
    cod_cli!:string;

    @field('forma_pagamento')
    forma_pagamento!:string;
}

export {DuplicReceber}