import { Model } from '@nozbe/watermelondb';
import { field,relation } from '@nozbe/watermelondb/decorators';

class PedidoDetalhe extends Model{
    static table = 'pedidodetalhe';

    /*static associations = {
        pedido: { type: 'belongs_to', key: 'ped_id' },
      };*/

    @field('pedido_id')
    pedido_id!:string;

    @field('qtd')
    qtd!:string;

    @field('preco')
    preco!:string;

    @field('cod_prod')
    cod_prod!:string;

    @field('pc')
    pc!:string;

    @field('desconto')
    desconto!:string;

    @field('obs')
    obs!:string;

    @field('tipo_pc_qtd')
    tipo_pc_qtd!:string;

    @relation('pedido', 'ped_id') pedido!:string; 
}

export {PedidoDetalhe}