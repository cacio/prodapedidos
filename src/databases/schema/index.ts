import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';
import { clienteSchema } from './clienteSchema';
import { produtoSchema } from './produtoSchema';
import { CondicoesPagamentoSchema } from './CondicoesPagamentoSchema';
import { pedidoSchema } from './pedidoSchema';
import { pedidodetalheSchema } from './pedidodetalheSchema';

const schemas = appSchema({
    version:9,
    tables:[
        userSchema,
        clienteSchema,
        produtoSchema,
        CondicoesPagamentoSchema,
        pedidoSchema,
        pedidodetalheSchema
    ]
});

export { schemas }