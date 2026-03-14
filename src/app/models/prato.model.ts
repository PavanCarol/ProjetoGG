export interface Prato {
  id: number | null;
  nome: string;
  preco: number;
}

export interface PratoRequest {
  nome: string;
  preco: number;
}
