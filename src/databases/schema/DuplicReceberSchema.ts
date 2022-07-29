import { tableSchema } from '@nozbe/watermelondb';

const DuplicReceberSchema = tableSchema({
    name:'duplic_receber',
    columns: [
        {
            name:"codigo",
            type:"string"
        },
        {
            name:"ndup",
            type:"string"
        },
        {
            name:"vlrdup",
            type:"string"
        },
        {
            name:"vencdup",
            type:"string"
        },
        {
            name:"cod_cli",
            type:"string"
        },
        {
            name:"forma_pagamento",
            type:"string"
        },
    ]
});

export {DuplicReceberSchema}