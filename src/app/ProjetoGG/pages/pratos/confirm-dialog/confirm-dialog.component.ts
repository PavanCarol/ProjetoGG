import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Interface para os dados do diálogo de confirmação
 */
export interface ConfirmDialogData {
  titulo: string;
  mensagem: string;
  botaoConfirmar: string;
  botaoCancelar: string;
}

/**
 * Componente de Diálogo de Confirmação
 * 
 * Componente reutilizável para exibir diálogos de confirmação.
 * Pode ser usado em qualquer parte da aplicação.
 * 
 * Uso:
 * ```typescript
 * const dialogRef = this.dialog.open(ConfirmDialogComponent, {
 *   width: '350px',
 *   data: {
 *     titulo: 'Confirmar',
 *     mensagem: 'Deseja continuar?',
 *     botaoConfirmar: 'Sim',
 *     botaoCancelar: 'Não'
 *   }
 * });
 * 
 * dialogRef.afterClosed().subscribe(confirmou => {
 *   if (confirmou) {
 *     // Usuário confirmou
 *   }
 * });
 * ```
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <!-- Título do diálogo -->
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon class="warning-icon">warning</mat-icon>
      {{ data.titulo }}
    </h2>
    
    <!-- Conteúdo/Mensagem -->
    <mat-dialog-content class="dialog-content">
      <p>{{ data.mensagem }}</p>
    </mat-dialog-content>
    
    <!-- Botões de ação -->
    <mat-dialog-actions align="end" class="dialog-actions">
      <!-- Botão Cancelar -->
      <button 
        mat-stroked-button 
        (click)="onCancelar()">
        {{ data.botaoCancelar }}
      </button>
      
      <!-- Botão Confirmar -->
      <button 
        mat-raised-button 
        color="warn" 
        (click)="onConfirmar()">
        {{ data.botaoConfirmar }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f44336;
    }
    
    .warning-icon {
      color: #ff9800;
    }
    
    .dialog-content {
      padding: 16px 0;
      
      p {
        margin: 0;
        color: #666;
        font-size: 16px;
      }
    }
    
    .dialog-actions {
      padding: 8px 0;
      gap: 8px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  /**
   * Usuário confirmou a ação
   */
  onConfirmar(): void {
    this.dialogRef.close(true);
  }

  /**
   * Usuário cancelou a ação
   */
  onCancelar(): void {
    this.dialogRef.close(false);
  }
}
