import { Model } from '@nozbe/watermelondb';
import { field,relation,lazy} from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb'

class Pedido extends Model{
    static table = 'pedido';
   
   /* static associations = {        
        detalhepedido: { type: 'has_many', foreignKey: 'ped_id' },
      };*/
    
    @field('pedido_id')
    pedido_id!:string;

    @field('CODIGO_RETAGUARDA')
    CODIGO_RETAGUARDA!:string;

    @field('data_pedido')
    data_pedido!:string;

    @field('codigo_cliente')
    codigo_cliente!:string;

    @field('data_entrega')
    data_entrega!:string;

    @field('hora_pedido')
    hora_pedido!:string;  
    
    @field('codigo_usuario')
    codigo_usuario!:string;
    
    @field('codigo_vendedor')
    codigo_vendedor!:string;

    @field('status')
    status!:string;

    @field('prazo1')
    prazo1!:string;

    @field('prazo2')
    prazo2!:string;

    @field('prazo3')
    prazo3!:string;

    @field('prazo4')
    prazo4!:string;

    @field('prazo5')
    prazo5!:string;

    @field('obs')
    obs!:string;

    @field('valor_desconto')
    valor_desconto!:string;

    @field('id_tabela_preco')
    id_tabela_preco!:string;

    @field('retirada')
    retirada!:string;

    @field('cnpj_emp')
    cnpj_emp!:string;



    @relation('pedidodetalhe', 'pedido_id') pedidodetalhe!:string; 

    @lazy detalhe = this.collections.get('pedidodetalhe').query(
        Q.where('pedido_id',this.pedido_id)
    )

}

export {Pedido}