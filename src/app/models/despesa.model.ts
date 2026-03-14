export interface RequestSalvarDespesa {
  nome: string | null;
  descricao: string | null;
  valor: number;
  fixa: boolean;
  dataVencimento: string;
}

export interface ResponseDespesa {
  id: number;
  nome: string | null;
  descricao: string | null;
  valor: number;
  dataVencimento: string | null;
  fixa: boolean;
}

export interface ResponseDespesaRegistrada {
  nome: string | null;
  descricao: string | null;
  valor: number;
  dataVencimento: string | null;
  fixa: boolean;
}
