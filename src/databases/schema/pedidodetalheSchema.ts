import { tableSchema } from '@nozbe/watermelondb';

const pedidodetalheSchema = tableSchema({
    name:'pedidodetalhe',
    columns: [
        {
            name:'pedido_id',
            type:'string',
            isIndexed:true
        },
        {
            name:'qtd',
            type:'string'
        },
        {
            name:'preco',
            type:'string'
        },
        {
            name:'cod_prod',
            type:'string'
        },
        {
            name:'pc',
            type:'string'
        },
        {
            name:'desconto',
            type:'string'
        },
        {
            name:'obs',
            type:'string'
        },
        {
            name:'tipo_pc_qtd',
            type:'string'
        }
    ]
});

export {pedidodetalheSchema}