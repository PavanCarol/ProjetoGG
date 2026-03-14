export interface RequestItemPedido {
  idPrato: number;
  quantidade: number;
}

export interface RequestSalvarPedido {
  id?: number | null;
  data: string;
  idCliente?: number | null;
  itens?: RequestItemPedido[] | null;
}

export interface RequestAdicionarItensPedido {
  itens?: RequestItemPedido[] | null;
}

export interface ResponseItemPedido {
  idPrato: number;
  nomePrato: string | null;
  quantidade: number;
  precoUnitario: number;
  subTotal: number;
}

export interface ResponsePedido {
  id: number;
  valor: number;
  data: string | null;
  paga: boolean;
  clienteId: number;
  itens?: ResponseItemPedido[] | null;
}

export interface ResponsePedidoRegistrado {
  id: number;
  valor: number;
  data: string;
  paga: boolean;
}
