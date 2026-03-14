export interface RequestSalvarProduto {
  nome: string | null;
  preco: number;
  quantidade: number;
  descricao: string | null;
  unidadeMedida: string | null;
}

export interface ResponseProdutoRegistrado {
  title: string | null;
}
