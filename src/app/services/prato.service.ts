import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Prato, PratoRequest } from '../models/prato.model';

/**
 * Serviço responsável por realizar operações CRUD na API de Pratos
 *
 * Este serviço faz a comunicação com a API .NET através de requisições HTTP.
 * Utiliza o padrão Repository para abstrair a camada de dados.
 *
 * Endpoints consumidos:
 * - GET    /api/pratos      - Listar todos os pratos
 * - GET    /api/pratos/:id  - Buscar prato por ID
 * - POST   /api/pratos      - Criar novo prato
 * - PUT    /api/pratos/:id  - Atualizar prato existente
 * - DELETE /api/pratos/:id  - Excluir prato
 */
@Injectable({
  providedIn: 'root' // Disponível em toda a aplicação
})
export class PratoService {
  // URL base para os endpoints de pratos
  private readonly apiUrl = `${environment.apiUrl}/pratos`;

  constructor(private http: HttpClient) {}

  /**
   * Retorna a lista de todos os pratos cadastrados
   *
   * Método HTTP: GET /api/pratos
   * @returns Observable com array de Pratos
   */
  listar(): Observable<Prato[]> {
    return this.http.get<Prato[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca um prato específico pelo seu ID
   *
   * Método HTTP: GET /api/pratos/{id}
   * @param id - ID do prato a ser buscado
   * @returns Observable com o Prato encontrado
   */
  obterPorId(id: number): Observable<Prato> {
    return this.http.get<Prato>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Cria um novo prato no sistema
   *
   * Método HTTP: POST /api/pratos
   * @param prato - Dados do novo prato
   * @returns Observable com o Prato criado (incluindo o ID gerado)
   */
  criar(prato: PratoRequest): Observable<Prato> {
    console.log('Enviando os dados do prato:', prato);
    return this.http.post<Prato>(this.apiUrl, prato).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza os dados de um prato existente
   *
   * Método HTTP: PUT /api/pratos/{id}
   * @param id - ID do prato a ser atualizado
   * @param prato - Novos dados do prato
   * @returns Observable com o Prato atualizado
   */
  atualizar(id: number, prato: PratoRequest): Observable<Prato> {
    return this.http.put<Prato>(`${this.apiUrl}/${id}`, prato).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Remove um prato do sistema
   *
   * Método HTTP: DELETE /api/pratos/{id}
   * @param id - ID do prato a ser excluído
   * @returns Observable void (sem retorno em caso de sucesso)
   */
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Trata erros das requisições HTTP
   *
   * Centraliza o tratamento de erros para facilitar o debug
   * e exibir mensagens amigáveis ao usuário.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let mensagemErro = 'Ocorreu um erro desconhecido.';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente (ex: rede)
      mensagemErro = `Erro de conexão: ${error.error.message}`;
    } else {
      // Erro retornado pela API
      switch (error.status) {
        case 400:
          mensagemErro = 'Dados inválidos. Verifique as informações e tente novamente.';
          break;
        case 404:
          mensagemErro = 'Prato não encontrado.';
          break;
        case 500:
          mensagemErro = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          mensagemErro = `Erro ${error.status}: ${error.message}`;
      }
    }

    console.error('Erro na requisição:', error);
    return throwError(() => new Error(mensagemErro));
  }
}
