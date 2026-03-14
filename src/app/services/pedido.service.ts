import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  RequestSalvarPedido,
  RequestAdicionarItensPedido,
  ResponsePedido,
  ResponsePedidoRegistrado
} from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  salvar(pedido: RequestSalvarPedido): Observable<ResponsePedidoRegistrado> {
    return this.http.post<ResponsePedidoRegistrado>(this.apiUrl, pedido).pipe(
      catchError(this.handleError)
    );
  }

  pagar(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/pagar`, {}).pipe(
      catchError(this.handleError)
    );
  }

  listar(): Observable<ResponsePedido[]> {
    return this.http.get<ResponsePedido[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  obterPorId(id: number): Observable<ResponsePedido> {
    return this.http.get<ResponsePedido>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  adicionarItens(id: number, itens: RequestAdicionarItensPedido): Observable<ResponsePedidoRegistrado> {
    return this.http.post<ResponsePedidoRegistrado>(`${this.apiUrl}/${id}/itens`, itens).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let mensagemErro = 'Ocorreu um erro desconhecido.';

    if (error.error instanceof ErrorEvent) {
      mensagemErro = `Erro de conexão: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          mensagemErro = 'Dados inválidos. Verifique as informações e tente novamente.';
          break;
        case 404:
          mensagemErro = 'Pedido não encontrado.';
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
