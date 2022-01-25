import { tableSchema } from '@nozbe/watermelondb';

const produtoSchema = tableSchema({
    name:'produtos',
    columns: [
        {
            name:"codigo",
            type:"string"
        },
        {
            name:"decricao",
            type:"string"
        },
        {
            name:"unidade",
            type:"string"
        },
        {
            name:"preco_venda",
            type:"string",
        },
        {
            name:"estoque_atual",
            type:"string"
        },
        {
            name:"peso_medio",
            type:"string"
        },
        {
            name:"pecas_estoque",
            type:"string"
        },
        {
            name:"preco_min",
            type:"string",            
        },
        {
            name:"preco_max",
            type:"string",        
        },

        {
            name:"idgrupo",
            type:"string",                    
        },
        {
            name:'foto',
            type:'string'
        }
    ]
});

export {produtoSchema}