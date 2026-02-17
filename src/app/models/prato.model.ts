/**
 * Interface que representa um Prato no sistema
 * 
 * Esta interface espelha a entidade Prato da API .NET
 * A entidade Prato se relaciona com:
 * - PratoProduto: ingredientes/produtos que compõem o prato
 * - PedidoPrato: pedidos que contêm este prato
 */
export interface Prato {
  // ID único do prato (gerado pelo banco de dados)
  idPrato: number;
  
  // Nome do prato ou bebida (ex: "Feijoada", "Caipirinha")
  nome: string;
  
  // Preço de venda do prato
  preco: number;
}

/**
 * Interface para criar ou atualizar um Prato
 * Não inclui o ID pois ele é gerado automaticamente
 */
export interface PratoRequest {
  // ID (opcional - usado apenas na atualização)
  id?: number;
  
  // Nome do prato
  nome: string;
  
  // Preço do prato
  preco: number;
  
  // Lista de produtos/ingredientes (opcional para CRUD básico)
  produtos?: PratoProdutoRequest[];
}

/**
 * Interface para associar produtos a um prato
 */
export interface PratoProdutoRequest {
  idProduto: number;
  quantidade: number;
}
