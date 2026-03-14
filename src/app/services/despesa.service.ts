import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RequestSalvarDespesa, ResponseDespesa, ResponseDespesaRegistrada } from '../models/despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private readonly apiUrl = `${environment.apiUrl}/Despesa`;

  constructor(private http: HttpClient) {}

  salvar(despesa: RequestSalvarDespesa): Observable<ResponseDespesaRegistrada> {
    return this.http.post<ResponseDespesaRegistrada>(this.apiUrl, despesa).pipe(
      catchError(this.handleError)
    );
  }

  listar(): Observable<ResponseDespesaRegistrada> {
    return this.http.get<ResponseDespesaRegistrada>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  obterPorId(id: number): Observable<ResponseDespesa> {
    return this.http.get<ResponseDespesa>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
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
          mensagemErro = 'Despesa não encontrada.';
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
