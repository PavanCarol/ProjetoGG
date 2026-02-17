import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Importações do Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// Importações locais
import { PratoService } from '../../../../services/prato.service';
import { Prato } from '../../../../models/prato.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

/**
 * Componente de Listagem de Pratos
 * 
 * Este componente exibe uma tabela com todos os pratos cadastrados
 * e permite realizar operações de CRUD:
 * - Visualizar lista de pratos
 * - Navegar para criação de novo prato
 * - Navegar para edição de prato existente
 * - Excluir prato (com confirmação)
 */
@Component({
  selector: 'app-prato-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './prato-list.component.html',
  styleUrl: './prato-list.component.scss'
})
export class PratoListComponent implements OnInit {
  // Lista de pratos carregados da API
  pratos: Prato[] = [];
  
  // Controle de estado de carregamento
  carregando = false;
  
  // Colunas exibidas na tabela
  colunasExibidas: string[] = ['idPrato', 'nome', 'preco', 'acoes'];

  constructor(
    private pratoService: PratoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook - Executa ao iniciar o componente
   * Carrega a lista de pratos da API
   */
  ngOnInit(): void {
    this.carregarPratos();
  }

  /**
   * Carrega todos os pratos da API
   * Utiliza o PratoService para fazer a requisição GET
   */
  carregarPratos(): void {
    this.carregando = true;
    
    this.pratoService.listar().subscribe({
      // Sucesso: atualiza a lista de pratos
      next: (pratos) => {
        this.pratos = pratos;
        this.carregando = false;
      },
      // Erro: exibe mensagem e para o loading
      error: (erro) => {
        this.mostrarMensagem(erro.message, 'erro');
        this.carregando = false;
      }
    });
  }

  /**
   * Navega para a tela de criação de novo prato
   */
  novoPrato(): void {
    this.router.navigate(['/pratos/novo']);
  }

  /**
   * Navega para a tela de edição de um prato
   * @param id - ID do prato a ser editado
   */
  editarPrato(id: number): void {
    this.router.navigate(['/pratos/editar', id]);
  }

  /**
   * Exibe diálogo de confirmação antes de excluir
   * @param prato - Prato a ser excluído
   */
  confirmarExclusao(prato: Prato): void {
    // Abre o diálogo de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: `Deseja realmente excluir o prato "${prato.nome}"?`,
        botaoConfirmar: 'Excluir',
        botaoCancelar: 'Cancelar'
      }
    });

    // Processa a resposta do diálogo
    dialogRef.afterClosed().subscribe(confirmou => {
      if (confirmou) {
        this.excluirPrato(prato.idPrato);
      }
    });
  }

  /**
   * Exclui um prato após confirmação
   * @param id - ID do prato a ser excluído
   */
  private excluirPrato(id: number): void {
    this.pratoService.excluir(id).subscribe({
      // Sucesso: recarrega a lista e exibe mensagem
      next: () => {
        this.mostrarMensagem('Prato excluído com sucesso!', 'sucesso');
        this.carregarPratos(); // Atualiza a lista
      },
      // Erro: exibe mensagem de erro
      error: (erro) => {
        this.mostrarMensagem(erro.message, 'erro');
      }
    });
  }

  /**
   * Formata o preço para exibição em moeda brasileira
   * @param valor - Valor numérico a ser formatado
   * @returns String formatada (ex: "R$ 25,00")
   */
  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Exibe uma mensagem toast usando MatSnackBar
   * @param mensagem - Texto da mensagem
   * @param tipo - 'sucesso' ou 'erro' (define a cor)
   */
  private mostrarMensagem(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000, // 5 segundos
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: tipo === 'sucesso' ? 'snackbar-sucesso' : 'snackbar-erro'
    });
  }
}
