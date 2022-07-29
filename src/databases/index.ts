import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';

import { User } from './model/User';
import { Clientes } from './model/Clientes';
import { Produtos } from './model/Produtos';
import { CondicoesPagamento } from './model/CondicoesPagamento';
import { Pedido } from './model/Pedido';
import { PedidoDetalhe } from './model/PedidoDetalhe';
import { DuplicReceber } from './model/DuplicReceber';

const adapter =  new SQLiteAdapter({
    schema:schemas
});

export const database = new Database({
    adapter,
    modelClasses:[
        User,
        Clientes,
        Produtos,
        CondicoesPagamento,
        Pedido,
        PedidoDetalhe,
        DuplicReceber
    ],
    
})