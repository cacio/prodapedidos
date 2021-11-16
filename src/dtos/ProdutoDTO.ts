export interface ProdutoDTO{
    unidade: string;
    id: string;
    descricao: string;
    preco_venda: number;
    estoque_atual: number;
    pecas_estoque:number;
    peso_medio: number;
    preco_min: number;
    preco_max: number;
    idgrupo: string;    
}