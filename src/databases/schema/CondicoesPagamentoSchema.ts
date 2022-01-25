import { tableSchema } from '@nozbe/watermelondb';

const CondicoesPagamentoSchema = tableSchema({
    name:'condicoes_pagamento',
    columns: [
        {
            name:"codigo",
            type:"string"
        },
        {
            name:"descricao",
            type:"string"
        },
    ]
});

export {CondicoesPagamentoSchema}