import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Produtos extends Model{
    static table = 'produtos';
    
    @field('codigo')
    codigo!:string;

    @field('decricao')
    decricao!:string;

    @field('unidade')
    unidade!:string;

    @field('preco_venda')
    preco_venda!:string

    @field('estoque_atual')
    estoque_atual!:string;

    @field('peso_medio')
    peso_medio!:string;

    @field('pecas_estoque')
    pecas_estoque!:string;
    
    @field('preco_min')
    preco_min!:string;

    @field('preco_max')
    preco_max!:string;

    @field('idgrupo')
    idgrupo!:string;

    @field('foto')
    foto!:string;

    @field('cnpj_emp')
    cnpj_emp!:string;

  
}

export {Produtos}