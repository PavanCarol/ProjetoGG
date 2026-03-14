import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RequestSalvarProduto, ResponseProdutoRegistrado } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly apiUrl = `${environment.apiUrl}/Produto`;

  constructor(private http: HttpClient) {}

  salvar(produto: RequestSalvarProduto): Observable<ResponseProdutoRegistrado> {
    return this.http.post<ResponseProdutoRegistrado>(`${this.apiUrl}/Salvar`, produto).pipe(
      catchError(this.handleError)
    );
  }

  listar(): Observable<ResponseProdutoRegistrado> {
    return this.http.get<ResponseProdutoRegistrado>(`${this.apiUrl}/Listar`).pipe(
      catchError(this.handleError)
    );
  }

  deletar(id: number): Observable<ResponseProdutoRegistrado> {
    return this.http.delete<ResponseProdutoRegistrado>(`${this.apiUrl}/Deletar`, { body: id }).pipe(
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
          mensagemErro = 'Produto não encontrado.';
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
